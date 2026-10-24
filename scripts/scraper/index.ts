import { IMPORTS, EXPORTS } from './data.ts'
import { SchemaExporter } from './exporter.ts'

const EXPORTER = new SchemaExporter(IMPORTS, EXPORTS)

await EXPORTER.run(false)
