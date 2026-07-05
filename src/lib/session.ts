// Manejo de la cookie de sesion httpOnly.
// No hay tabla de sesiones en el backend (solo /login valida el password), asi que
// la sesion se implementa como un token firmado (HMAC-SHA256) que el propio Astro
// SSR emite y verifica. El secreto vive en la variable de entorno SESSION_SECRET.

const NOMBRE_COOKIE = 'var_casa_session';
const DIAS_VALIDEZ = 30;

async function obtenerClave(secreto: string): Promise<CryptoKey> {
	const codificador = new TextEncoder();
	return crypto.subtle.importKey(
		'raw',
		codificador.encode(secreto),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign', 'verify'],
	);
}

function bufferAHex(buffer: ArrayBuffer): string {
	return Array.from(new Uint8Array(buffer))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}

export async function crearValorCookie(secreto: string): Promise<string> {
	const expira = Date.now() + DIAS_VALIDEZ * 24 * 60 * 60 * 1000;
	const payload = `autenticado.${expira}`;
	const clave = await obtenerClave(secreto);
	const firma = await crypto.subtle.sign('HMAC', clave, new TextEncoder().encode(payload));
	return `${payload}.${bufferAHex(firma)}`;
}

export async function cookieEsValida(secreto: string, valor: string | undefined): Promise<boolean> {
	if (!valor) return false;

	const partes = valor.split('.');
	if (partes.length !== 3) return false;

	const [marca, expiraStr, firmaHex] = partes;
	if (marca !== 'autenticado') return false;

	const expira = Number(expiraStr);
	if (!Number.isFinite(expira) || Date.now() > expira) return false;

	const payload = `${marca}.${expiraStr}`;
	const clave = await obtenerClave(secreto);
	const firmaEsperada = await crypto.subtle.sign('HMAC', clave, new TextEncoder().encode(payload));
	const firmaEsperadaHex = bufferAHex(firmaEsperada);

	if (firmaEsperadaHex.length !== firmaHex.length) return false;

	// Comparacion en tiempo constante.
	let diferencia = 0;
	for (let i = 0; i < firmaEsperadaHex.length; i++) {
		diferencia |= firmaEsperadaHex.charCodeAt(i) ^ firmaHex.charCodeAt(i);
	}
	return diferencia === 0;
}

export const COOKIE = {
	nombre: NOMBRE_COOKIE,
	maxAgeSegundos: DIAS_VALIDEZ * 24 * 60 * 60,
};
