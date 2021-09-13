declare interface TemplateContext {
	compilerMode: 'build' | 'dev'
	fileContent: () => any
	create: (template: any, location: string) => void
	location: string
	identifier: string
}
