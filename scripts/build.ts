import { zipFolder } from './components/Zip/ZipFolder.ts'
import { packageDirectory } from './components/Packager/Packager.ts'

export async function build(outDir: string) {
	try {
		await Deno.remove('./dist')
		await Deno.mkdir('./dist', { recursive: true })
	} catch {}

	await packageDirectory('./packages', './dist')
	await zipFolder('./dist', outDir)

	// for await (const entry of Deno.readDir('./packages')) {
	// 	if (entry.isDirectory)
	// 		await zipFolder(
	// 			`./dist/${entry.name}`,
	// 			`./dist/packages/${entry.name}.zip`
	// 		)
	// }
}

if (import.meta.main) {
	await build('./packages.zip')
}
