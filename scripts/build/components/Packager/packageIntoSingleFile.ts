import { join, globToRegExp } from 'path'
import json5 from 'json5'
import { minifySchema } from './minifySchema.ts'

const schemaFilePattern = globToRegExp('packages/*/schema/**/*.json')

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
		} else if (entry.isFile && !entry.name.endsWith('.md')) {
			current[`file:///data/${newPath.replaceAll('\\', '/')}`] =
				await loadFile(newPath)
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
			current.push(await loadFile(newPath))
		}
	}

	return current
}

async function loadFile(filePath: string) {
	const fileContent = await Deno.readTextFile(filePath)

	const loadedFile = filePath.endsWith('.json')
		? json5.parse(fileContent)
		: fileContent

	if (filePath.match(schemaFilePattern)) minifySchema(loadedFile)

	return loadedFile
}
