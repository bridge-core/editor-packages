declare interface TemplateContext {
	/**
	 * Read the current compiler mode
	 */
	compilerMode: 'build' | 'dev'
	/**
	 * @returns A JSON object representing the file content of the block that is currently using the custom component
	 */
	sourceBlock: () => any
	/**
	 * Modify the block that is using this component
	 */
	create: (template: any, location: string) => void
	/**
	 * Where inside the source file the custom component is located
	 */
	location: string
	/**
	 * The identifier of the source file
	 */
	identifier: string
}
