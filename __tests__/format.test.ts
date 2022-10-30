import {
	assert,
	fail,
	assertEquals,
} from 'https://deno.land/std@0.155.0/testing/asserts.ts'
import Ajv from 'npm:ajv@7'

Deno.test({
	name: 'Validate schemas',
	fn: async (test) => {
		const ajv = new Ajv.default({
			validateSchema: true,
			strictRequired: 'log',
			allowUnionTypes: true,
			strictTypes: 'log',
			strict: 'log',
			allowMatchingProperties: true,
		})

		await test.step({
			name: '1. Setup AJV JSON schema validator',
			fn: async () => {
				// We need to first fetch and slightly modify the default meta schema
				// Need to remove the '"minItems": 1' requirement from enum schema
				// ...and add monaco schema extensions
				const res = await fetch(
					'http://json-schema.org/draft-07/schema'
				)
				const metaSchema = await res.json()

				metaSchema.properties.enum = {
					type: 'array',
					minItems: 0,
					items: true,
					uniqueItems: true,
				}
				const customEnumDef = ajv.getKeyword('enum')
				customEnumDef.code = () => {}
				ajv.removeKeyword('enum').addKeyword(customEnumDef)

				metaSchema.properties = {
					deprecationMessage: {
						type: 'string',
					},
					markdownDescription: {
						type: 'string',
					},
					doNotSuggest: {
						type: 'boolean',
					},
					...metaSchema.properties,
				}
				ajv.addKeyword({
					keyword: 'deprecationMessage',
					schemaType: 'string',
				})
				ajv.addKeyword({
					keyword: 'markdownDescription',
					schemaType: 'string',
				})
				ajv.addKeyword({
					keyword: 'markdownEnumDescriptions',
					schemaType: 'array',
				})
				ajv.addKeyword({
					keyword: 'doNotSuggest',
					schemaType: 'boolean',
				})

				ajv.addFormat('color-hex', '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')
				ajv.addFormat('uri', '.*')

				ajv.removeSchema('http://json-schema.org/draft-07/schema')
				ajv.addMetaSchema(
					metaSchema,
					'http://json-schema.org/draft-07/schema'
				)
			},
		})

		let bundledSchemas: any
		await test.step({
			name: '2. Fetch schema bundle',
			fn: async () => {
				try {
					await Deno.stat('./dist/minecraftBedrock/schemas.json')
					bundledSchemas = JSON.parse(
						await Deno.readTextFile(
							'./dist/minecraftBedrock/schemas.json'
						)
					)
				} catch {
					fail(
						'Bundled schemas could not be found at "dist/minecraftBedrock/schemas.json"'
					)
				}
			},
		})

		if (bundledSchemas) {
			await test.step({
				name: '3. Register schemas to AJV',
				fn: async () => {
					for (const path in bundledSchemas) {
						const shortPath = path.replace('file://', '')
						// Need to first add an $id to the schema
						const schema = {
							$id: shortPath,
							...bundledSchemas[path],
						}
						try {
							ajv.addSchema(schema, shortPath)
						} catch (err) {
							fail(
								`Invalid schema found at "${path}"\nError: ${err}`
							)
						}
					}
				},
			})

			await test.step({
				name: '4. Compile and execute schema validation',
				fn: async () => {
					for await (const dirEntry of Deno.readDir(
						'./packages/minecraftBedrock/schema'
					)) {
						if (dirEntry.isDirectory) {
							if (
								ajv.schemas[
									`/data/packages/minecraftBedrock/schema/${dirEntry.name}/main.json`
								]
							) {
								console.log(dirEntry.name)
								ajv.validate(
									`/data/packages/minecraftBedrock/schema/${dirEntry.name}/main.json`,
									{}
								)
								console.log('\n')
							}
						}
					}
				},
			})
		}
	},
})
