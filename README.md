# var-casa

Control mensual de gastos del hogar entre Meman y Paya. Frontend en Astro (SSR)
que consume los webhooks de n8n / PostgreSQL ya construidos en producción.

## Stack

- Astro 7 (TypeScript strict), modo SSR con `@astrojs/cloudflare`.
- Sin frameworks de UI (React/Vue/etc.) ni Tailwind: CSS scoped de Astro + variables CSS.
- Autenticación con password compartido + cookie httpOnly firmada (sin Auth.js).
- Backend: 13 webhooks de n8n (no se tocan desde este repo).

## Desarrollo local

1. Instalar dependencias:

   ```sh
   npm install
   ```

2. Crear un archivo `.dev.vars` en la raíz (no se commitea) con:

   ```
   N8N_BASE_URL=https://tu-instancia-n8n.com/webhook
   SESSION_SECRET=un-string-largo-y-aleatorio
   ```

   Generar `SESSION_SECRET` con, por ejemplo: `openssl rand -hex 32`.

3. Levantar el servidor:

   ```sh
   astro dev --background
   ```

   Administrar el proceso con `astro dev status`, `astro dev logs` y `astro dev stop`.

4. Verificar tipos y build antes de dar por buena una tarea:

   ```sh
   npm run check
   npm run build
   ```

## Variables de entorno en Cloudflare Pages

En **Settings → Environment variables** del proyecto en Cloudflare Pages, configurar para el ambiente de producción (y preview si aplica):

| Variable | Descripción |
| --- | --- |
| `N8N_BASE_URL` | URL base de los webhooks de n8n, sin slash final (ej. `https://n8n.tudominio.com/webhook`). |
| `SESSION_SECRET` | String aleatorio largo usado para firmar la cookie de sesión httpOnly. Debe ser distinto al usado en desarrollo. |

Estas variables se leen en el Worker vía `import { env } from 'cloudflare:workers'` (ver `CLAUDE.md` para más detalle sobre esta API).

**Importante:** ese import requiere que en **Settings → Functions → Compatibility date** el proyecto tenga una fecha de compatibilidad reciente (2024-09 o posterior). Si el sitio ya se desplegó antes con una fecha vieja, actualízala antes del primer deploy de esta versión.

## Estructura

```
src/
├── lib/            # cliente n8n, tipos, formato, sesión, racha
├── components/      # piezas reutilizables (tarjetas, barras, formularios)
├── layouts/         # BaseLayout con header + nav inferior
├── middleware.ts     # protección de rutas por cookie de sesión
└── pages/
    ├── login.astro
    ├── index.astro           # dashboard del mes actual
    ├── gastos/               # crear / editar gasto
    ├── historico/            # lista de meses + detalle de mes
    ├── configuracion/        # CRUD de categorías
    └── api/                  # proxies hacia los webhooks de n8n
```

## Fuera de alcance en v1

Notificaciones push/email/WhatsApp, multi-hogar, exportación a PDF/Excel, PWA instalable, gráficas de tendencias complejas.
