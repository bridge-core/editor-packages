module.exports = async ({ createFile, createJSONFile, loadPresetFile, models }) => {
    const {
        HELMET,
        CHESTPLATE,
        LEGGINGS,
        BOOTS,
        PRESET_PATH,
        IDENTIFIER
    } = models

    async function createItem(itemType, shouldCreate) {
        if (shouldCreate) {
            const attachable = await loadPresetFile(`attachable${itemType}.json`)
            let attachableData = await attachable.text()
            
            const item = await loadPresetFile(`item${itemType}.json`)
            let itemData = await item.text()

            const icon = await loadPresetFile(`icon${itemType}.png`)

            await createJSONFile(
                `BP/items/${IDENTIFIER}_${itemType.toLowerCase()}.json`,
                JSON.parse(itemData),
                { inject: ['IDENTIFIER', 'PROJECT_PREFIX'], openFile: true }
            )
            await createFile(
                `RP/textures/items/${PRESET_PATH}${IDENTIFIER}_${itemType.toLowerCase()}.png`,
                icon
            )
            await createJSONFile(
                `RP/attachables/${PRESET_PATH}${IDENTIFIER}_${itemType}.json`,
                JSON.parse(attachableData),
                { inject: ['IDENTIFIER', 'PROJECT_PREFIX', 'PRESET_PATH'] }
            )
        }
    }

    await createItem('Helmet', HELMET)
    await createItem('Chestplate', CHESTPLATE)
    await createItem('Leggings', LEGGINGS)
    await createItem('Boots', BOOTS)
}