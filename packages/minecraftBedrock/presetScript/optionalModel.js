module.exports = async ({ createFile, loadPresetFile, models }) => {
	let { MODEL, IDENTIFIER, MODEL_SAVE_PATH, DEFAULT_MODEL } = models
	let FILE_NAME = `${IDENTIFIER}.json`
	if (!MODEL) MODEL = await loadPresetFile(DEFAULT_MODEL)
	else FILE_NAME = MODEL.name
	let DATA = await MODEL.text()
	let NEW_DATA = ''

	try {
		NEW_DATA = JSON.parse(DATA)
		if (NEW_DATA['minecraft:geometry']?.[0]?.description?.identifier)
			NEW_DATA[
				'minecraft:geometry'
			][0].description.identifier = `geometry.${IDENTIFIER}`

		NEW_DATA = JSON.stringify(NEW_DATA, null, '\t')
	} catch {
		NEW_DATA = DATA
	}

	await createFile(`${MODEL_SAVE_PATH[1]}${FILE_NAME}`, NEW_DATA, {
		inject: ['IDENTIFIER'],
		packPath: MODEL_SAVE_PATH[0]
	})
}
