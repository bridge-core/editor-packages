let structurePaths = []

await readdir(resolvePackPath('behaviorPack', 'structures')).then((dirents) =>
    dirents.forEach((dirent) => structurePaths.push(dirent.path))
)

for (const path of structurePaths) {
    path = path
        .replace(`${resolvePackPath('behaviorPack', 'structures')}/`, '')
        .replace('.mcstructure', '')
}

return {
    type: 'enum',
    generateFile: 'structure/dynamic/structurePathEnum.json',
    data: structurePaths,
}
