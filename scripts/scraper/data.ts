import { FileTarget } from './target/file.ts'
import { WebPageTarget } from './target/webPage.ts'
import { ScrapeImport, ScrapeExport, PackType } from './types.ts'

const VANILLA_DOCS_BASE_URL =
	'https://raw.githubusercontent.com/Mojang/bedrock-samples/preview/documentation/'

export const IMPORTS: ScrapeImport[] = [
	{
		id: 'animation',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'animations',
				'animations'
			),
		],
	},
	{
		id: 'animationController',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'animation_controllers',
				'animation_controllers'
			),
		],
	},
	{
		id: 'biomeTag',
		targets: [
			scrapeFileContents(
				PackType.BEHAVIOR_PACK,
				'biomes',
				'minecraft:biome/components/minecraft:tags/tags'
			),
		],
	},
	{
		id: 'camera_preset_identifiers',
		targets: [
			scrapeFileContents(
				PackType.BEHAVIOR_PACK,
				'cameras/presets',
				'minecraft:camera_preset/identifier'
			),
		],
	},
	{
		id: 'family',
		targets: [
			scrapeFileContents(PackType.BEHAVIOR_PACK, 'entities', [
				'minecraft:entity/components/minecraft:type_family/family',
				'minecraft:entity/component_groups/*/minecraft:type_family/family',
			]),
		],
	},
	{
		id: 'itemTexture',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'textures/item_texture.json',
				'texture_data'
			),
		],
	},
	{
		id: 'texture_paths',
		targets: [scrapeResourcePackPaths('textures')],
		filter: (val) => !val.endsWith('.texture_set'),
	},
	{
		id: 'sound_paths',
		targets: [scrapeResourcePackPaths('sounds')],
		filter: (val) => !val.endsWith('.json'),
	},
	{
		id: 'loot_table_paths',
		targets: [scrapeBehaviorPackPaths('loot_tables', true)],
	},
	{
		id: 'trade_table_paths',
		targets: [scrapeBehaviorPackPaths('trading', true)],
	},
	{
		id: 'soundDefinition',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'sounds/sound_definitions.json',
				['/', 'sound_definitions']
			),
		],
		filter: (val: string) => val !== 'format_version',
	},
	{
		id: 'musicDefinition',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'sounds/music_definitions.json',
				['/']
			),
		],
	},
	{
		id: 'renderController',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'render_controllers',
				'render_controllers'
			),
		],
	},
	{
		id: 'terrainTexture',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'textures/terrain_texture.json',
				'texture_data'
			),
		],
	},
	{
		id: 'geometry',
		targets: [
			scrapeFileContents(PackType.RESOURCE_PACK, 'models', [
				'minecraft:geometry/*/description/identifier',
				'/',
			]),
		],
		filter: (val: string) => val.startsWith('geometry.'),
		map: (val: string) => val.split(':')[0],
	},
	{
		id: 'biome_identifiers',
		targets: [
			scrapeFileContents(
				PackType.BEHAVIOR_PACK,
				'biomes',
				'minecraft:biome/description/identifier'
			),
		],
		map: (val: string) => val.replace('minecraft:', ''),
	},
	{
		id: 'prefixed_biome_identifiers',
		targets: [
			scrapeFileContents(
				PackType.BEHAVIOR_PACK,
				'biomes',
				'minecraft:biome/description/identifier'
			),
		],
	},
	{
		id: 'particle_identifiers',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'particles',
				'particle_effect/description/identifier'
			),
		],
	},
	{
		id: 'fog_identifiers',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'fogs',
				'minecraft:fog_settings/description/identifier'
			),
		],
	},
	{
		id: 'feature_identifiers',
		targets: [
			scrapeFileContents(
				PackType.DEFINITIONS,
				'features',
				'minecraft:feature/description/identifier'
			),
		],
	},
	{
		id: 'feature_rule_identifiers',
		targets: [
			scrapeFileContents(
				PackType.DEFINITIONS,
				'feature_rules',
				'minecraft:feature_rule/description/identifier'
			),
		],
	},
	{
		id: 'aim_assist_categories_identifiers',
		targets: [
			scrapeFileContents(
				PackType.BEHAVIOR_PACK,
				'aim_assist/categories',
				'minecraft:aim_assist_categories/description/identifier'
			),
		],
	},
	{
		id: 'aim_assist_preset_identifiers',
		targets: [
			scrapeFileContents(
				PackType.BEHAVIOR_PACK,
				'aim_assist/presets',
				'minecraft:aim_assist_preset/description/identifier'
			),
		],
	},
	{
		id: 'jigsaw_structure_identifiers',
		targets: [
			scrapeFileContents(
				PackType.BEHAVIOR_PACK,
				'worldgen/structures',
				'minecraft:jigsaw/description/identifier'
			),
		],
	},
	{
		id: 'template_pool_identifiers',
		targets: [
			scrapeFileContents(
				PackType.BEHAVIOR_PACK,
				'worldgen/template_pools',
				'minecraft:template_pool/description/identifier'
			),
		],
	},
	{
		id: 'processor_list_identifiers',
		targets: [
			scrapeFileContents(
				PackType.BEHAVIOR_PACK,
				'worldgen/processors',
				'minecraft:processor_list/description/identifier'
			),
		],
	},
	{
		id: 'structure_set_identifiers',
		targets: [
			scrapeFileContents(
				PackType.BEHAVIOR_PACK,
				'worldgen/structure_sets',
				'minecraft:structure_set/description/identifier'
			),
		],
	},
	{
		id: 'atmosphere_settings_identifiers',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'atmospherics',
				'minecraft:atmosphere_settings/description/identifier'
			),
		],
	},
	{
		id: 'color_grading_settings_identifiers',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'color_grading',
				'minecraft:color_grading_settings/description/identifier'
			),
		],
	},
	{
		id: 'lighting_settings_identifiers',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'lighting',
				'minecraft:lighting_settings/description/identifier'
			),
		],
	},
	{
		id: 'water_settings_identifiers',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'water',
				'minecraft:water_settings/description/identifier'
			),
		],
	},
	{
		id: 'cubemap_settings_identifiers',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'cubemaps',
				'minecraft:cubemap_settings/description/identifier'
			),
		],
	},
	{
		id: 'material',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'materials/entity.material',
				'materials'
			),
		],
		filter: (val: string) => val !== 'version',
		map: (val: string) => val.split(':')[0],
	},
	{
		id: 'itemGroup',
		targets: [
			scrapeFileContents(
				PackType.BEHAVIOR_PACK,
				'item_catalog/crafting_item_catalog.json',
				'minecraft:crafting_items_catalog/categories/*/groups/*/group_identifier/name'
			),
		],
		map: (val: string) => val.replace('minecraft:', ''),
		filter: (val: string) => !['undefined_test_only'].includes(val),
	},
	{
		id: 'prefixedItemGroup',
		targets: [
			scrapeFileContents(
				PackType.BEHAVIOR_PACK,
				'item_catalog/crafting_item_catalog.json',
				'minecraft:crafting_items_catalog/categories/*/groups/*/group_identifier/name'
			),
		],
		filter: (val: string) => !['undefined_test_only'].includes(val),
	},
	{
		id: 'actionText',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'texts/en_US.lang',
				'^action\\.interact\\.'
			),
		],
	},
	{
		id: 'blockSound',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'blocks.json',
				'*/sound'
			),
		],
	},
	{
		id: 'individualEventSound',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'sounds.json',
				'individual_event_sounds/events'
			),
		],
	},
	{
		id: 'individualNamedSound',
		targets: [
			scrapeFileContents(
				PackType.RESOURCE_PACK,
				'sounds.json',
				'individual_named_sounds/sounds'
			),
		],
	},
	{
		id: 'entityComponent',
		targets: [
			scrapeWebPageContents(
				VANILLA_DOCS_BASE_URL + 'Entities.html',
				'AI Goals/JSON Name'
			),
			scrapeWebPageContents(
				VANILLA_DOCS_BASE_URL + 'Entities.html',
				'Attributes/JSON Name'
			),
			scrapeWebPageContents(
				VANILLA_DOCS_BASE_URL + 'Entities.html',
				'Properties/JSON Name'
			),
			scrapeWebPageContents(
				VANILLA_DOCS_BASE_URL + 'Entities.html',
				'Triggers/JSON Name'
			),
		],
		map: (val) => val.split(' ')[0],
	},
	{
		id: 'item_identifiers',
		targets: [
			scrapeWebPageContents(
				VANILLA_DOCS_BASE_URL + 'Addons.html',
				'Items/Name'
			),
			scrapeFileContents(
				PackType.BEHAVIOR_PACK,
				'items',
				'minecraft:item/description/identifier'
			),
		],
		map: (val: string) =>
			val.startsWith('minecraft:') ? val : `minecraft:${val}`,
	},
	{
		id: 'block_identifiers',
		targets: [
			scrapeWebPageContents(
				VANILLA_DOCS_BASE_URL + 'Addons.html',
				'Blocks/Name'
			),
			scrapeFileContents(
				PackType.BEHAVIOR_PACK,
				'blocks',
				'minecraft:block/description/identifier'
			),
		],
		filter: (val: string) =>
			!['format_version', 'elements', 'materials', 'parent'].includes(
				val
			),
	},
	{
		id: 'entity_identifiers',
		targets: [
			scrapeWebPageContents(
				VANILLA_DOCS_BASE_URL + 'Addons.html',
				'Entities/Identifier'
			),
		],
		filter: (val: string) => !['undefined_test_only'].includes(val),
		map: (val: string) => `minecraft:${val}`,
	},
	{
		id: 'damageType',
		targets: [
			scrapeWebPageContents(
				VANILLA_DOCS_BASE_URL + 'Addons.html',
				'Entity Damage Source/Damage Source'
			),
		],
	},
]
export const EXPORTS: ScrapeExport[] = [
	{
		from: [
			'block_identifiers.json',
			'item_identifiers.json',
			'entity_identifiers.json',
			'particle_identifiers.json',
			'biome_identifiers.json',
			'prefixed_biome_identifiers.json',
			'camera_preset_identifiers.json',
			'fog_identifiers.json',
			'feature_identifiers.json',
			'feature_rule_identifiers.json',
			'aim_assist_categories_identifiers.json',
			'aim_assist_preset_identifiers.json',
			'jigsaw_structure_identifiers.json',
			'template_pool_identifiers.json',
			'processor_list_identifiers.json',
			'structure_set_identifiers.json',
			'atmosphere_settings_identifiers.json',
			'color_grading_settings_identifiers.json',
			'lighting_settings_identifiers.json',
			'water_settings_identifiers.json',
			'cubemap_settings_identifiers.json',
		],
		to: 'general/vanilla/identifiers.json',
	},
	{
		from: ['damageType.json'],
		to: 'general/vanilla/damageType.json',
	},
	{
		from: ['animation.json'],
		to: 'general/vanilla/clientAnimation.json',
	},
	{
		from: ['animationController.json'],
		to: 'general/vanilla/clientAnimationController.json',
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
			'texture_paths.json',
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
		from: ['musicDefinition.json'],
		to: 'general/vanilla/musicDefinition.json',
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
	{
		from: ['material.json'],
		to: 'general/vanilla/material.json',
	},
	{
		from: ['actionText.json'],
		to: 'general/vanilla/actionText.json',
	},
	{
		from: ['itemGroup.json'],
		to: 'general/vanilla/itemGroup.json',
	},
	{
		from: ['prefixedItemGroup.json'],
		to: 'general/vanilla/prefixedItemGroup.json',
	},
	{
		from: ['blockSound.json'],
		to: 'general/vanilla/blockSound.json',
	},
	{
		from: ['entityComponent.json'],
		to: 'general/vanilla/entityComponent.json',
	},
	{
		from: ['individualEventSound.json'],
		to: 'general/vanilla/individualEventSound.json',
	},
	{
		from: ['individualNamedSound.json'],
		to: 'general/vanilla/individualNamedSound.json',
	},
]

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
export const EMBEDDED_DATA: Record<string, string[]> = {
	damageType: ['fatal', 'attack', 'any'],
}

function scrapeWebPageContents(
	url: string,
	target: `${string}/${string}`
): WebPageTarget {
	return new WebPageTarget(url, target)
}

function scrapeFileContents(
	packType: PackType,
	path: string,
	toSearch: string | string[]
): FileTarget {
	return new FileTarget(packType, path, {
		locations: Array.isArray(toSearch) ? toSearch : [toSearch],
	})
}

function scrapeBehaviorPackPaths(
	baseDir: string,
	includeExtensions: boolean = false
): FileTarget {
	return scrapePackPaths(PackType.BEHAVIOR_PACK, baseDir, includeExtensions)
}

function scrapeResourcePackPaths(
	baseDir: string,
	includeExtensions: boolean = false
): FileTarget {
	return scrapePackPaths(PackType.RESOURCE_PACK, baseDir, includeExtensions)
}

function scrapePackPaths(
	packType: PackType,
	baseDir: string,
	includeExtensions: boolean = false
): FileTarget {
	return new FileTarget(packType, baseDir, {
		includeExtensions,
	})
}
