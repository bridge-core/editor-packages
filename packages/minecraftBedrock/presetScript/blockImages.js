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

	await createFile(`RP/textures/blocks/${PRESET_PATH}${fileName}`, TEXTURE)
    await expandFile('RP/textures/terrain_texture.json', {
        texture_data: {
            [`${PROJECT_PREFIX}_${IDENTIFIER}`]: {
                textures: `textures/blocks/${PRESET_PATH}${fileNameNoExtension}`
            }
        }
    })
}
