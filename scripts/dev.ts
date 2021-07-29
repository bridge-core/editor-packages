import { config } from 'dotenv'
import { debounce } from 'lodash'
import { relative, basename, join } from 'path'
import { copyJson } from './components/Packager/Packager.ts'
import { zipFolder } from './components/Zip/ZipFolder.ts'

const { EDITOR_DIR } = config({ safe: true })
const watcher = Deno.watchFs('./packages')

const ingoreFiles = new Set(['.DS_Store'])
let events: Record<string, Deno.FsEvent['kind']> = {}

const update = debounce(async () => {
	for (const path in events) {
		let kind = events[path]
		const relPath = relative('.', path)
		const outPath = relPath.replace('packages', 'dist')

		console.log(relPath, path)
		let fileInfo: Deno.FileInfo | undefined
		try {
			fileInfo = await Deno.lstat(path)
		} catch {
			kind = 'remove'
		}

		if (kind === 'modify' || kind === 'create') {
			if (fileInfo!.isDirectory) {
				await Deno.mkdir(outPath, { recursive: true })
				continue
			} else if (fileInfo!.isFile) {
				if (relPath.endsWith('.json')) await copyJson(relPath, outPath)
				else await Deno.copyFile(relPath, outPath)
			} else if (fileInfo!.isSymlink) {
				continue
			} else {
				throw new Error(`Unknown FS object: ${path}`)
			}
		} else {
			await Deno.remove(outPath)
		}
	}

	events = {}
	await zipFolder(
		'./dist',
		join(EDITOR_DIR, './public/packages.zip'),
		'packages'
	)
}, 1000)

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
