import { config } from 'dotenv'
import { debounce } from 'lodash'
import { basename, join } from 'path'
import { build } from './build.ts'

const { EDITOR_DIR } = config({ safe: true })
const watcher = Deno.watchFs('./packages')

const ingoreFiles = new Set(['.DS_Store'])
let events: Record<string, Deno.FsEvent['kind']> = {}

const update = debounce(async () => {
	await build(
		join(EDITOR_DIR, './public/packages.zip'),
		join(EDITOR_DIR, './src/utils/app/dataPackage.ts')
	)
}, 1000)

await build(
	join(EDITOR_DIR, './public/packages.zip'),
	join(EDITOR_DIR, './src/utils/app/dataPackage.ts')
)

for await (const event of watcher) {
	if (event.kind === 'access' || event.kind === 'any') continue

	console.log(event.kind, event.paths)

	event.paths.forEach((path) => {
		if (ingoreFiles.has(basename(path))) return

		if (!events[path]) events[path] = event.kind
		else if (events[path] !== event.kind) {
			if (events[path] === 'remove' && event.kind === 'create')
				events[path] = event.kind
			else if (events[path] === 'remove') return
		}
	})

	await update()
}
