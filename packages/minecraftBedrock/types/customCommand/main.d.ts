declare function defineCommand<T>(
	command: (opts: CommandContext<T>) => void
): (opts: CommandContext<T>) => void

declare interface CommandContext<T> {
	name: (name: string) => void
	schema: (schema: any) => void
	template: (
		templateFunction: (commandArgs: T, opts: TemplateContext) => void
	) => void
}

declare interface TemplateContext {
	/**
	 * The current compiler mode under which the custom component gets compiled
	 */
	compilerMode: 'build' | 'dev'
	/**
	 * How deep within other commands this custom command is nested
	 *
	 * @example /execute @a ~ ~ ~ myCustomCommand - commandNestingDepth = 1
	 * @example /myCustomCommand - commandNestingDepth = 0
	 */
	commandNestingDepth: number
	/**
	 * Compile custom commands that are nested within the current custom command
	 * Allows to e.g. create custom /execute functions
	 */
	compileCommands: (commands: string[]) => string[]
}
