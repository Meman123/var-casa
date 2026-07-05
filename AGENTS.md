## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## var-casa: convenciones del proyecto

### Arquitectura
- Astro 7 en modo SSR (`output: 'server'`) con `@astrojs/cloudflare` como adapter. No es un sitio estático.
- El backend (13 webhooks de n8n + PostgreSQL) ya está construido y en producción. Este repo es **solo frontend**: no se modifica el modelo de datos ni se agregan endpoints. Toda comunicación con n8n pasa por `src/lib/api.ts`.
- Sin Tailwind. Estilos con bloques `<style>` scoped de Astro + variables CSS globales en `src/styles/global.css`.
- Sin React/Vue/Svelte: toda la interactividad (sliders, tabs, animaciones) se hace con `<script>` de Astro (vanilla TS del lado del cliente).
- Sin Auth.js: autenticación con password compartido + cookie httpOnly firmada (HMAC-SHA256) manejada en `src/lib/session.ts` y verificada en `src/middleware.ts`.

### Variables de entorno (Cloudflare Workers)
**Importante:** en `@astrojs/cloudflare` (Astro 7 / adapter v14+), `Astro.locals.runtime.env` fue removido. Las variables de entorno se acceden así:

```ts
import { env } from 'cloudflare:workers';
// env.N8N_BASE_URL, env.SESSION_SECRET
```

Esto aplica tanto en páginas `.astro` como en rutas API y middleware. El módulo `cloudflare:workers` está declarado manualmente en `src/env.d.ts` (no se usa el paquete `@cloudflare/workers-types` completo porque pisa tipos globales del DOM como `HTMLElement`/`Response` y genera falsos positivos de TypeScript).

Variables requeridas:
- `N8N_BASE_URL`: URL base de los webhooks de n8n, sin slash final.
- `SESSION_SECRET`: string aleatorio largo para firmar la cookie de sesión (ej: `openssl rand -hex 32`).

En desarrollo local, se definen en `.dev.vars` (no se commitea). En producción, se configuran en Cloudflare Pages → Settings → Environment variables.

### Estructura de carpetas
- `src/lib/`: `api.ts` (cliente n8n), `types.ts`, `format.ts` (moneda/fechas), `session.ts` (cookie), `streak.ts` (racha).
- `src/components/`: piezas reutilizables (tarjetas, barras de presupuesto, formulario de gasto).
- `src/layouts/BaseLayout.astro`: shell con header, nav inferior y toggle de tema.
- `src/pages/api/`: rutas que proxean hacia n8n (evita exponer `N8N_BASE_URL` al cliente y centraliza manejo de errores).

### Verificación
Antes de dar por buena una tarea, correr `npm run check` (astro check) y `npm run build`.
