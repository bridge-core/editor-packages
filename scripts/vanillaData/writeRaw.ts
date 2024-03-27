import { baseData } from './data.ts'

export async function writeRaw(
	id: string,
	data: string[],
	packageLocation: 'minecraftBedrock' | 'minecraftJava'
) {
	let writeData: string[] = []

	const base = baseData[id] ?? undefined
	if (base) writeData = base
	writeData = [...new Set(writeData.concat(data).sort())].filter((i) => i)

	await Deno.mkdir('./scripts/vanillaData/raw', { recursive: true })
	await Deno.writeTextFile(
		`./scripts/vanillaData/raw/${packageLocation}/${id}.json`,
		JSON.stringify(writeData)
	)
}
