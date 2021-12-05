import { DOMParser, HTMLDocument } from 'deno-dom'

export class DocScraper {
    private readonly baseUrl: string = 'https://bedrock.dev/docs/'
    protected loadedPages: Record<string, HTMLDocument | null> = {}

    constructor() {}

    async loadPages(pages: string[]) {
        for (const page of pages) {
            try {
                const res = await fetch(`${this.baseUrl}${page}`)
                const text = await res.text()
                const doc = new DOMParser().parseFromString(text, 'text/html')
                this.loadedPages[page] = doc
                console.log(`Loaded page ${page}`)
            } catch {
                console.error(`Error loading page ${this.baseUrl}${page}`)
            }
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
        const doc = this.loadedPages[page]
        if (!doc) throw new Error(`Page ${page} not loaded`)
    
        const tables = doc.getElementsByTagName('table')
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