let structureIdentifiers = []
let structurePaths = []
await readdir(resolvePackPath('behaviorPack', 'structures')).then((dirents) =>
	dirents.forEach((dirent) => structurePaths.push(dirent.path))
)

for (const path of structurePaths) {
	const strippedPath = path
		.replace(`${resolvePackPath('behaviorPack', 'structures')}/`, '')
		.replace('.mcstructure', '')
	const pathParts = strippedPath.split('/')

	if (pathParts.length == 2)
		structureIdentifiers.push(`${pathParts[0]}:${pathParts[1]}`)
	else if (pathParts.length == 1)
		structureIdentifiers.push(`mystructure:${pathParts[0]}`)
}

return {
	type: 'enum',
	generateFile: 'structure/dynamic/structureIdentifierEnum.json',
	data: structureIdentifiers,
}
