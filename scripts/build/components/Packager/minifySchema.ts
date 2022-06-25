export function minifySchema(schema: any) {
	// Remove $schema field because it's only used for making
	// the experience of authoring schemas more pleasant.
	schema.$schema = undefined
}
