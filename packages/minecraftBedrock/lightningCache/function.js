module.exports = (text, { resolvePackPath }) => {
	const lines = text.split('\n')

	const entityTag = lines
		.map((line) => {
			const result = line.match(
				/(tag\s@[a-z][\[.+\]]?)\s(add|remove)\s([a-zA-z_0-9]+)/
			)
			if (!result) return null

			return result[3]
		})
		.filter((line) => line !== null)

	const scoreboardObjective = lines
		.map((line) => {
			const result = line.match(
				/(scoreboard\s+objectives\s+add\s+)(.+)(\s+dummy)/
			)
			if (!result) return null

			return result[2]
		})
		.filter((line) => line !== null)

	const functionPath = lines
		.map((line) => {
			const result = line.match(/function\s+([aA-zZ0-9\/]+)/)
			if (!result) return null

			return resolvePackPath(
				'behaviorPack',
				`functions/${result[1]}.mcfunction`
			)
		})
		.filter((line) => line !== null)

	return {
		entityTag,
		functionPath,
		scoreboardObjective,
	}
}
