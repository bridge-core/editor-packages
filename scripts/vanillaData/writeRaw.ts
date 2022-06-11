import { baseData } from './data.ts'

export async function writeRaw(id: string, data: string[]) {
	let writeData: string[] = []

	const base = baseData[id] ?? undefined
	if (base) writeData = base
	writeData = [...new Set(writeData.concat(data).sort())].filter((i) => i)

	await Deno.writeTextFile(
		`./scripts/vanillaData/raw/${id}.json`,
		JSON.stringify(writeData)
	)
}
