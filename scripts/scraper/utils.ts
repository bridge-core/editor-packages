import { EMBEDDED_DATA } from './data.ts'

export async function writeRaw(id: string, data: string[]) {
	let writeData: string[] = EMBEDDED_DATA[id] ?? []

	writeData = [...new Set(writeData.concat(data).sort())].filter((i) => i)

	await Deno.mkdir('/scripts/scraper/raw', { recursive: true })
	await Deno.writeTextFile(
		`./scripts/scraper/raw/${id}.json`,
		JSON.stringify(writeData)
	)
}
