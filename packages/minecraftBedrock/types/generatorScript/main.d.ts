declare module '@bridge/generate' {
	interface IUseTemplateOptions {
		/**
		 * Whether to omit the template file from the build output
		 * @default true
		 */
		omitTemplate?: boolean
	}

	/**
	 * Import a file template
	 * @param path Path to the template relative to the generator script
	 * @param options Configure how to use the template
	 */
	export function useTemplate<T = any>(
		templatePath: string,
		options: IUseTemplateOptions
	): Promise<T>

	class FileCollection {
		/**
		 * Add a file to the collection
		 * @param path Path of the file relative to the generator script
		 * @param content Content of the file to generate
		 */
		add(path: string, content: any): void

		/**
		 * Get a file from the collection
		 * @param path Path of the file relative to the generator script
		 */
		get<T = any>(path: string): T

		/**
		 * Returns whether a file exists in the collection
		 * @param path Path of the file relative to the generator script
		 */
		has(path: string): boolean
	}

	/**
	 * Create a new file collection
	 */
	export function createCollection(): FileCollection
}
