export async function writeRaw(id: string, data: string[]) {
	let writeData: string[] = []

	writeData = [...new Set(writeData.concat(data).sort())].filter((i) => i)

	await Deno.mkdir('./raw', { recursive: true })
	await Deno.writeTextFile(`./raw/${id}.json`, JSON.stringify(writeData))
}
