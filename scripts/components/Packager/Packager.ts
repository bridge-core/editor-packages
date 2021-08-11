import { join, globToRegExp } from 'path'
import json5 from 'json5'
import { packageIntoSingleFile } from './packageIntoSingleFile.ts'

export const combineIntoSingleFile: RegExp[] = ['packages/*/schema'].map((p) =>
	globToRegExp(p)
)

export async function packageDirectory(path: string, outputPath: string) {
	for await (const entry of Deno.readDir(path)) {
		const newPath = join(path, entry.name)
		const newOutPath = join(outputPath, entry.name)

		if (combineIntoSingleFile.some((p) => newPath.match(p))) {
			await Deno.writeTextFile(
				`${newOutPath}s.json`,
				JSON.stringify(await packageIntoSingleFile(newPath))
			)
			continue
		}

		if (entry.isDirectory) {
			await Deno.mkdir(newOutPath, { recursive: true })
			await packageDirectory(newPath, newOutPath)
		} else if (entry.isFile) {
			if (
				entry.name.endsWith('.json') &&
				(!newPath.startsWith('packages/minecraftBedrock/preset') ||
					entry.name === 'manifest.json')
			)
				await copyJson(newPath, newOutPath)
			else if (entry.name !== '.DS_Store')
				await Deno.copyFile(newPath, newOutPath)
		}
	}
}

export async function copyJson(path: string, outputPath: string) {
	const json = json5.parse(await Deno.readTextFile(path))
	await Deno.writeTextFile(outputPath, JSON.stringify(json))
}
