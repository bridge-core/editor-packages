const watcher = Deno.watchFs('./packages')

for await (const event of watcher) {
	console.log(event.kind, event.paths)
}
