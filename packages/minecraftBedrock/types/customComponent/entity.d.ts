declare interface TemplateContext {
	/**
	 * Read the current compiler mode
	 */
	compilerMode: 'build' | 'dev'
	/**
	 * @returns A JSON object representing the file content of the entity that is currently using the custom component
	 */
	sourceEntity: () => any
	/**
	 * Modify the entity that is using this component
	 */
	create: (template: any, location: string) => void
	/**
	 * Add an animation to the entity
	 */
	animation: (animation: any, condition?: string | false) => void
	/**
	 * Add an animation to the entity
	 */
	animationController: (
		animationController: any,
		condition?: string | false
	) => void
	/**
	 * Where inside the source file the custom component is located
	 */
	location: string
	/**
	 * The identifier of the source file
	 */
	identifier: string
}
