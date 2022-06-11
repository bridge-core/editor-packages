import { path, json5 } from './deps.ts'

export async function bundleFileDefs() {
	const fileTypes = []
	for await (const entry of await Deno.readDir(
		'./packages/minecraftBedrock/fileDefinition'
	)) {
		if (entry.isFile)
			fileTypes.push(
				json5.parse(
					await Deno.readTextFile(
						path.join(
							'./packages/minecraftBedrock/fileDefinition',
							entry.name
						)
					)
				)
			)
	}
	await Deno.writeTextFile(
		'./dist/fileDefinitions.json',
		JSON.stringify(fileTypes)
	)
}

if (import.meta.main) {
	bundleFileDefs()
}
