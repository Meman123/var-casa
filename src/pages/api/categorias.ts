import type { APIRoute } from 'astro';
import { crearClienteApi, ApiError } from '../../lib/api';
import { env } from 'cloudflare:workers';

export const prerender = false;

function manejarError(error: unknown) {
	const mensaje = error instanceof ApiError ? error.message : 'Error inesperado al comunicarse con el servidor.';
	return new Response(JSON.stringify({ error: mensaje }), {
		status: 502,
		headers: { 'Content-Type': 'application/json' },
	});
}

export const POST: APIRoute = async (context) => {
	if (!env.N8N_BASE_URL) {
		return new Response(JSON.stringify({ error: 'Falta configurar N8N_BASE_URL.' }), { status: 500 });
	}
	try {
		const cuerpo = await context.request.json();
		const categoria = await crearClienteApi(env.N8N_BASE_URL).crearCategoria(cuerpo);
		return new Response(JSON.stringify(categoria), {
			status: 201,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return manejarError(error);
	}
};

export const PUT: APIRoute = async (context) => {
	if (!env.N8N_BASE_URL) {
		return new Response(JSON.stringify({ error: 'Falta configurar N8N_BASE_URL.' }), { status: 500 });
	}
	try {
		const cuerpo = await context.request.json();
		const categoria = await crearClienteApi(env.N8N_BASE_URL).actualizarCategoria(cuerpo);
		return new Response(JSON.stringify(categoria), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return manejarError(error);
	}
};
