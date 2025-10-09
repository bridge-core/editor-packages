import { DOMParser, HTMLDocument } from 'deno-dom'
import { DocTarget, PageTarget } from '../interfaces.ts'
import { writeRaw } from '../writeRaw.ts'

export class DocumentationScraper {
	protected data: Record<string, HTMLDocument | null> = {}

	constructor(pages: PageTarget[], protected targets: DocTarget[]) {
		const parser = new DOMParser()
		
		for (const page of pages) {
			this.data[page.shortName] = parser.parseFromString(page.url, 'text/html')
		}
	}

	async run() {
		for (const target of this.targets) {
			const [tableId, columnId] = target.target.split('/')

			if (!target.page) {
				target.page = 'Addons'
			}

			const data = this.getTableColumnData(target.page, tableId, columnId)
			const filtered = target.filter
				? // @ts-ignore
				  data.filter((i) => target.filter(i) && i)
				: data
			const mapped = target.map
				? // @ts-ignore
				  filtered.map((i) => target.map(i))
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
	getTableColumnData(page: string, tableId: string, columnName: string) {
		const data = this.data[page]
		if (!data) throw new Error(`Page not loaded correctly`)

		const tables = data.getElementsByTagName('table')
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
