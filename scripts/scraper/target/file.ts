import { extname, join } from 'node:path'
import { PackType, ScrapeTarget } from '../types.ts'
import { config } from 'dotenv'
import JSON5 from 'json5'
import { deserializeText } from 'jsr:@bedrock-crustaceans/brarchive'

const { MINECRAFT_DATA_PATH } = config({ safe: true })

export interface FileTargetOptions {
	/**
	 * Specifies the json paths to scan from. If omitted, file paths will be scraped instead.
	 */
	locations?: string | string[]
	/**
	 * Specifies which entry in the .brarchive data map to scan from.
	 */
	entry?: string
	/**
	 * Specifies whether or not to include file extensions when scraping for file paths.
	 */
	includeExtensions?: boolean
}

export class FileTarget implements ScrapeTarget {
	private readonly packType: PackType
	private readonly path: string
	private readonly locations: string[]
	private readonly entry: string
	private readonly includeExtensions: boolean

	public constructor(
		packType: PackType,
		path: string,
		options: FileTargetOptions
	) {
		this.packType = packType
		this.path = path
		this.locations = options.locations
			? Array.isArray(options.locations)
				? options.locations
				: [options.locations]
			: []
		this.entry = options.entry ?? ''
		this.includeExtensions = options.includeExtensions ?? false
	}

	public async run() {
		const basePath = join(MINECRAFT_DATA_PATH, this.packType)
		let output: string[] = []

		if (this.packType !== PackType.DEFINITIONS) {
			for await (const pack of Deno.readDir(basePath)) {
				output = output.concat(
					await this.scrapeDirectory(
						join(basePath, pack.name, this.path),
						this.path
					)
				)
			}
		}

		return output
	}

	private async scrapeDirectory(fullPath: string, packPath: string) {
		try {
			let output: string[] = []
			const fileExt = extname(fullPath)

			// Scrape file
			if (fileExt && this.locations.length > 0) {
				if (fileExt === '.json' || fileExt === '.material') {
					output = await this.scrapeJsonFile(fullPath)
				} else if (fileExt === '.brarchive') {
					output = await this.scrapeBrarchiveFile(fullPath)
				} else {
					output = await this.scrapeTextFile(fullPath)
				}
				return output
			}

			// Scrape directory
			for await (const file of Deno.readDir(fullPath)) {
				if (file.isDirectory) {
					output = output.concat(
						await this.scrapeDirectory(
							join(fullPath, file.name),
							join(packPath, file.name)
						)
					)
				} else {
					if (this.locations.length <= 0) {
						let pathName = join(packPath, file.name).replace(
							/\\/g,
							'/'
						)
						if (!this.includeExtensions)
							pathName = pathName.replace(extname(file.name), '')
						output.push(pathName)
					} else {
						const filePath = join(fullPath, file.name)
						let scraped

						if (fileExt === '.json' || fileExt === '.material') {
							scraped = await this.scrapeJsonFile(filePath)
						} else if (fileExt === '.brarchive') {
							scraped = await this.scrapeBrarchiveFile(filePath)
						} else {
							scraped = await this.scrapeTextFile(filePath)
						}
						output = output.concat(scraped)
					}
				}
			}
			return output
		} catch (er) {
			return []
		}
	}

	private async scrapeBrarchiveFile(path: string) {
		let output: string[] = []

		const data = deserializeText(await Deno.readFile(path))

		if (this.entry.length > 0) {
			if (!data.has(this.entry)) return []

			const textContents = data.get(this.entry) ?? ''

			for (const location of this.locations) {
				output = output.concat(
					this.walkJson(location, JSON5.parse(textContents))
				)
			}
		} else {
			for (const textContents of data.values()) {
				for (const location of this.locations) {
					output = output.concat(
						this.walkJson(location, JSON5.parse(textContents))
					)
				}
			}
		}

		return output
	}

	private async scrapeJsonFile(path: string) {
		let output: string[] = []

		const data = JSON5.parse(await Deno.readTextFile(path))

		for (const content of this.locations) {
			const scraped = this.walkJson(content, data)

			if (Array.isArray(scraped)) output = output.concat(scraped)
			else output.push(scraped)
		}

		return output
	}

	private async scrapeTextFile(path: string) {
		let output: string[] = []

		const data = await Deno.readTextFile(path)
		const lines = data.split('\n')

		for (const line of lines) {
			for (const content of this.locations) {
				if (line.match(content)) {
					output.push(line.split('=')[0])
				}
			}
		}
		return output
	}

	private _walkJson(location: string, data: any) {
		const parts = location.split('/')
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

	private walkJson(location: string, data: any) {
		const dest = this._walkJson(location, data)
		return typeof dest === 'object' && !Array.isArray(dest)
			? Object.keys(dest)
			: dest
	}
}
