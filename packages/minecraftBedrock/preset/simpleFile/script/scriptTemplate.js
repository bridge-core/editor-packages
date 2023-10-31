module.exports = async ({ createFile, loadPresetFile, models }) => {
	let { LANGUAGE, FILE_NAME, TEMPLATE, PRESET_PATH } = models
	const file = TEMPLATE ? await loadPresetFile('script.js') : ''

	await createFile(`${PRESET_PATH}${FILE_NAME}.${LANGUAGE}`, file, {
		openFile: true,
		packPath: 'behaviorPack',
	})
}
