module.exports = async ({ createFile, expandFile, models, loadPresetFile, createJSONFile }) => {
	async function createClientEntity(hasEggTexture) {
		const CLIENT_ENTITY_MODEL = await loadPresetFile(hasEggTexture ? CLIENT_ENTITY_EGG : CLIENT_ENTITY_NO_EGG)
		let CLIENT_ENTITY_DATA = await CLIENT_ENTITY_MODEL.text()
		CLIENT_ENTITY_DATA = CLIENT_ENTITY_DATA.replaceAll('{{TEXTURE_FILE_NAME}}', fileNameNoExtension)

		await createJSONFile(
			`entity/${PRESET_PATH}${IDENTIFIER}.json`,
			JSON.parse(CLIENT_ENTITY_DATA),
			{ inject: ['IDENTIFIER', 'PROJECT_PREFIX', 'PRESET_PATH'], openFile: true, packPath: 'resourcePack' }
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

		await createFile(`textures/entity/${PRESET_PATH}${fileName}`, TEXTURE, { packPath: 'resourcePack' })
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
			`textures/items/${PRESET_PATH}${eggFileName}`,
			SPAWN_EGG,
			{ packPath: 'resourcePack' }
		)
		// Item textures
		await expandFile(
			'textures/item_texture.json',
			{
				texture_data: {
					[`${PROJECT_PREFIX}_${IDENTIFIER}_egg`]: {
						textures: `textures/items/${PRESET_PATH}${eggFileNameNoExtension}`
					}
				}
			},
			{ packPath: 'resourcePack' }
		)
		// Client entity
		await createClientEntity(true)
	}
}
