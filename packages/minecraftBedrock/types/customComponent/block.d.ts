declare interface TemplateContext {
	compilerMode: 'build' | 'dev'
	create: (template: any, location: string) => void
	location: string
	identifier: string
}
