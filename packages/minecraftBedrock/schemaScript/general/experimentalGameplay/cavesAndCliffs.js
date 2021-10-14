const config = await getProjectConfig()
const expId = 'cavesAndCliffs'

return {
	type: 'custom',
	generateFile: `project/experimentalGameplay/${expId}.json`,
	data: {
		if:
			config.targetVersion &&
			compare(config.targetVersion, '1.18.0', '>=')
				? true
				: config.experimentalGameplay &&
				  config.experimentalGameplay[expId],
	},
}
