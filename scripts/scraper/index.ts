import { IMPORTS, EXPORTS } from './data.ts'
import { SchemaExporter } from './exporter.ts'
import { BrarchiveExtractor } from './extractor.ts'

const EXPORTER = new SchemaExporter(IMPORTS, EXPORTS)
const EXTRACTOR = new BrarchiveExtractor()

await EXTRACTOR.run()
await EXPORTER.run()
await EXTRACTOR.delete()
