import { zipFolder } from './components/Zip/ZipFolder.ts'
import { packageDirectory } from './components/Packager/Packager.ts'

export async function build(outputPath: string) {
	try {
		await Deno.remove('./dist')
		await Deno.mkdir('./dist', { recursive: true })
	} catch {}

	await packageDirectory('./packages', './dist')
	await zipFolder('./dist', outputPath)

	// Get ZIP size
	const stat = await Deno.stat(outputPath)
	await Deno.writeTextFile(
		'./dataPackage.ts',
		`export const zipSize = ${stat.size}`
	)

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
