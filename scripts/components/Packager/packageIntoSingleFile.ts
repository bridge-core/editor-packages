import { join } from 'path'
import json5 from 'json5'

export async function packageIntoSingleFile(
	path: string,
	current: Record<string, Uint8Array> = {}
) {
	for await (const entry of Deno.readDir(path)) {
		const newPath = join(path, entry.name)

		if (entry.isDirectory) {
			await packageIntoSingleFile(newPath, current)
		} else if (entry.isFile && entry.name.endsWith('.json')) {
			current[`file:///data/${newPath}`] = json5.parse(
				await Deno.readTextFile(newPath)
			)
		}
	}

	return current
}
