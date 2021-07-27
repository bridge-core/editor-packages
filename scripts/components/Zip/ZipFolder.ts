import { join } from 'path'
import { zipSync } from 'fflate'

export async function zipFolder(
	path: string,
	outputPath: string,
	globalFolder?: string
) {
	const dirContents = {}
	await getDirectoryContents(path, dirContents)

	const zipped = zipSync(
		globalFolder ? { [globalFolder]: dirContents } : dirContents
	)

	await Deno.writeFile(outputPath, zipped)
}

async function getDirectoryContents(path: string, dirContents: any) {
	for await (const entry of Deno.readDir(path)) {
		const entryPath = join(path, entry.name)

		if (entry.isDirectory) {
			await getDirectoryContents(entryPath, dirContents)
		} else {
			dirContents[entryPath] = await Deno.readFile(entryPath)
		}
	}
}
