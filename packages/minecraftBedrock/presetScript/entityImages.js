module.exports = async ({ createFile, expandFile, models, loadPresetFile }) => {
	async function createClientEntity(hasEggTexture) {
		const CLIENT_ENTITY_MODEL = await loadPresetFile(hasEggTexture ? CLIENT_ENTITY_EGG : CLIENT_ENTITY_NO_EGG)
		let CLIENT_ENTITY_DATA = await CLIENT_ENTITY_MODEL.text()
		CLIENT_ENTITY_DATA = CLIENT_ENTITY_DATA.replaceAll('{{TEXTURE_FILE_NAME}}', FILE_NAME)

		await createFile(
			`RP/entity/${PRESET_PATH}${IDENTIFIER}.json`,
			CLIENT_ENTITY_DATA,
			{ inject: ['IDENTIFIER', 'PROJECT_PREFIX', 'PRESET_PATH'] }
		)
	}

	let {
		SPAWN_EGG,
		IDENTIFIER,
		PROJECT_PREFIX,
		PRESET_PATH,
		CLIENT_ENTITY_EGG,
		CLIENT_ENTITY_NO_EGG,
		TEXTURE,
		DEFAULT_TEXTURE
	} = models
	let FILE_NAME = IDENTIFIER

	if (DEFAULT_TEXTURE) {
		if (!TEXTURE) TEXTURE = await loadPresetFile(DEFAULT_TEXTURE)
		else FILE_NAME = TEXTURE.name.replace(/.png|.tga|.jpg|.jpeg/gi, '')

		await createFile(`RP/textures/entity/${PRESET_PATH}${FILE_NAME}.png`, TEXTURE)
	}

	if (!SPAWN_EGG) {
		// Client entity
		await createClientEntity(false)
	} else {
		const EGG_FILE_NAME = SPAWN_EGG.name.replace(/.png|.tga|.jpg|.jpeg/gi, '')

		// Spawn egg texture
		await createFile(
			`RP/textures/items/${PRESET_PATH}${EGG_FILE_NAME}_egg.png`,
			SPAWN_EGG
		)
		// Item textures
		await expandFile(
			'RP/textures/item_texture.json',
			{
				texture_data: {
					[`${PROJECT_PREFIX}_${IDENTIFIER}_egg`]: {
						textures: `textures/items/${PRESET_PATH}${EGG_FILE_NAME}_egg`
					}
				}
			}
		)
		// Client entity
		await createClientEntity(true)
	}
}
