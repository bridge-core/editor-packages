import { GameTarget } from '../interfaces.ts'
import { join, extname } from 'path'
import json5 from 'json5'
import { writeRaw } from '../writeRaw.ts'

export class GameScraper {
	constructor(protected dataPath: string, protected targets: GameTarget[]) {}

	async run() {
		for (const target of this.targets) {
			let packType
			switch (target.packType) {
				case 'resourcePack':
					packType = 'resource_packs'
					break
				case 'behaviorPack':
					packType = 'behavior_packs'
					break
				case 'definitions':
					packType = 'definitions'
					break
			}
			const base = join(this.dataPath, packType)
			let output: string[] = []
			if (packType !== 'definitions') {
				for await (const pack of Deno.readDir(base)) {
					output = output.concat(
						await this.scrapeDir(
							join(base, pack.name, target.path),
							target.path,
							target.content,
							target.extensions
						)
					)
				}
			} else {
				output = output.concat(
					await this.scrapeDir(
						join(base, target.path),
						target.path,
						target.content,
						target.extensions
					)
				)
			}
			const filtered = target.filter
				? // @ts-ignore
				  output.filter((i) => (i ? target.filter(i) : false))
				: output

			const mapped = target.map
				? // @ts-ignore
				  filtered.map((i) => target.map(i))
				: filtered
			await writeRaw(target.id, mapped)
		}
	}

	async scrapeDir(
		fullPath: string,
		packPath: string,
		contentPath?: string | string[],
		includeExtensions?: boolean
	) {
		try {
			let output: string[] = []
			// File
			if (extname(fullPath) && contentPath) {
				const scraped =
					extname(fullPath) === '.json' ||
					extname(fullPath) === '.material'
						? await this.scrapeJsonFile(fullPath, contentPath)
						: await this.scrapeTextFile(fullPath, contentPath)
				return scraped
			} else {
				// Directory
				for await (const file of Deno.readDir(fullPath)) {
					if (file.isDirectory) {
						output = output.concat(
							await this.scrapeDir(
								join(fullPath, file.name),
								join(packPath, file.name),
								contentPath,
								includeExtensions
							)
						)
					} else {
						if (!contentPath) {
							let p = join(packPath, file.name).replace(
								/\\/g,
								'/'
							)
							if (!includeExtensions)
								p = p.replace(extname(file.name), '')
							output.push(p)
						} else {
							const scraped =
								extname(join(fullPath, file.name)) === '.json' ||
								extname(join(fullPath, file.name)) === '.material'
									? await this.scrapeJsonFile(
											fullPath,
											contentPath,
											file.name
									  )
									: await this.scrapeTextFile(
											fullPath,
											contentPath,
											file.name
									  )
							output = output.concat(scraped)
						}
					}
				}
				return output
			}
		} catch {
			return []
		}
	}

	async scrapeTextFile(
		fullPath: string,
		contentPath: string | string[],
		fileName?: string
	) {
		let output: string[] = []
		const fileData = await Deno.readTextFile(join(fullPath, fileName ?? ''))
		const lines = fileData.split('\n')
		for (const line of lines) {
			for (const path of typeof contentPath === 'string' ? [contentPath] : contentPath) {
				if (line.match(path)) output.push(line.split('=')[0])
			}
		}
		return output
	}
	async scrapeJsonFile(
		fullPath: string,
		contentPath: string | string[],
		fileName?: string
	) {
		let output: string[] = []
		const jsonData = json5.parse(
			await Deno.readTextFile(join(fullPath, fileName ?? ''))
		)
		if (!Array.isArray(contentPath)) contentPath = [contentPath]
		for (const path of contentPath) {
			const collectedData = this.walkJson(path, jsonData)
			if (Array.isArray(collectedData))
				output = output.concat(collectedData)
			else output.push(collectedData)
		}

		return output
	}

	/**
	 * Collects JSON data at the path within the JSON data.
	 * @param path Path to the data to return in the JSON file
	 * @param data The JSON data to search for the data in
	 */
	_walkJson(path: string, data: any) {
		const parts = path.split('/')
		const key = parts.shift() ?? ''
		let arrData: any[] = []

		if (key === '*') {
			for (const obj in data) {
				if (Array.isArray(data[obj]) || typeof data[obj] === 'object')
					arrData = arrData.concat(
						this._walkJson(parts.join('/'), data[obj])
					)
				else if (parts.length === 0) arrData.push(data[obj])
			}
		} else if (data[key]) {
			data = this._walkJson(parts.join('/'), data[key])
		} else if (key !== '') {
			return
		}
		if (arrData.length > 0) return arrData
		return data
	}
	walkJson(path: string, data: any) {
		const dest = this._walkJson(path, data)
		return typeof dest === 'object' && !Array.isArray(dest)
			? Object.keys(dest)
			: dest
	}
}
