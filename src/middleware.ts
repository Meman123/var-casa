import { defineMiddleware } from 'astro:middleware';
import { env } from 'cloudflare:workers';
import { COOKIE, cookieEsValida } from './lib/session';

// Rutas que no requieren sesion activa.
const RUTAS_PUBLICAS = ['/login', '/api/login'];

export const onRequest = defineMiddleware(async (context, next) => {
	const { pathname } = context.url;

	// Assets estaticos no pasan por la logica de sesion.
	if (
		pathname.startsWith('/_astro') ||
		pathname === '/favicon.svg' ||
		pathname === '/favicon.ico'
	) {
		return next();
	}

	const esRutaPublica = RUTAS_PUBLICAS.includes(pathname);
	const secreto = env.SESSION_SECRET;
	const valorCookie = context.cookies.get(COOKIE.nombre)?.value;

	const autenticado = secreto ? await cookieEsValida(secreto, valorCookie) : false;
	context.locals.session = { autenticado };

	if (!autenticado && !esRutaPublica) {
		return context.redirect('/login');
	}

	if (autenticado && pathname === '/login') {
		return context.redirect('/');
	}

	return next();
});
