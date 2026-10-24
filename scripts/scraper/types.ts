export enum PackType {
	BEHAVIOR_PACK = 'behavior_packs',
	RESOURCE_PACK = 'resource_packs',
	DEFINITIONS = 'definitions',
}

export interface ScrapeTarget {
	run: () => Promise<string[]>
}

export interface FileTarget {}

export interface ScrapeImport {
	id: string
	targets: ScrapeTarget[]
	filter?: (val: string) => boolean
	map?: (val: string) => string
}

export interface ScrapeExport {
	from: string | string[]
	to: string
	type?: 'enum' | 'property'
}
