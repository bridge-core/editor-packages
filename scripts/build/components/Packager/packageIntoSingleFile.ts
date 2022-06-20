import { join } from 'path'
import json5 from 'json5'

export async function packageIntoSingleFile(
	path: string,
	packageIntoArray = false
) {
	return packageIntoArray
		? packageIntoSingleFileArr(path)
		: packageIntoSingleFileObj(path)
}

async function packageIntoSingleFileObj(
	path: string,
	current: Record<string, Uint8Array> = {}
) {
	for await (const entry of Deno.readDir(path)) {
		const newPath = join(path, entry.name)

		if (entry.isDirectory) {
			await packageIntoSingleFileObj(newPath, current)
		} else if (entry.isFile) {
			const fileContent = await Deno.readTextFile(newPath)

			current[`file:///data/${newPath.replaceAll('\\', '/')}`] =
				entry.name.endsWith('.json')
					? json5.parse(fileContent)
					: fileContent
		}
	}

	return current
}
async function packageIntoSingleFileArr(path: string, current: any[] = []) {
	for await (const entry of Deno.readDir(path)) {
		const newPath = join(path, entry.name)

		if (entry.isDirectory) {
			await packageIntoSingleFileArr(newPath, current)
		} else if (entry.isFile) {
			const fileContent = await Deno.readTextFile(newPath)

			current.push(
				entry.name.endsWith('.json')
					? json5.parse(fileContent)
					: fileContent
			)
		}
	}

	return current
}
