import { join, globToRegExp } from 'path'
import json5 from 'json5'
import { packageIntoSingleFile } from './packageIntoSingleFile.ts'

export const combineIntoSingleFile: [
	RegExp,
	{ packageIntoArray?: boolean; onlyBundleManifests?: boolean }
][] = (<const>[
	'packages/*/schema',
	['packages/*/fileDefinition', { packageIntoArray: true }],
	'packages/*/schemaScript',
	'packages/*/lightningCache',
	['packages/common/theme', { packageIntoArray: true }],
	'packages/*/packSpider',
	['packages/*/preset', { onlyBundleManifests: true }],
]).map((pattern) =>
	typeof pattern === 'string'
		? [globToRegExp(pattern), {}]
		: [globToRegExp(pattern[0]), pattern[1]]
)
export const omitFolders: RegExp[] = [
	'packages/*/language/mcfunction/schema',
].map((glob) => globToRegExp(glob))

export async function packageDirectory(
	path: string,
	outputPath: string,
	ignoreManifests = false
) {
	for await (const entry of Deno.readDir(path)) {
		const newPath = join(path, entry.name)
		const newOutPath = join(outputPath, entry.name)

		const shouldOmitFolder = omitFolders.some((regExp) =>
			newPath.match(regExp)
		)
		if (shouldOmitFolder) continue

		const combineData = combineIntoSingleFile.find(([regExp]) =>
			newPath.match(regExp)
		)
		if (combineData) {
			const [_, { packageIntoArray, onlyBundleManifests }] = combineData
			await Deno.writeTextFile(
				`${newOutPath}s.json`,
				JSON.stringify(
					await packageIntoSingleFile(
						newPath,
						packageIntoArray,
						onlyBundleManifests
					)
				)
			)
			if (!onlyBundleManifests) continue
		}

		if (entry.isDirectory) {
			await Deno.mkdir(newOutPath, { recursive: true })
			await packageDirectory(
				newPath,
				newOutPath,
				ignoreManifests || combineData?.[1]?.onlyBundleManifests
			)
		} else if (
			entry.isFile &&
			(!ignoreManifests || entry.name !== 'manifest.json')
		) {
			if (entry.name.endsWith('.json'))
				await copyJson(
					newPath,
					newOutPath,
					newPath.startsWith('packages/minecraftBedrock/preset') &&
						entry.name !== 'manifest.json'
				).catch(e => console.log(e.message, "in file " + newPath))
			else if (entry.name !== '.DS_Store' && !entry.name.endsWith('.md'))
				await Deno.copyFile(newPath, newOutPath)
		}
	}
}

export async function copyJson(
	path: string,
	outputPath: string,
	beautify = true
) {
	const json = json5.parse(await Deno.readTextFile(path))
	await Deno.writeTextFile(
		outputPath,
		JSON.stringify(json, null, beautify ? '\t' : undefined)
	)
}
