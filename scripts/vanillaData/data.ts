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
			id: 'misc_texture_paths',
			path: 'textures/misc',
			packType: 'resourcePack',
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
			id: 'geometry2',
			path: 'models',
			packType: 'resourcePack',
			content: ['minecraft:geometry/0/description/identifier', '/'],
			filter: (val: string) =>
				val.startsWith('geometry.') && val.includes(':'),
			map: (val: string) => val.split(':')[0],
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
			'misc_texture_paths.json',
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
		from: ['geometry2.json'],
		to: 'general/vanilla/geometry2.json',
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
