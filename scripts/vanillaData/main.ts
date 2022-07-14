import { exportRaw, toScrape } from './data.ts'
import { DocumentationScraper } from './Scraper/documentation.ts'
import { GameScraper } from './Scraper/game.ts'
import { basename, join } from 'path'

const res = await fetch(`https://bedrock.dev/docs/beta/Addons`)
const text = await res.text()

const docScraper = new DocumentationScraper(text, toScrape.documentation)
await docScraper.run()

const appDataFolder = Deno.env.get('LOCALAPPDATA')
export const comMojangFolder = appDataFolder
	? join(
			appDataFolder,
			'Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang'
	  )
	: null
export const previewComMojangFolder = appDataFolder
	? join(
			appDataFolder,
			'Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang'
	  )
	: null

if (!comMojangFolder && !previewComMojangFolder) {
	console.warn(
		'Game data scraper requires a Minecraft installation on Windows.'
	)
} else {
	const gameScraper = new GameScraper(
		(comMojangFolder ?? previewComMojangFolder)!,
		toScrape.game
	)
	await gameScraper.run()
}

// Generate schemas
for (const target of exportRaw) {
	if (target.from.length === 1) {
		const raw = target.from[0]
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
			join('./packages/minecraftBedrock/schema', target.to),
			JSON.stringify(schema, null, '\t')
		)
	} else {
		let defs: any = {}
		for (const raw of target.from) {
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
			join('./packages/minecraftBedrock/schema', target.to),
			JSON.stringify(schema, null, '\t')
		)
	}
}
