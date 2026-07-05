import type { APIRoute } from 'astro';
import { crearClienteApi, ApiError } from '../../lib/api';
import { env } from 'cloudflare:workers';

export const prerender = false;

function respuestaJson(cuerpo: unknown, status = 200) {
	return new Response(JSON.stringify(cuerpo), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
}

function manejarError(error: unknown) {
	const mensaje = error instanceof ApiError ? error.message : 'Error inesperado al comunicarse con el servidor.';
	const status = error instanceof ApiError ? (error.status ?? 502) : 502;
	return respuestaJson({ error: mensaje }, status >= 400 && status < 600 ? status : 502);
}

export const POST: APIRoute = async (context) => {
	if (!env.N8N_BASE_URL) return respuestaJson({ error: 'Falta configurar N8N_BASE_URL.' }, 500);

	try {
		const cuerpo = await context.request.json();
		const api = crearClienteApi(env.N8N_BASE_URL);
		const gasto = await api.crearGasto(cuerpo);
		return respuestaJson(gasto, 201);
	} catch (error) {
		return manejarError(error);
	}
};

export const PUT: APIRoute = async (context) => {
	if (!env.N8N_BASE_URL) return respuestaJson({ error: 'Falta configurar N8N_BASE_URL.' }, 500);

	try {
		const cuerpo = await context.request.json();
		const api = crearClienteApi(env.N8N_BASE_URL);
		const gasto = await api.actualizarGasto(cuerpo);
		return respuestaJson(gasto);
	} catch (error) {
		return manejarError(error);
	}
};

export const DELETE: APIRoute = async (context) => {
	if (!env.N8N_BASE_URL) return respuestaJson({ error: 'Falta configurar N8N_BASE_URL.' }, 500);

	const id = Number(context.url.searchParams.get('id'));
	if (!id) return respuestaJson({ error: 'Falta el id del gasto.' }, 400);

	try {
		const api = crearClienteApi(env.N8N_BASE_URL);
		const resultado = await api.eliminarGasto(id);
		return respuestaJson(resultado);
	} catch (error) {
		return manejarError(error);
	}
};
