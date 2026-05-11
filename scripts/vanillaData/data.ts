import { DocTarget, ExportTarget, GameTarget } from './interfaces.ts'

type ScraperSource = {
	documentation: DocTarget[]
	game: GameTarget[]
}

/**
 * Define the data that should be scraped from the game files and documentation.
 */
export const toScrape: ScraperSource = {
	documentation: [
		{
			id: 'entity_ai_goals',
			page: 'Entities',
			target: 'AI Goals/JSON Name',
			map: (val) => val.split(' ')[0],
		},
		{
			id: 'entity_attributes',
			page: 'Entities',
			target: 'Attributes/JSON Name',
			map: (val) => val.split(' ')[0],
		},
		{
			id: 'entity_components',
			page: 'Entities',
			target: 'Components/JSON Name',
			map: (val) => val.split(' ')[0],
		},
		{
			id: 'entity_properties',
			page: 'Entities',
			target: 'Properties/JSON Name',
			map: (val) => val.split(' ')[0],
		},
		{
			id: 'entity_triggers',
			page: 'Entities',
			target: 'Triggers/JSON Name',
			map: (val) => val.split(' ')[0],
		},
		{
			id: 'prefixed_entity_identifiers',
			target: 'Entities/Identifier',
			filter: (val: string) => !['undefined_test_only'].includes(val),
			map: (val: string) => `minecraft:${val}`,
		},
		{
			id: 'unprefixed_entity_identifiers',
			target: 'Entities/Identifier',
			filter: (val: string) => !['undefined_test_only'].includes(val),
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
			packType: 'behaviorPack',
			content: 'minecraft:biome/components/minecraft:tags/tags',
		},
		{
			id: 'camera_preset_identifiers',
			path: 'cameras/presets',
			packType: 'behaviorPack',
			content: 'minecraft:camera_preset/identifier',
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
			id: 'texture_paths',
			path: 'textures',
			packType: 'resourcePack',
			filter: (val) => !val.endsWith('.texture_set'),
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
			content: ['/', 'sound_definitions'],
			filter: (val: string) => val !== 'format_version',
		},
		{
			id: 'musicDefinition',
			path: 'sounds/music_definitions.json',
			packType: 'resourcePack',
			content: '/',
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
			content: ['minecraft:geometry/*/description/identifier', '/'],
			filter: (val: string) => val.startsWith('geometry.'),
			map: (val: string) => val.split(':')[0],
		},
		{
			id: 'biome_identifiers',
			path: 'biomes',
			packType: 'behaviorPack',
			content: 'minecraft:biome/description/identifier',
			map: (val: string) => val.replace('minecraft:', ''),
		},
		{
			id: 'prefixed_biome_identifiers',
			path: 'biomes',
			packType: 'behaviorPack',
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
		{
			id: 'aim_assist_categories_identifiers',
			path: 'aim_assist/categories',
			packType: 'behaviorPack',
			content: 'minecraft:aim_assist_categories/identifier',
		},
		{
			id: 'aim_assist_preset_identifiers',
			path: 'aim_assist/presets',
			packType: 'behaviorPack',
			content: 'minecraft:aim_assist_preset/identifier',
		},
		{
			id: 'jigsaw_structure_identifiers',
			path: 'worldgen/jigsaw_structures',
			packType: 'behaviorPack',
			content: 'minecraft:jigsaw/description/identifier',
		},
		{
			id: 'template_pool_identifiers',
			path: 'worldgen/template_pools',
			packType: 'behaviorPack',
			content: 'minecraft:template_pool/description/identifier',
		},
		{
			id: 'processor_list_identifiers',
			path: 'worldgen/processors',
			packType: 'behaviorPack',
			content: 'minecraft:processor_list/description/identifier',
		},
		{
			id: 'structure_set_identifiers',
			path: 'worldgen/structure_sets',
			packType: 'behaviorPack',
			content: 'minecraft:structure_set/description/identifier',
		},
		{
			id: 'atmosphere_settings_identifiers',
			path: 'atmospherics',
			packType: 'resourcePack',
			content: 'minecraft:atmosphere_settings/description/identifier',
		},
		{
			id: 'color_grading_settings_identifiers',
			path: 'color_grading',
			packType: 'resourcePack',
			content: 'minecraft:color_grading_settings/description/identifier',
		},
		{
			id: 'lighting_settings_identifiers',
			path: 'lighting',
			packType: 'resourcePack',
			content: 'minecraft:lighting_settings/description/identifier',
		},
		{
			id: 'water_settings_identifiers',
			path: 'water',
			packType: 'resourcePack',
			content: 'minecraft:water_settings/description/identifier',
		},
		{
			id: 'cubemap_settings_identifiers',
			path: 'cubemaps',
			packType: 'resourcePack',
			content: 'minecraft:cubemap_settings/description/identifier',
		},
		{
			id: 'material',
			path: 'materials/entity.material',
			packType: 'resourcePack',
			content: 'materials',
			filter: (val: string) => val !== 'version',
			map: (val: string) => val.split(':')[0],
		},
		{
			id: 'itemGroup',
			packType: 'behaviorPack',
			path: 'item_catalog/crafting_item_catalog.json',
			content:
				'minecraft:crafting_items_catalog/categories/*/groups/*/group_identifier/name',
			map: (val: string) => val.replace('minecraft:', ''),
			filter: (val: string) => !['undefined_test_only'].includes(val),
		},
		{
			id: 'prefixedItemGroup',
			packType: 'behaviorPack',
			path: 'item_catalog/crafting_item_catalog.json',
			content:
				'minecraft:crafting_items_catalog/categories/*/groups/*/group_identifier/name',
		},
		{
			id: 'actionText',
			packType: 'resourcePack',
			path: 'texts/en_US.lang',
			content: '^action\\.interact\\.',
		},
		{
			id: 'blockSound',
			packType: 'resourcePack',
			path: 'blocks.json',
			content: '*/sound',
		},
		{
			id: 'individualEventSound',
			packType: 'resourcePack',
			path: 'sounds.json',
			content: ['individual_event_sounds/events'],
		},
		{
			id: 'individualNamedSound',
			packType: 'resourcePack',
			path: 'sounds.json',
			content: ['individual_named_sounds/sounds'],
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
		from: [
			'entity_ai_goals.json',
			'entity_attributes.json',
			'entity_components.json',
			'entity_properties.json',
			'entity_triggers.json',
		],
		to: 'general/vanilla/entityComponentList.json',
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
export const baseData: Record<string, string[]> = {
	damageType: ['fatal', 'attack', 'any'],
}
