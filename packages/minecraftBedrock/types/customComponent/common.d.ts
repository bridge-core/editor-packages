/**
 * Define a new custom component
 * @param component The component to be added
 */
declare function defineComponent<T>(
	component: (opts: ComponentContext<T>) => void
): (opts: ComponentContext<T>) => void

declare interface ComponentContext<T> {
	/**
	 * Set a name for your custom component
	 * @argument name The component's name
	 */
	name: (name: string) => void
	/**
	 * Set a JSON schema that bridge. should use inside of its auto-completions
	 * @argument schema JSON schema for the custom component
	 */
	schema: (schema: any) => void
	/**
	 * Define the component's behavior
	 * @argument templateFunction A function that gets called whenever bridge. is applying your custom component
	 */
	template: (
		templateFunction: (componentArgs: T, opts: TemplateContext) => void
	) => void
}
