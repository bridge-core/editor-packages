import { join } from 'path'
import json5 from 'json5'

// TODO: Minify all JSON files and copy them to dist/
export async function packageDirectory(path: string, outputPath: string) {
	for await (const entry of Deno.readDir(path)) {
		const newPath = join(path, entry.name)
		const newOutPath = join(outputPath, entry.name)

		if (entry.isDirectory) {
			await Deno.mkdir(newOutPath, { recursive: true })
			await packageDirectory(newPath, newOutPath)
		} else if (entry.isFile) {
			if (entry.name.endsWith('.json'))
				await copyJson(newPath, newOutPath)
			else await Deno.copyFile(newPath, newOutPath)
		}
	}
}

export async function copyJson(path: string, outputPath: string) {
	const json = json5.parse(await Deno.readTextFile(path))
	await Deno.writeTextFile(outputPath, JSON.stringify(json))
}
