import { config } from 'dotenv'
import { exportRaw, toScrape } from './data.ts'
import { DocumentationScraper } from './Scraper/documentation.ts'
import { GameScraper } from './Scraper/game.ts'
import { basename, join } from 'path'
import { MisodeScraper } from './Scraper/misode.ts'

const { MINECRAFT_DATA_PATH } = config({ safe: true })

const res = await fetch(
	'https://raw.githubusercontent.com/Mojang/bedrock-samples/preview/documentation/Addons.html'
)
const text = await res.text()

const docScraper = new DocumentationScraper(text, toScrape.documentation)
await docScraper.run()

const misodeScraper = new MisodeScraper('1.20.5', toScrape.misode)
misodeScraper.run()

const programFiles = Deno.env.get('PROGRAMFILES')
const windowsAppsFolder = programFiles
	? join(programFiles, 'WindowsApps')
	: null
if (windowsAppsFolder) {
	let retailDataFolder
	let previewDataFolder
	for await (const app of Deno.readDir(windowsAppsFolder)) {
		if (
			app.isDirectory &&
			app.name.startsWith('Microsoft.MinecraftWindowsBeta')
		)
			previewDataFolder = join(windowsAppsFolder, app.name, 'data')
		if (app.isDirectory && app.name.startsWith('Microsoft.MinecraftUWP'))
			previewDataFolder = join(windowsAppsFolder, app.name, 'data')
	}

	if (!retailDataFolder && !previewDataFolder && !MINECRAFT_DATA_PATH) {
		console.warn('Game data scraper requires a Minecraft installation.')
	} else {
		const gameScraper = new GameScraper(
			(MINECRAFT_DATA_PATH ?? previewDataFolder ?? retailDataFolder)!,
			toScrape.game
		)
		await gameScraper.run()
	}
} else console.warn('Game data scraper requires you to be on Windows.')

// Generate schemas
for (const target of exportRaw) {
	if (target.from.length === 1) {
		const raw = target.from[0]
		const data = await Deno.readTextFile(
			join(`./scripts/vanillaData/raw/${target.package}`, raw)
		).catch(() => {
			console.warn(
				`Could not find raw data for ${join(
					`./scripts/vanillaData/raw/${target.package}`,
					raw
				)}`
			)
			return null
		})
		if (data === null) continue

		const schema = {
			$schema: 'http://json-schema.org/draft-07/schema',
			...(target.type === 'property'
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
			join(`./packages/${target.package}/schema`, target.to),
			JSON.stringify(schema, null, '\t')
		)
	} else {
		let defs: any = {}
		for (const raw of target.from) {
			const data = await Deno.readTextFile(
				join(`./scripts/vanillaData/raw/${target.package}`, raw)
			).catch(() => {
				console.warn(
					`Could not find raw data for ${join(
						`./scripts/vanillaData/raw/${target.package}`,
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
			join(`./packages/${target.package}/schema`, target.to),
			JSON.stringify(schema, null, '\t')
		)
	}
}
