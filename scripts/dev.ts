import { config } from 'dotenv'
import { debounce } from 'lodash'

const { EDITOR_DIR } = config({ safe: true })
console.log(EDITOR_DIR)
const watcher = Deno.watchFs('./packages')

let events = {}
for await (const event of watcher) {
	console.log(event.kind, event.paths)
	// TODO
}

const update = debounce(() => {
	// TODO
}, 1000)
