import { zipFolder } from './components/Zip/ZipFolder.ts'
import { packageDirectory } from './components/Packager/Packager.ts'
import { encodeHex } from 'jsr:@std/encoding/hex'

export async function build(
	zipOutputPath: string,
	packageSizeOutputPath: string,
	hashOutputPath: string
) {
	try {
		await Deno.remove('./dist')
		await Deno.mkdir('./dist', { recursive: true })
	} catch {}

	await packageDirectory('./packages', './dist')
	await zipFolder('./dist', zipOutputPath)

	// Get ZIP size
	// const stat = await Deno.stat(zipOutputPath)
	// await Deno.writeTextFile(
	// 	packageSizeOutputPath,
	// 	`export const zipSize = ${stat.size}`
	// )

	// for await (const entry of Deno.readDir('./packages')) {
	// 	if (entry.isDirectory)
	// 		await zipFolder(
	// 			`./dist/${entry.name}`,
	// 			`./dist/packages/${entry.name}.zip`
	// 		)
	// }
	const text = await Deno.readTextFile(zipOutputPath)
	const textBuffer = new TextEncoder().encode(text)
	const hashBuffer = await crypto.subtle.digest('SHA-256', textBuffer)
	const hash = encodeHex(hashBuffer)

	await Deno.writeTextFile(hashOutputPath, hash)
}

if (import.meta.main) {
	await build('./packages.zip', './DataPackage.ts', './hash')
}
