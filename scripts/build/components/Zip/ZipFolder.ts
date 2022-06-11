import { join, basename } from 'path'
import { zipSync } from 'fflate'

export async function zipFolder(path: string, outputPath: string) {
	const dirContents = {}
	await getDirectoryContents(path, dirContents)

	const zipped = zipSync(dirContents)

	await Deno.writeFile(outputPath, zipped)
}

async function getDirectoryContents(path: string, dirContents: any) {
	if (path === './dist') {
		dirContents['packages/'] = new Uint8Array()
	}
	const toOutPath = (path: string) => path.replace('dist', 'packages')

	for await (const entry of Deno.readDir(path)) {
		const entryPath = join(path, entry.name)

		if (entry.isDirectory) {
			dirContents[toOutPath(entryPath.replaceAll('\\', '/')) + '/'] =
				new Uint8Array()
			await getDirectoryContents(entryPath, dirContents)
		} else if (basename(entryPath) !== '.DS_Store') {
			dirContents[toOutPath(entryPath.replaceAll('\\', '/'))] =
				await Deno.readFile(entryPath)
		}
	}
}
