module.exports = (text, { resolvePackPath }) => {
	const lines = text.split('\n')

	const entityTags = []
	const tagCommands = lines.filter((line) =>
		/tag @(([a-z](\[.+\])?)) (add|remove) [a-zA-z_]+/g.exec(line)
	)
	tagCommands.forEach((line) => {
		let args = line.split(' ')
		entityTags.push(args[3].replace('\r', ''))
	})

	const scoreboardObjective = lines
		.map((line) => {
			const result = line.match(
				/(scoreboard\s+objectives\s+add\s+)(.+)(\s+dummy)/
			)
			if (!result) return null

			return result[2]
		})
		.filter((line) => line !== null)

	const functionPaths = []
	lines.filter((line) => {
		let funcName = /function\s+([aA-zZ0-9\/]+)/g.exec(line)
		if (funcName)
			functionPaths.push(
				resolvePackPath(
					'behaviorPack',
					`functions/${funcName[1]}.mcfunction`
				)
			)
	})

	return {
		entityTag: entityTags,
		functionPath: functionPaths,
		scoreboardObjective,
	}
}
