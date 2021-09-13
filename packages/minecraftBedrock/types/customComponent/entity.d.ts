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
	animation: (animation: any, condition?: string | false) => string
	/**
	 * Add an animation to the entity
	 */
	animationController: (
		animationController: any,
		condition?: string | false
	) => string
	/**
	 * Add a new dialogue scene to the entity
	 */
	dialogueScene: (scene: any, openDialogue?: boolean) => void
	/**
	 * React to the component being activated
	 */
	onActivated: (eventResponse: any) => void
	/**
	 * React to the component being deactivated
	 */
	onDeactivated: (eventResponse: any) => void

	/**
	 * Where inside the source file the custom component is located
	 */
	location: string
	/**
	 * The identifier of the source file
	 */
	identifier: string
}
