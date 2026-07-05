import type { APIRoute } from 'astro';
import { crearClienteApi, ApiError } from '../../lib/api';
import { COOKIE, crearValorCookie } from '../../lib/session';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const POST: APIRoute = async (context) => {
	if (!env.N8N_BASE_URL || !env.SESSION_SECRET) {
		return new Response(
			JSON.stringify({ error: 'La app no esta configurada correctamente (faltan variables de entorno).' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } },
		);
	}

	let password: string | undefined;
	try {
		const body = await context.request.json();
		password = body?.password;
	} catch {
		return new Response(JSON.stringify({ error: 'Solicitud invalida.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	if (!password) {
		return new Response(JSON.stringify({ error: 'Ingresa la contraseña.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	try {
		const api = crearClienteApi(env.N8N_BASE_URL);
		const { valido } = await api.login(password);

		if (!valido) {
			return new Response(JSON.stringify({ valido: false }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const valorCookie = await crearValorCookie(env.SESSION_SECRET);
		context.cookies.set(COOKIE.nombre, valorCookie, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			path: '/',
			maxAge: COOKIE.maxAgeSegundos,
		});

		return new Response(JSON.stringify({ valido: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		const mensaje = error instanceof ApiError ? error.message : 'Error inesperado al iniciar sesion.';
		return new Response(JSON.stringify({ error: mensaje }), {
			status: 502,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
