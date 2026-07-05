import type { APIRoute } from 'astro';
import { crearClienteApi, ApiError } from '../../lib/api';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const POST: APIRoute = async (context) => {
	if (!env.N8N_BASE_URL) {
		return new Response(JSON.stringify({ error: 'Falta configurar N8N_BASE_URL.' }), { status: 500 });
	}

	try {
		const cuerpo = await context.request.json();
		const api = crearClienteApi(env.N8N_BASE_URL);
		const pago = await api.registrarPagoSaldo(cuerpo);
		return new Response(JSON.stringify(pago), {
			status: 201,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		const mensaje = error instanceof ApiError ? error.message : 'No se pudo registrar el pago.';
		return new Response(JSON.stringify({ error: mensaje }), { status: 502 });
	}
};
