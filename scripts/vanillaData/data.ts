import { DocTarget, ExportTarget, GameTarget } from './interfaces.ts'

/**
 * Define the data that should be scraped from the game files and documentation.
 */
export const toScrape: { documentation: DocTarget[]; game: GameTarget[] } = {
	documentation: [
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
			id: 'material',
			path: 'entity',
			packType: 'resourcePack',
			content: 'minecraft:client_entity/description/materials/*',
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
	material: [
		'alpha_block',
		'alpha_block_color',
		'armor',
		'armor_enchanted',
		'armor_leather',
		'armor_leather_enchanted',
		'banner',
		'banner_pole',
		'beacon_beam',
		'beacon_beam_transparent',
		'bed',
		'bell',
		'boat',
		'chalkboard',
		'chest',
		'clownfish',
		'conduit',
		'conduit_wind',
		'dragon_head',
		'elytra',
		'enchanting_table_book',
		'entity',
		'entity_alphablend',
		'entity_alphablend_nocolor',
		'entity_alphatest_change_color',
		'entity_alphatest_change_color_glint',
		'entity_alphatest_glint',
		'entity_alphatest_glint_item',
		'entity_alphatest_multicolor_tint',
		'entity_change_color',
		'entity_change_color_glint',
		'entity_custom',
		'entity_dissolve_layer0',
		'entity_dissolve_layer1',
		'entity_emissive',
		'entity_emissive_alpha',
		'entity_emissive_alpha_one_sided',
		'entity_flat_color_line',
		'entity_glint',
		'entity_lead_base',
		'entity_loyalty_rope',
		'entity_multitexture',
		'entity_multitexture_alpha_test',
		'entity_multitexture_alpha_test_color_mask',
		'entity_multitexture_color_mask',
		'entity_multitexture_masked',
		'entity_multitexture_multiplicative_blend',
		'entity_nocull',
		'entity_static',
		'horse_saddle',
		'item_in_hand',
		'item_in_hand_entity_alphatest',
		'item_in_hand_entity_alphatest_color',
		'item_in_hand_glint',
		'item_in_hand_multicolor_tint',
		'map',
		'map_decoration',
		'map_marker',
		'mob_head',
		'mooshroom_mushrooms',
		'moving_block',
		'moving_block_alpha',
		'moving_block_alpha_seasons',
		'moving_block_alpha_single_side',
		'moving_block_blend',
		'moving_block_double_side',
		'moving_block_seasons',
		'npc',
		'opaque_block',
		'opaque_block_color',
		'opaque_block_color_uv2',
		'piston_arm',
		'player',
		'player_alphatest',
		'player_animated',
		'shield',
		'shield_glint',
		'shulker_box',
		'trident',
		'trident_glint',
		'trident_riptide',
	],
	damageType: ['fatal', 'attack', 'any'],
}
