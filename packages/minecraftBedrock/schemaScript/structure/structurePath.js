const structurePaths = []
const strippedPaths = []

await readdir(resolvePackPath('behaviorPack', 'structures')).then((dirents) =>
    dirents.forEach((dirent) => structurePaths.push(dirent.path))
)

for (const path of structurePaths) {
    const strippedPath = path
        .replace(`${resolvePackPath('behaviorPack', 'structures')}/`, '')
        .replace('.mcstructure', '')
    strippedPaths.push(strippedPath)
}

return {
    type: 'enum',
    generateFile: 'structure/dynamic/structurePathEnum.json',
    data: strippedPaths,
}
