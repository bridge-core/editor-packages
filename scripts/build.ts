import { zipFolder } from './components/Zip/ZipFolder.ts'
import { packageDirectory } from './components/Packager/Packager.ts'

try {
	await Deno.remove('./dist')
	await Deno.mkdir('./dist', { recursive: true })
} catch {}

await packageDirectory('./packages', './dist')
await zipFolder('./dist', './packages.zip')

// for await (const entry of Deno.readDir('./packages')) {
// 	if (entry.isDirectory)
// 		await zipFolder(
// 			`./dist/${entry.name}`,
// 			`./dist/packages/${entry.name}.zip`
// 		)
// }
