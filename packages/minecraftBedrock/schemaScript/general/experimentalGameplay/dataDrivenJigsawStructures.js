const config = await getProjectConfig()
const expId = 'dataDrivenJigsawStructures'

return {
    type: 'custom',
    generateFile: `project/experimentalGameplay/${expId}.json`,
    data: {
        if: config.experimentalGameplay && config.experimentalGameplay[expId],
    },
}
