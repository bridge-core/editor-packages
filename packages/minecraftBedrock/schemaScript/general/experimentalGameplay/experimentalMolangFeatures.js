const config = await getProjectConfig()
const expId = 'experimentalMolangFeatures'
console.log(expId, config.experimentalGameplay && config.experimentalGameplay[expId])

return {
	type: 'custom',
	generateFile: `project/experimentalGameplay/${expId}.json`,
	data: {
		if: config.experimentalGameplay && config.experimentalGameplay[expId],
	},
}
