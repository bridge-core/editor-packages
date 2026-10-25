import { basename, join } from 'node:path'
import { writeRaw } from './utils.ts'
import { ScrapeImport, ScrapeExport } from './types.ts'

export class SchemaExporter {
	private readonly importEntries: ScrapeImport[]
	private readonly exportEntries: ScrapeExport[]

	public constructor(
		importEntries: ScrapeImport[],
		exportEntries: ScrapeExport[]
	) {
		this.importEntries = importEntries
		this.exportEntries = exportEntries
	}

	public async run(shouldExport: boolean = true) {
		for (const importEntry of this.importEntries) {
			let output: string[] = []

			for (const target of importEntry.targets) {
				let scraped = await target.run()

				const filtered = importEntry.filter
					? scraped.filter((i) =>
							// @ts-ignore
							i ? importEntry.filter(i) : false
						)
					: scraped

				const mapped = importEntry.map
					? // @ts-ignore
						filtered.map((i) => importEntry.map(i))
					: filtered

				output = output.concat(mapped)
			}

			console.log(`Writing raw data ${importEntry.id}`)

			await writeRaw(importEntry.id, output)
		}

		console.log('Started compiling schemas')

		if (shouldExport) {
			await this.exportSchemas()
		}

		console.log('Finished compiling schemas')
	}

	private async exportSchemas() {
		for (const exportEntry of this.exportEntries) {
			if (exportEntry.from.length === 1) {
				const raw = exportEntry.from[0]
				const data = await Deno.readTextFile(
					join('./scripts/vanillaData/raw', raw)
				).catch(() => {
					console.warn(
						`Could not find raw data for ${join(
							'./scripts/vanillaData/raw',
							raw
						)}`
					)
					return null
				})
				if (data === null) continue

				const schema = {
					$schema: 'http://json-schema.org/draft-07/schema',
					...(exportEntry.type === 'property'
						? {
								type: 'object',
								properties: Object.fromEntries(
									JSON.parse(data).map((i: string) => [i, {}])
								),
							}
						: {
								type: 'string',
								enum: JSON.parse(data),
							}),
				}
				await Deno.writeTextFile(
					join('./packages/minecraftBedrock/schema', exportEntry.to),
					JSON.stringify(schema, null, '\t')
				)
			} else {
				let defs: any = {}
				for (const raw of exportEntry.from) {
					const data = await Deno.readTextFile(
						join('./scripts/vanillaData/raw', raw)
					).catch(() => {
						console.warn(
							`Could not find raw data for ${join(
								'./scripts/vanillaData/raw',
								raw
							)}`
						)
						return null
					})
					if (data === null) continue

					defs[basename(raw, '.json')] = {
						type: 'string',
						enum: JSON.parse(data),
					}
				}
				const schema = {
					$schema: 'http://json-schema.org/draft-07/schema',
					definitions: defs,
				}
				await Deno.writeTextFile(
					join('./packages/minecraftBedrock/schema', exportEntry.to),
					JSON.stringify(schema, null, '\t')
				)

				console.log(`Pushing schema to ${exportEntry.to}`)
			}
		}
	}
}
