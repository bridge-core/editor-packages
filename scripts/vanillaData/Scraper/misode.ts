import { MisodeTarget } from '../interfaces.ts'
import { writeRaw } from '../writeRaw.ts'

export class MisodeScraper {
	constructor(protected version: string, protected targets: MisodeTarget[]) {}

	public async run() {
		for (const target of this.targets) {
			const registry = target.registry
			const request = await fetch(
				`https://raw.githubusercontent.com/misode/mcmeta/${this.version}-diff/registries/${registry}.txt`
			)
			const text = await request.text()
			let entries = text.split('\n')

			const filtered = target.filter
				? // @ts-ignore
				  entries.filter((i) => (i ? target.filter(i) : false))
				: entries
			const mapped = target.map
				? // @ts-ignore
				  filtered.map((i) => target.map(i))
				: filtered
			await writeRaw(target.id, mapped, 'minecraftJava')
		}
	}
}
