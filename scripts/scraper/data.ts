import { FileTarget } from './target/file.ts'
import { ScrapeImport, ScrapeExport, PackType } from './types.ts'

export const IMPORTS: ScrapeImport[] = [
	{
		id: 'soundDefinition',
		targets: [
			new FileTarget(
				PackType.RESOURCE_PACK,
				'__brarchive/sounds.brarchive',
				{
					entry: 'sound_definitions.json',
					locations: ['/', 'sound_definitions'],
				}
			),
		],
		filter: (val: string) => val !== 'format_version',
	},
]
export const EXPORTS: ScrapeExport[] = []
