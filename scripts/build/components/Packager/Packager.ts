import { join, globToRegExp } from 'path'
import json5 from 'json5'
import { packageIntoSingleFile } from './packageIntoSingleFile.ts'

export const combineIntoSingleFile: [RegExp, { packageIntoArray?: boolean }][] =
	(<const>[
		'packages/*/schema',
		['packages/*/fileDefinition', { packageIntoArray: true }],
	]).map((pattern) =>
		typeof pattern === 'string'
			? [globToRegExp(pattern), {}]
			: [globToRegExp(pattern[0]), pattern[1]]
	)

export async function packageDirectory(path: string, outputPath: string) {
	for await (const entry of Deno.readDir(path)) {
		const newPath = join(path, entry.name)
		const newOutPath = join(outputPath, entry.name)

		const combineData = combineIntoSingleFile.find(([regExp]) =>
			newPath.match(regExp)
		)
		if (combineData) {
			const [_, { packageIntoArray }] = combineData
			await Deno.writeTextFile(
				`${newOutPath}s.json`,
				JSON.stringify(
					await packageIntoSingleFile(newPath, packageIntoArray)
				)
			)
			continue
		}

		if (entry.isDirectory) {
			await Deno.mkdir(newOutPath, { recursive: true })
			await packageDirectory(newPath, newOutPath)
		} else if (entry.isFile) {
			if (entry.name.endsWith('.json'))
				await copyJson(
					newPath,
					newOutPath,
					newPath.startsWith('packages/minecraftBedrock/preset') &&
						entry.name !== 'manifest.json'
				)
			else if (entry.name !== '.DS_Store')
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
