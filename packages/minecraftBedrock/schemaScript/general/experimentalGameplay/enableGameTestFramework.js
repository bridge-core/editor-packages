const config = await getProjectConfig()
const expId = 'enableGameTestFramework'

return {
	type: 'custom',
	generateFile: `project/experimentalGameplay/${expId}.json`,
	data: {
		if: config.experimentalGameplay[expId]
	}
}
