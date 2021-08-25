module.exports = async ({ loadPresetFile, models, createJSONFile }) => {
    const {
        FILE_NAME,
        PRESET_PATH,
        TEMPLATE,
        TEMPLATES
    } = models
    let CHOSEN_TEMPLATE = ''

    // TEMPLATES: [[option, file],...]
    // Find which template has been chosen
    for (const [option, file] of TEMPLATES) {
        if (option === TEMPLATE) CHOSEN_TEMPLATE = file
    }

    // Load chosen template file
    const MODEL = await loadPresetFile(CHOSEN_TEMPLATE)
    const DATA = await MODEL.text()

    // Create file with chosen template data
    await createJSONFile(`${PRESET_PATH}${FILE_NAME}.json`, JSON.parse(DATA), {
        inject: ['FILE_NAME', 'PROJECT_PREFIX'],
        openFile: true
    })
}