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
	create: (
		template: any,
		location?: string,
		operation?: (
			deepMerge: (oldData: any, newData: any) => any,
			oldData: any,
			newData: any
		) => any
	) => void
	/**
	 * Add an animation to the entity
	 *
	 * @returns Animation name
	 */
	animation: (animation: any, condition?: string | false) => string
	/**
	 * Add an animation to the entity
	 *
	 * @returns Animation controller name
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
	 * Add a new loot table to the entity
	 *
	 * @returns Path to the loot table file
	 */
	lootTable: (lootTable: any) => string
	/**
	 * Add a new trade table to the entity
	 *
	 * @returns Path to the trade table file
	 */
	tradeTable: (tradeTable: any) => string
	/**
	 * Add a new spawn rule to the entity
	 */
	spawnRule: (spawnRule: any) => void
	/**
	 * React to the component being activated
	 */
	onActivated: (eventResponse: any) => void
	/**
	 * React to the component being deactivated
	 */
	onDeactivated: (eventResponse: any) => void

	/**
	 * Methods for interacting with the client side of an entity
	 */
	client: {
		/**
		 * [!!!] Experimental:
		 * Create a client entity file for entities using this component
		 * The clientEntity JSON object you pass in as an argument should not
		 * include the top level "minecraft:client_entity" field.
		 * The correct identifier gets inserted automatically
		 */
		create: (clientEntity: any, formatVersion?: string) => void
	}

	/**
	 * Where inside the source file the custom component is located
	 */
	location: string
	/**
	 * The identifier of the source file
	 */
	identifier: string
}
