import { DocTarget, ExportTarget, GameTarget } from './interfaces.ts'

/**
 * Base vanilla data to be added to generated content in case it is missing from documentation or game files.
 * @example
 * ```js
 * {
 *     entityIdentifiers: ["pig", "cow"],
 *     entityFamilies: ["monster"],
 * }
 * ```
 */
export const baseData: Record<string, string[]> = {}

/**
 * Define the data that should be scraped from the game files and documentation.
 */
export const toScrape: { documentation: DocTarget[]; game: GameTarget[] } = {
	documentation: [
		{
			id: 'prefixed_entity_identifiers',
			target: 'Entities/Identifier',
			map: (val: string) => `minecraft:${val}`,
		},
		{
			id: 'unprefixed_entity_identifiers',
			target: 'Entities/Identifier',
		},
		{
			id: 'prefixed_block_identifiers',
			target: 'Blocks/Name',
			filter: (val: string) =>
				!['format_version', 'elements', 'materials', 'parent'].includes(
					val
				),
		},
		{
			id: 'unprefixed_block_identifiers',
			target: 'Blocks/Name',
			map: (val: string) => val.replace('minecraft:', ''),
			filter: (val: string) =>
				!['format_version', 'elements', 'materials', 'parent'].includes(
					val
				),
		},
		{
			id: 'prefixed_item_identifiers',
			target: 'Items/Name',
			map: (val: string) => `minecraft:${val}`,
		},
		{
			id: 'unprefixed_item_identifiers',
			target: 'Items/Name',
		},
		{
			id: 'damageType',
			target: 'Entity Damage Source/Damage Source',
		},
	],
	game: [
		{
			id: 'animation',
			path: 'animations',
			content: 'animations',
			packType: 'resourcePack',
		},
		{
			id: 'animationController',
			path: 'animation_controllers',
			content: 'animation_controllers',
			packType: 'resourcePack',
		},
		{
			id: 'biomeTag',
			path: 'biomes',
			packType: 'definitions',
			content: 'minecraft:biome/components',
			filter: (val: string) => !val.startsWith('minecraft:'),
		},
		{
			id: 'family',
			path: 'entities',
			packType: 'behaviorPack',
			content: [
				'minecraft:entity/components/minecraft:type_family/family',
				'minecraft:entity/component_groups/*/minecraft:type_family/family',
			],
		},
		{
			id: 'itemTexture',
			path: 'textures/item_texture.json',
			packType: 'resourcePack',
			content: 'texture_data',
		},
		{
			id: 'entity_texture_paths',
			path: 'textures/entity',
			packType: 'resourcePack',
		},
		{
			id: 'item_texture_paths',
			path: 'textures/items',
			packType: 'resourcePack',
		},
		{
			id: 'particle_texture_paths',
			path: 'textures/particle',
			packType: 'resourcePack',
		},
		{
			id: 'block_texture_paths',
			path: 'textures/blocks',
			packType: 'resourcePack',
		},
		{
			id: 'sound_paths',
			path: 'sounds',
			packType: 'resourcePack',
			filter: (val: string) => !val.endsWith('.json'),
		},
		{
			id: 'loot_table_paths',
			path: 'loot_tables',
			packType: 'behaviorPack',
			extensions: true,
		},
		{
			id: 'trade_table_paths',
			path: 'trading',
			packType: 'behaviorPack',
			extensions: true,
		},
		{
			id: 'soundDefinition',
			path: 'sounds/sound_definitions.json',
			packType: 'resourcePack',
			content: '/',
			filter: (val: string) => val !== 'format_version',
		},
		{
			id: 'renderController',
			path: 'render_controllers',
			packType: 'resourcePack',
			content: 'render_controllers',
		},
		{
			id: 'terrainTexture',
			path: 'textures/terrain_texture.json',
			packType: 'resourcePack',
			content: 'texture_data',
		},
		{
			id: 'geometry',
			path: 'models',
			packType: 'resourcePack',
			content: ['minecraft:geometry/0/description/identifier', '/'],
			filter: (val: string) => val.startsWith('geometry.'),
		},
		{
			id: 'biome_identifiers',
			path: 'biomes',
			packType: 'definitions',
			content: 'minecraft:biome/description/identifier',
		},
		{
			id: 'particle_identifiers',
			path: 'particles',
			packType: 'resourcePack',
			content: 'particle_effect/description/identifier',
		},
		{
			id: 'fog_identifiers',
			path: 'fogs',
			packType: 'resourcePack',
			content: 'minecraft:fog_settings/description/identifier',
		},
		{
			id: 'feature_identifiers',
			path: 'features',
			packType: 'definitions',
			content: '*/description/identifier',
		},
		{
			id: 'feature_rule_identifiers',
			path: 'feature_rules',
			packType: 'definitions',
			content: 'minecraft:feature_rules/description/identifier',
		},
	],
}

/**
 * Define the schemas that should be generated from the raw files that are scraped.
 */
export const exportRaw: ExportTarget[] = [
	{
		from: [
			'prefixed_block_identifiers.json',
			'unprefixed_block_identifiers.json',
			'prefixed_item_identifiers.json',
			'unprefixed_item_identifiers.json',
			'prefixed_entity_identifiers.json',
			'unprefixed_entity_identifiers.json',
			'particle_identifiers.json',
			'biome_identifiers.json',
			'fog_identifiers.json',
			'feature_identifiers.json',
			'feature_rule_identifiers.json',
		],
		to: 'general/vanilla/identifiers.json',
	},
	{
		from: ['damageType.json'],
		to: 'general/vanilla/damageType.json',
	},
	{
		from: ['animation.json'],
		to: 'general/vanilla/animation.json',
	},
	{
		from: ['animationController.json'],
		to: 'general/vanilla/animationController.json',
	},
	{
		from: ['family.json'],
		to: 'general/vanilla/family.json',
	},
	{
		from: ['itemTexture.json'],
		to: 'general/vanilla/itemTexture.json',
	},
	{
		from: [
			'entity_texture_paths.json',
			'item_texture_paths.json',
			'particle_texture_paths.json',
			'block_texture_paths.json',
			'sound_paths.json',
			'loot_table_paths.json',
			'trade_table_paths.json',
		],
		to: 'general/vanilla/paths.json',
	},
	{
		from: ['soundDefinition.json'],
		to: 'general/vanilla/soundDefinition.json',
	},
	{
		from: ['renderController.json'],
		to: 'general/vanilla/renderController.json',
	},
	{
		from: ['terrainTexture.json'],
		to: 'general/vanilla/terrainTexture.json',
	},
	{
		from: ['geometry.json'],
		to: 'general/vanilla/geometry.json',
	},
	{
		from: ['biomeTag.json'],
		to: 'general/vanilla/biomeTagEnum.json',
	},
	{
		from: ['biomeTag.json'],
		to: 'general/vanilla/biomeTagProperty.json',
		type: 'property',
	},
]