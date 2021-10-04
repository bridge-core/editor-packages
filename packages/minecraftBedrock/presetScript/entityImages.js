module.exports = async ({ createFile, expandFile, models, loadPresetFile, createJSONFile }) => {
	async function createClientEntity(hasEggTexture) {
		const CLIENT_ENTITY_MODEL = await loadPresetFile(hasEggTexture ? CLIENT_ENTITY_EGG : CLIENT_ENTITY_NO_EGG)
		let CLIENT_ENTITY_DATA = await CLIENT_ENTITY_MODEL.text()
		CLIENT_ENTITY_DATA = CLIENT_ENTITY_DATA.replaceAll('{{TEXTURE_FILE_NAME}}', fileNameNoExtension)

		await createJSONFile(
			`RP/entity/${PRESET_PATH}${IDENTIFIER}.json`,
			JSON.parse(CLIENT_ENTITY_DATA),
			{ inject: ['IDENTIFIER', 'PROJECT_PREFIX', 'PRESET_PATH'], openFile: true }
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
	let fileName = `${IDENTIFIER}.png`
	let fileNameNoExtension = IDENTIFIER

	if (DEFAULT_TEXTURE) {
		if (!TEXTURE) TEXTURE = await loadPresetFile(DEFAULT_TEXTURE)
		else fileName = TEXTURE.name
		fileNameNoExtension = fileName.replace(/.png|.tga|.jpg|.jpeg/gi, '')

		await createFile(`RP/textures/entity/${PRESET_PATH}${fileName}`, TEXTURE)
	}

	if (!SPAWN_EGG) {
		// Client entity
		await createClientEntity(false)
	} else {
		// Add "_egg" before file extension
		const eggFileExtension = SPAWN_EGG.name.split('.').pop()
		const eggFileNameNoExtension = SPAWN_EGG.name.replace(/.png|.tga|.jpg|.jpeg/gi, '')
		const eggFileName = `${eggFileNameNoExtension}.${eggFileExtension}`

		// Spawn egg texture
		await createFile(
			`RP/textures/items/${PRESET_PATH}${eggFileName}`,
			SPAWN_EGG
		)
		// Item textures
		await expandFile(
			'RP/textures/item_texture.json',
			{
				texture_data: {
					[`${PROJECT_PREFIX}_${IDENTIFIER}_egg`]: {
						textures: `textures/items/${PRESET_PATH}${eggFileNameNoExtension}`
					}
				}
			}
		)
		// Client entity
		await createClientEntity(true)
	}
}
