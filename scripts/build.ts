import { zipFolder } from './components/Zip/ZipFolder.ts'

try {
	await Deno.mkdir('./dist/packages', { recursive: true })
} catch {}

// TODO: Run packager first and then zip dist/ folder
await zipFolder('./packages', './dist/packages.zip', 'packages')

for await (const entry of Deno.readDir('./packages')) {
	if (entry.isDirectory)
		// TODO: Run packager first and then zip packages from dist/ folder
		await zipFolder(
			`./packages/${entry.name}`,
			`./dist/packages/${entry.name}.zip`
		)
}
