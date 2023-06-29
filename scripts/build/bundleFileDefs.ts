import { join } from 'path'
import { parse } from 'json5'

export async function bundleFileDefs() {
	const fileTypes = []
	for await (const entry of await Deno.readDir(
		'./packages/minecraftBedrock/fileDefinition'
	)) {
		if (entry.isFile)
			fileTypes.push(
				parse(
					await Deno.readTextFile(
						join(
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
