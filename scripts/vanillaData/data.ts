import {
	DocTarget,
	ExportTarget,
	GameTarget,
	MisodeTarget,
} from './interfaces.ts'

/**
 * Define the data that should be scraped from the game files and documentation.
 */
export const toScrape: {
	documentation: DocTarget[]
	game: GameTarget[]
	misode: MisodeTarget[]
} = {
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
			packType: 'definitions',
			content: 'minecraft:biome/components/minecraft:tags/tags',
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
		{
			id: 'material',
			path: 'entity',
			packType: 'resourcePack',
			content: 'minecraft:client_entity/description/materials/*',
		},
		{
			id: 'itemGroup',
			packType: 'resourcePack',
			path: 'texts/en_US.lang',
			content: '^itemGroup\\.name\\.',
		},
		{
			id: 'actionText',
			packType: 'resourcePack',
			path: 'texts/en_US.lang',
			content: '^action\\.interact\\.',
		},
	],
	misode: [
		{
			id: 'advancement_identifiers',
			registry: 'advancement',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'attribute_identifiers',
			registry: 'attribute',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'banner_pattern_identifiers',
			registry: 'banner_pattern',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'block_identifiers',
			registry: 'block',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'block_entity_type_identifiers',
			registry: 'block_entity_type',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'cat_variant_identifiers',
			registry: 'cat_variant',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'damage_type_identifiers',
			registry: 'damage_type',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'decorated_pot_pattern_identifiers',
			registry: 'decorated_pot_patterns',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'dimension_identifiers',
			registry: 'dimension',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'dimension_type_identifiers',
			registry: 'dimension_type',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'enchantment_identifiers',
			registry: 'enchantment',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'entity_type_identifiers',
			registry: 'entity_type',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'fluid_identifiers',
			registry: 'fluid',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'frog_variant_identifiers',
			registry: 'frog_variant',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'game_event_identifiers',
			registry: 'game_event',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'instrument_identifiers',
			registry: 'instrument',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'item_identifiers',
			registry: 'item',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'loot_table_identifiers',
			registry: 'loot_table',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'mob_effect_identifiers',
			registry: 'mob_effect',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'potion_identifiers',
			registry: 'potion',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'painting_variant_identifiers',
			registry: 'painting_variant',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'recipe_identifiers',
			registry: 'recipe',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'structure_template_identifiers',
			registry: 'structure',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'trim_material_identifiers',
			registry: 'trim_material',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'trim_pattern_identifiers',
			registry: 'trim_pattern',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'villager_type_identifiers',
			registry: 'villager_type',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'wolf_variant_identifiers',
			registry: 'wolf_variant',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		// Worldgen
		{
			id: 'biome_identifiers',
			registry: 'worldgen/biome',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'configured_carver_identifiers',
			registry: 'worldgen/configured_carver',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'configured_feature_identifiers',
			registry: 'worldgen/configured_feature',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'density_function_identifiers',
			registry: 'worldgen/density_function',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'noise_identifiers',
			registry: 'worldgen/noise',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'noise_settings_identifiers',
			registry: 'worldgen/noise_settings',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'placed_feature_identifiers',
			registry: 'worldgen/placed_feature',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'processor_list_identifiers',
			registry: 'worldgen/processor_list',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'structure_identifiers',
			registry: 'worldgen/structure',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'structure_set_identifiers',
			registry: 'worldgen/structure_set',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'template_pool_identifiers',
			registry: 'worldgen/template_pool',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		// Tags
		{
			id: 'banner_pattern_tags',
			registry: 'tag/banner_pattern',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'hash_prefixed_banner_pattern_tags',
			registry: 'tag/banner_pattern',
			map: (val: string) => (val.length > 0 ? `#minecraft:${val}` : val),
		},
		{
			id: 'block_tags',
			registry: 'tag/block',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'hash_prefixed_block_tags',
			registry: 'tag/block',
			map: (val: string) => (val.length > 0 ? `#minecraft:${val}` : val),
		},
		{
			id: 'cat_variant_tags',
			registry: 'tag/cat_variant',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'hash_prefixed_cat_variant_tags',
			registry: 'tag/cat_variant',
			map: (val: string) => (val.length > 0 ? `#minecraft:${val}` : val),
		},
		{
			id: 'damage_type_tags',
			registry: 'tag/damage_type',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'hash_prefixed_damage_type_tags',
			registry: 'tag/damage_type',
			map: (val: string) => (val.length > 0 ? `#minecraft:${val}` : val),
		},
		{
			id: 'entity_type_tags',
			registry: 'tag/entity_type',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'hash_prefixed_entity_type_tags',
			registry: 'tag/entity_type',
			map: (val: string) => (val.length > 0 ? `#minecraft:${val}` : val),
		},
		{
			id: 'fluid_tags',
			registry: 'tag/fluid',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'hash_prefixed_fluid_tags',
			registry: 'tag/fluid',
			map: (val: string) => (val.length > 0 ? `#minecraft:${val}` : val),
		},
		{
			id: 'game_event_tags',
			registry: 'tag/game_event',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'hash_prefixed_game_event_tags',
			registry: 'tag/game_event',
			map: (val: string) => (val.length > 0 ? `#minecraft:${val}` : val),
		},
		{
			id: 'instrument_tags',
			registry: 'tag/instrument',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'hash_prefixed_instrument_tags',
			registry: 'tag/instrument',
			map: (val: string) => (val.length > 0 ? `#minecraft:${val}` : val),
		},
		{
			id: 'item_tags',
			registry: 'tag/item',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'hash_prefixed_item_tags',
			registry: 'tag/item',
			map: (val: string) => (val.length > 0 ? `#minecraft:${val}` : val),
		},
		{
			id: 'painting_variant_tags',
			registry: 'tag/painting_variant',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'hash_prefixed_painting_variant_tags',
			registry: 'tag/painting_variant',
			map: (val: string) => (val.length > 0 ? `#minecraft:${val}` : val),
		},
		{
			id: 'point_of_interest_type_tags',
			registry: 'tag/point_of_interest_type',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'hash_prefixed_point_of_interest_type_tags',
			registry: 'tag/point_of_interest_type',
			map: (val: string) => (val.length > 0 ? `#minecraft:${val}` : val),
		},
		{
			id: 'biome_tags',
			registry: 'tag/worldgen/biome',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'hash_prefixed_biome_tags',
			registry: 'tag/worldgen/biome',
			map: (val: string) => (val.length > 0 ? `#minecraft:${val}` : val),
		},
		{
			id: 'structure_tags',
			registry: 'tag/worldgen/structure',
			map: (val: string) => (val.length > 0 ? `minecraft:${val}` : val),
		},
		{
			id: 'hash_prefixed_structure_tags',
			registry: 'tag/worldgen/structure',
			map: (val: string) => (val.length > 0 ? `#minecraft:${val}` : val),
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
		package: 'minecraftBedrock',
	},
	{
		from: ['damageType.json'],
		to: 'general/vanilla/damageType.json',
		package: 'minecraftBedrock',
	},
	{
		from: ['animation.json'],
		to: 'general/vanilla/clientAnimation.json',
		package: 'minecraftBedrock',
	},
	{
		from: ['animationController.json'],
		to: 'general/vanilla/clientAnimationController.json',
		package: 'minecraftBedrock',
	},
	{
		from: ['family.json'],
		to: 'general/vanilla/family.json',
		package: 'minecraftBedrock',
	},
	{
		from: ['itemTexture.json'],
		to: 'general/vanilla/itemTexture.json',
		package: 'minecraftBedrock',
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
		package: 'minecraftBedrock',
	},
	{
		from: ['soundDefinition.json'],
		to: 'general/vanilla/soundDefinition.json',
		package: 'minecraftBedrock',
	},
	{
		from: ['renderController.json'],
		to: 'general/vanilla/renderController.json',
		package: 'minecraftBedrock',
	},
	{
		from: ['terrainTexture.json'],
		to: 'general/vanilla/terrainTexture.json',
		package: 'minecraftBedrock',
	},
	{
		from: ['geometry.json'],
		to: 'general/vanilla/geometry.json',
		package: 'minecraftBedrock',
	},
	{
		from: ['biomeTag.json'],
		to: 'general/vanilla/biomeTagEnum.json',
		package: 'minecraftBedrock',
	},
	{
		from: ['biomeTag.json'],
		to: 'general/vanilla/biomeTagProperty.json',
		type: 'property',
		package: 'minecraftBedrock',
	},
	{
		from: ['material.json'],
		to: 'general/vanilla/material.json',
		package: 'minecraftBedrock',
	},
	{
		from: ['actionText.json'],
		to: 'general/vanilla/actionText.json',
		package: 'minecraftBedrock',
	},
	{
		from: ['itemGroup.json'],
		to: 'general/vanilla/itemGroup.json',
		package: 'minecraftBedrock',
	},
	// Java Edition Package
	{
		from: [
			'attribute_identifiers.json',
			'block_identifiers.json',
			'cat_variant_identifiers.json',
			'decorated_pot_pattern_identifiers.json',
			'enchantment_identifiers.json',
			'entity_type_identifiers.json',
			'fluid_identifiers.json',
			'frog_variant_identifiers.json',
			'game_event_identifiers.json',
			'instrument_identifiers.json',
			'item_identifiers.json',
			'mob_effect_identifiers.json',
			'painting_variant_identifiers.json',
			'potion_identifiers.json',
			'villager_type_identifiers.json',
		],
		to: 'general/vanilla/identifiers.json',
		package: 'minecraftJava',
	},
	{
		from: [
			'advancement_identifiers.json',
			'banner_pattern_identifiers.json',
			'damage_type_identifiers.json',
			'dimension_identifiers.json',
			'dimension_type_identifiers.json',
			'loot_table_identifiers.json',
			'recipe_identifiers.json',
			'structure_template_identifiers.json',
			'trim_material_identifiers.json',
			'trim_pattern_identifiers.json',
			'wolf_variant_identifiers.json',
		],
		to: 'general/vanilla/data.json',
		package: 'minecraftJava',
	},
	{
		from: [
			'biome_identifiers.json',
			'configured_carver_identifiers.json',
			'configured_feature_identifiers.json',
			'density_function_identifiers.json',
			'noise_identifiers.json',
			'noise_settings_identifiers.json',
			'placed_feature_identifiers.json',
			'processor_list_identifiers.json',
			'structure_identifiers.json',
			'structure_set_identifiers.json',
			'template_pool_identifiers.json',
		],
		to: 'general/vanilla/worldgen.json',
		package: 'minecraftJava',
	},
	{
		from: [
			'banner_pattern_tags.json',
			'hash_prefixed_banner_pattern_tags.json',
			'block_tags.json',
			'hash_prefixed_block_tags.json',
			'cat_variant_tags.json',
			'hash_prefixed_cat_variant_tags.json',
			'damage_type_tags.json',
			'hash_prefixed_damage_type_tags.json',
			'entity_type_tags.json',
			'hash_prefixed_entity_type_tags.json',
			'fluid_tags.json',
			'hash_prefixed_fluid_tags.json',
			'game_event_tags.json',
			'hash_prefixed_game_event_tags.json',
			'instrument_tags.json',
			'hash_prefixed_instrument_tags.json',
			'item_tags.json',
			'hash_prefixed_item_tags.json',
			'painting_variant_tags.json',
			'hash_prefixed_painting_variant_tags.json',
			'point_of_interest_type_tags.json',
			'hash_prefixed_point_of_interest_type_tags.json',
			'biome_tags.json',
			'hash_prefixed_biome_tags.json',
			'structure_tags.json',
			'hash_prefixed_structure_tags.json',
		],
		to: 'general/vanilla/tags.json',
		package: 'minecraftJava',
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
