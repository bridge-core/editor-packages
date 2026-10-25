import { config } from 'dotenv'
import { PackType } from './types.ts'
import { extname, join } from 'node:path'
import { deserialize } from 'jsr:@bedrock-crustaceans/brarchive'

const { MINECRAFT_DATA_PATH, CACHE_PATH } = config({ safe: true })
const PACK_TYPES = [PackType.BEHAVIOR_PACK, PackType.RESOURCE_PACK]

export class BrarchiveExtractor {
	public constructor() {}

	public async run() {
		console.log('Started extracting files')

		for (const packType of PACK_TYPES) {
			const basePath = join(MINECRAFT_DATA_PATH, packType)

			for await (const pack of Deno.readDir(basePath)) {
				if (!pack.isDirectory) continue

				const archivePath = join(basePath, pack.name, '__brarchive')
				const exportPath = join(CACHE_PATH, packType, pack.name)

				await this.scanDirectory(archivePath, exportPath)
			}
		}

		console.log('Finished extracted files')
	}

	public async delete() {
		for (const packType of PACK_TYPES) {
			const basePath = join(CACHE_PATH, packType)

			await Deno.remove(basePath, {
				recursive: true,
			})
		}
	}

	private async scanDirectory(path: string, exportPath: string) {
		try {
			for await (const entry of Deno.readDir(path)) {
				const entryPath = join(path, entry.name)
				const nextExportPath = join(exportPath, entry.name)

				if (entry.isDirectory) {
					await this.scanDirectory(entryPath, nextExportPath)

					continue
				}

				await this.extractFiles(entryPath, nextExportPath)
			}
		} catch {}
	}

	private async extractFiles(path: string, exportPath: string) {
		const data = deserialize(await Deno.readFile(path))
		const exportFolder = exportPath.replace(extname(exportPath), '')

		await Deno.mkdir(exportFolder, {
			recursive: true,
		})
		const promises = []

		console.log(`Extracting ${path}`)

		for (const [entryName, contents] of data) {
			const finalPath = join(exportFolder, entryName)

			promises.push(Deno.writeFile(finalPath, contents))
		}

		await Promise.all(promises)
	}
}
