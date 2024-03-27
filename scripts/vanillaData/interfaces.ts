/**
 * Defines a target to scrape vanilla data from.
 */
export interface ScrapeTarget {
	/**
	 * ID to assign the collected data.
	 */
	id: string
	/**
	 * Data to filter from the output
	 */
	filter?: (val: string) => boolean
	/**
	 * Function to map the data to a new format.
	 */
	map?: (val: string) => string
}
export interface DocTarget extends ScrapeTarget {
	/**
	 * Target in the documentation to scrape data from in the form Section/Column.
	 */
	target: `${string}/${string}`
}
export interface GameTarget extends ScrapeTarget {
	/**
	 * File path to iterate in the game files.
	 */
	path: string
	/**
	 * A JSON path to the data to scrape. If not specified, the file paths will be used.
	 */
	content?: string | string[]
	/**
	 * Pack type to scrape data from.
	 */
	packType: 'resourcePack' | 'behaviorPack' | 'definitions'
	/**
	 * Whether to include file extensions on file paths.
	 */
	extensions?: boolean
}
export interface MisodeTarget extends ScrapeTarget {
	/**
	 * A vanilla registry to scrape data from
	 */
	registry: string
}

export interface ExportTarget {
	/**
	 * Single or multiple raw files to export to schema.
	 */
	from: string[]
	/**
	 * Schema to export raw data to.
	 */
	to: string
	/**
	 * Whether to export as properties or enum. Default: 'enum'.
	 */
	type?: 'enum' | 'property'
	/**
	 * Whether to export to minecraftBedrock schema or minecraftJava schema
	 */
	package: 'minecraftBedrock' | 'minecraftJava'
}
