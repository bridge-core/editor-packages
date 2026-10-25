import { DOMParser, HTMLDocument } from 'deno-dom'
import { ScrapeTarget } from '../types.ts'

export class WebPageTarget implements ScrapeTarget {
	private readonly url: string
	private readonly target: `${string}/${string}`

	public constructor(url: string, target: `${string}/${string}`) {
		this.url = url
		this.target = target
	}

	public async run() {
		const pageResponse = await fetch(this.url)
		const pageText = await pageResponse.text()

		const pageParser = new DOMParser()
		const pageData = pageParser.parseFromString(pageText, 'text/html')

		if (!pageData) throw new Error(`Page ${this.url} not loaded correctly`)

		const [tableId, columnId] = this.target.split('/')

		return this.getTableColumnData(pageData, tableId, columnId)
	}

	private getTableColumnData(
		pageData: HTMLDocument,
		tableId: string,
		columnName: string
	) {
		const tables = pageData.getElementsByTagName('table')
		const output = []
		for (const table of tables) {
			if (
				table.previousElementSibling?.children[0]?.id === tableId ||
				table.previousElementSibling?.previousElementSibling
					?.children[0]?.id === tableId
			) {
				const tableChildren = table.children[0].children
				const headers = tableChildren[0].children
				let headerIndex = 0
				for (const header of headers) {
					if (header.textContent === columnName) break
					headerIndex++
				}
				// Loop through each row, starting at the second row beacuse the first row is the header
				for (let i = 1; i < tableChildren.length; i++) {
					const row = tableChildren[i]
					for (let i = 0; i < row.children.length; i++) {
						const cell = row.children[i]
						if (i === headerIndex) {
							output.push(cell.textContent)
						}
					}
				}
			}
		}
		return output
	}
}
