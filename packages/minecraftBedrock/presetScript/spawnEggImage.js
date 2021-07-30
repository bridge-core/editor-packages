module.exports = async ({ createFile, expandFile, models, loadPresetFile }) => {
	let {
		SPAWN_EGG,
		IDENTIFIER,
		PRESET_PATH,
		CLIENT_ENTITY_EGG,
		CLIENT_ENTITY_NO_EGG
	} = models

	if (!SPAWN_EGG) {
		// Client entity
		const CLIENT_ENTITY_MODEL = await loadPresetFile(CLIENT_ENTITY_NO_EGG)
		const CLIENT_ENTITY_DATA = await CLIENT_ENTITY_MODEL.text()
		await createFile(
			`RP/entity/${PRESET_PATH}${IDENTIFIER}.json`,
			CLIENT_ENTITY_DATA,
			{ inject: ['IDENTIFIER', 'PROJECT_PREFIX', 'PRESET_PATH'] }
		)
	} else {
		// Spawn egg texture
		await createFile(
			`RP/textures/items/${PRESET_PATH}${IDENTIFIER}_egg.png`,
			SPAWN_EGG
		)
		// Item textures
		await expandFile(
			'RP/textures/item_texture.json',
			{
				texture_data: {
					'{{PROJECT_PREFIX}}_{{IDENTIFIER}}_egg': {
						textures: 'textures/items/{{PRESET_PATH}}{{IDENTIFIER}}_egg'
					}
				}
			},
			{ inject: ['PROJECT_PREFIX', 'IDENTIFIER', 'PRESET_PATH'] }
		)
		// Client entity
		const CLIENT_ENTITY_MODEL = await loadPresetFile(CLIENT_ENTITY_EGG)
		const CLIENT_ENTITY_DATA = await CLIENT_ENTITY_MODEL.text()
		await createFile(
			`RP/entity/${PRESET_PATH}${IDENTIFIER}.json`,
			CLIENT_ENTITY_DATA,
			{ inject: ['IDENTIFIER', 'PROJECT_PREFIX', 'PRESET_PATH'] }
		)
	}
}
