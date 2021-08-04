module.exports = async ({ createFile, loadPresetFile, models, expandFile }) => {
	let {
		TEXTURE,
		IDENTIFIER,
        PROJECT_PREFIX,
		DEFAULT_TEXTURE,
		PRESET_PATH
	} = models
    let FILE_NAME = IDENTIFIER
	
	if (!TEXTURE) TEXTURE = await loadPresetFile(DEFAULT_TEXTURE)
    else FILE_NAME = TEXTURE.name.replace(/.png|.tga|.jpg|.jpeg/gi, '')

	await createFile(`RP/textures/items/${PRESET_PATH}${FILE_NAME}.png`, TEXTURE)
    await expandFile('RP/textures/item_texture.json', {
        texture_data: {
            [`${PROJECT_PREFIX}_${IDENTIFIER}`]: {
                textures: `textures/items/${PRESET_PATH}${FILE_NAME}`
            }
        }
    })
}
