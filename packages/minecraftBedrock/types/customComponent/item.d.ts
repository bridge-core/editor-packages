declare interface TemplateContext {
	/**
	 * Read the current compiler mode
	 */
	compilerMode: 'build' | 'dev'
	/**
	 * @returns A JSON object representing the file content of the item that is currently using the custom component
	 */
	sourceItem: () => any
	/**
	 * Modify the item that is using this component
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
	 * Add a new loot table to the item
	 *
	 * @returns Path to the loot table file
	 */
	lootTable: (lootTable: any) => string
	/**
	 * Add a new recipe to the item
	 */
	recipe: (recipe: any) => void
	/**
	 * Where inside the source file the custom component is located
	 */
	location: string
	/**
	 * The identifier of the source file
	 */
	identifier: string
	/**
	 * Get access to the player.json file associated with a project
	 */
	player: {
		/**
		 * Modify the player entity
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
		 * Add an animation to the player entity
		 */
		animation: (animation: any, condition?: string | false) => string
		/**
		 * Add an animation controller to the player entity
		 */
		animationController: (
			animationController: any,
			condition?: string | false
		) => string
	}
}
