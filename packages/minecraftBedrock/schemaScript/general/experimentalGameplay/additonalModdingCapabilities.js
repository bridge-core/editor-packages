const config = await getProjectConfig()
const expId = 'additonalModdingCapabilities'

return {
	type: 'custom',
	generateFile: `project/experimentalGameplay/${expId}.json`,
	data: {
		if: config.experimentalGameplay && config.experimentalGameplay[expId],
	},
}
