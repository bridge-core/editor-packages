const config = await getProjectConfig()
const expId = 'aimAssist'

return {
    type: 'custom',
    generateFile: `project/experimentalGameplay/${expId}.json`,
    data: {
        if: config.experimentalGameplay && config.experimentalGameplay[expId],
    },
}
