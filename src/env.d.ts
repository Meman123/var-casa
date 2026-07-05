/// <reference types="astro/client" />

declare namespace App {
	interface Locals {
		session: {
			autenticado: boolean;
		};
	}
}

// Variables de entorno del Worker de Cloudflare (Pages). Se configuran en el
// dashboard de Cloudflare Pages (produccion) o en .dev.vars (desarrollo local).
interface EnvVars {
	N8N_BASE_URL: string;
	SESSION_SECRET: string;
}

// Declaracion minima del modulo nativo de Cloudflare Workers, en vez de traer
// el paquete completo @cloudflare/workers-types (que pisa tipos globales del
// DOM como HTMLElement/Response y genera falsos conflictos de tipos).
declare module 'cloudflare:workers' {
	export const env: EnvVars;
}
