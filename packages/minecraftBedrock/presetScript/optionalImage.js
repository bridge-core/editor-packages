module.exports = async ({ createFile, loadPresetFile, models }) => {
	let {
		IMAGE,
		IDENTIFIER,
		IMAGE_SAVE_PATH, // [packPath, filePath]
		DEFAULT_IMAGE,
		PRESET_PATH
	} = models
	if (!IMAGE) IMAGE = await loadPresetFile(DEFAULT_IMAGE)

	await createFile(`${IMAGE_SAVE_PATH[1]}${PRESET_PATH}${IDENTIFIER}.png`, IMAGE, { packPath: IMAGE_SAVE_PATH[0] })
}
