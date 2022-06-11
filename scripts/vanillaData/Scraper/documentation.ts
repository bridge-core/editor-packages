import { DOMParser, HTMLDocument } from 'deno-dom'
import { DocTarget } from '../data.ts'
import { writeRaw } from '../writeRaw.ts'

export class DocumentationScraper {
	protected data: HTMLDocument | null

	constructor(page: string, protected targets: DocTarget[]) {
		const parser = new DOMParser()
		this.data = parser.parseFromString(page, 'text/html')
	}

	async run() {
		for (const target of this.targets) {
			const [tableId, columnId] = target.target.split('/')
			const data = this.getTableColumnData(tableId, columnId)
			const filtered = target.filter
            // @ts-ignore
				? data.filter((i) => target.filter(i) && i)
				: data
			const mapped = target.map
            // @ts-ignore
				? filtered.map((i) => target.map(i))
				: filtered
			await writeRaw(target.id, mapped)
		}
	}
	/**
	 *
	 * @param page The page to search for the table on
	 * @param tableId The id (header) of the table to search for
	 * @param columnName The name of the column to search for
	 * @returns An array of strings representing the values in the specified column
	 */
	getTableColumnData(tableId: string, columnName: string) {
		if (!this.data) throw new Error(`Page not loaded correctly`)

		const tables = this.data.getElementsByTagName('table')
		const output = []
		for (const table of tables) {
			if (table.previousElementSibling?.children[0]?.id === tableId) {
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
