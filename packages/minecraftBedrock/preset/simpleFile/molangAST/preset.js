module.exports = async ({ createFile, loadPresetFile, models }) => {
	const { LANGUAGE, FILE_NAME } = models
	const file = await loadPresetFile('script.js')

	await createFile(
		`BP/scripts/molang/${FILE_NAME}.${
			LANGUAGE === 'JavaScript' ? 'js' : 'ts'
		}`,
		file,
		{ openFile: true }
	)
}
