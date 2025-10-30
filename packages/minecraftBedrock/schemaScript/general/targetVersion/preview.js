const config = await getProjectConfig()

return {
	type: 'custom',
	generateFile: 'project/targetVersion/preview.json',
	data: {
		if: config.targetVersion && config.targetVersion == '1.21.130',
	},
}
