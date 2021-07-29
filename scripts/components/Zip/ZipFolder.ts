import { join, basename } from 'path'
import { zipSync } from 'fflate'

export async function zipFolder(path: string, outputPath: string) {
	const dirContents = {}
	await getDirectoryContents(path, dirContents)

	const zipped = zipSync(dirContents)
	console.log(Object.keys(dirContents))

	await Deno.writeFile(outputPath, zipped)
}

async function getDirectoryContents(path: string, dirContents: any) {
	if (path === './dist') {
		path = './packages'
		dirContents['packages/'] = new Uint8Array()
	}

	for await (const entry of Deno.readDir(path)) {
		const entryPath = join(path, entry.name)

		if (entry.isDirectory) {
			dirContents[entryPath + '/'] = new Uint8Array()
			await getDirectoryContents(entryPath, dirContents)
		} else if (basename(entryPath) !== '.DS_Store') {
			dirContents[entryPath] = await Deno.readFile(entryPath)
		}
	}
}
