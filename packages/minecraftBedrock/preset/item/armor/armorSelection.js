module.exports = async ({ createFile, createJSONFile, loadPresetFile, models, expandFile }) => {
    const {
        HELMET,
        CHESTPLATE,
        LEGGINGS,
        BOOTS,
        PRESET_PATH,
        IDENTIFIER,
        PROJECT_PREFIX
    } = models
    const itemTexture = {
        texture_data: {}
    }

    async function createItem(itemType, shouldCreate) {
        if (shouldCreate) {
            const attachable = await loadPresetFile(`attachable${itemType}.json`)
            let attachableData = await attachable.text()
            
            const item = await loadPresetFile(`item${itemType}.json`)
            let itemData = await item.text()

            const icon = await loadPresetFile(`icon${itemType}.png`)

            await createJSONFile(
                `items/${IDENTIFIER}_${itemType.toLowerCase()}.json`,
                JSON.parse(itemData),
                { inject: ['IDENTIFIER', 'PROJECT_PREFIX'], openFile: true, packPath: 'behaviorPack' }
            )
            await createFile(
                `textures/items/${PRESET_PATH}${IDENTIFIER}_${itemType.toLowerCase()}.png`,
                icon,
                { packPath: 'resourcePack' }
            )
            await createJSONFile(
                `attachables/${PRESET_PATH}${IDENTIFIER}_${itemType.toLowerCase()}.json`,
                JSON.parse(attachableData),
                { inject: ['IDENTIFIER', 'PROJECT_PREFIX', 'PRESET_PATH'], packPath: 'resourcePack' }
            )
            itemTexture.texture_data = Object.assign(itemTexture.texture_data, {
                [`${PROJECT_PREFIX}_${IDENTIFIER}_${itemType.toLowerCase()}`]: {
                    textures: `textures/items/${PRESET_PATH}${IDENTIFIER}_leggings`
                }
            })
        }
    }

    // Create items
    await createItem('Helmet', HELMET)
    await createItem('Chestplate', CHESTPLATE)
    await createItem('Leggings', LEGGINGS)
    await createItem('Boots', BOOTS)

    // Add to item textures file
    await expandFile('textures/item_texture.json', itemTexture, { packPath: 'resourcePack' })
}