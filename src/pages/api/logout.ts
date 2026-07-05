import type { APIRoute } from 'astro';
import { COOKIE } from '../../lib/session';

export const prerender = false;

export const POST: APIRoute = async (context) => {
	context.cookies.delete(COOKIE.nombre, { path: '/' });
	return context.redirect('/login');
};
