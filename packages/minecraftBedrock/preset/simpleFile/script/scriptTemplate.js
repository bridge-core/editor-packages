module.exports = async ({ createFile, loadPresetFile, models }) => {
	let { LANGUAGE, FILE_NAME, GAMETEST, PRESET_PATH } = models
	const file = GAMETEST ? await loadPresetFile('gameTest.js') : ''

	await createFile(`${PRESET_PATH}${FILE_NAME}.${LANGUAGE}`, file, {
		openFile: true,
		packPath: 'behaviorPack',
	})
}
