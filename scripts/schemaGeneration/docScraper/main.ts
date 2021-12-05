import { DocScraper } from './scraper.ts'

export async function scrapeDocs() {
	const scraper = new DocScraper()

	// Load necessary pages
	const pages = ['beta/Addons']
	await scraper.loadPages(pages)

	// Collect identifiers
	const prefixedBlockIdentifiers = scraper
		.getTableColumnData('beta/Addons', 'Blocks', 'Name')
		.filter((identifier) => identifier.startsWith('minecraft:'))
	const unprefixedBlockIdentifiers = prefixedBlockIdentifiers.map(
		(identifier) => identifier.replace('minecraft:', '')
	)

	const unprefixedItemIdentifiers = scraper.getTableColumnData(
		'beta/Addons',
		'Items',
		'Name'
	)
	const prefixedItemIdenifiers = unprefixedItemIdentifiers.map(
		(identifier) => `minecraft:${identifier}`
	)

	const unprefixedEntityIdentifiers = scraper.getTableColumnData(
		'beta/Addons',
		'Entities',
		'Identifier'
	)
	const prefixedEntityIdentifiers = unprefixedEntityIdentifiers.map(
		(identifier) => `minecraft:${identifier}`
	)

	// Write to general/vanilla/identifiers.json
	const data = await Deno.readTextFile(
		'packages/minecraftBedrock/schema/general/vanilla/identifiers.json'
	)
	const json = JSON.parse(data)
	await Deno.writeTextFile(
		'packages/minecraftBedrock/schema/general/vanilla/identifiers.json',
		JSON.stringify(
			{
				$schema: 'http://json-schema.org/draft-07/schema',
				definitions: {
					...json.definitions,
					block_identifiers: {
						type: 'string',
						enum: prefixedBlockIdentifiers,
					},
					unprefixed_block_identifiers: {
						type: 'string',
						enum: unprefixedBlockIdentifiers,
					},
					item_identifiers: {
						type: 'string',
						enum: prefixedItemIdenifiers,
					},
					unprefixed_item_identifiers: {
						type: 'string',
						enum: unprefixedItemIdentifiers,
					},
					entity_identifiers: {
						type: 'string',
						enum: prefixedEntityIdentifiers,
					},
					unprefixed_entity_identifiers: {
						type: 'string',
						enum: unprefixedEntityIdentifiers,
					},
				},
			},
			null,
			'\t'
		)
	)
}
