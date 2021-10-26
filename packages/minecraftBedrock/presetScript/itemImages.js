module.exports = async ({ createFile, loadPresetFile, models, expandFile }) => {
	let {
		TEXTURE,
		IDENTIFIER,
        PROJECT_PREFIX,
		DEFAULT_TEXTURE,
		PRESET_PATH
	} = models
    let fileName = `${IDENTIFIER}.png`
	
	if (!TEXTURE) TEXTURE = await loadPresetFile(DEFAULT_TEXTURE)
    else fileName = TEXTURE.name
    const fileNameNoExtension = fileName.replace(/.png|.tga|.jpg|.jpeg/gi, '')

	await createFile(`textures/items/${PRESET_PATH}${fileName}`, TEXTURE, { packPath: 'resourcePack' })
    await expandFile('textures/item_texture.json', {
        texture_data: {
            [`${PROJECT_PREFIX}_${IDENTIFIER}`]: {
                textures: `textures/items/${PRESET_PATH}${fileNameNoExtension}`
            }
        }
    }, { packPath: 'resourcePack' })
}
