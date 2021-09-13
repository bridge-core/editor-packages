declare interface TemplateContext {
	compilerMode: 'build' | 'dev'
	sourceBlock: () => any
	create: (template: any, location: string) => void
	location: string
	identifier: string
}
