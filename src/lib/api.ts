// Cliente para los webhooks de n8n (backend ya construido, no modificar el contrato).
// Toda la app llama a n8n a traves de este archivo para no repetir URLs ni logica
// de manejo de errores en cada pagina.

import type {
	ActualizarCategoria,
	ActualizarGasto,
	Balance,
	Categoria,
	Gasto,
	Mes,
	NuevaCategoria,
	NuevoGasto,
	PagoSaldo,
	PresupuestoCategoria,
} from './types';

export class ApiError extends Error {
	constructor(
		message: string,
		public status?: number,
	) {
		super(message);
		this.name = 'ApiError';
	}
}

const TIMEOUT_MS = 10_000;

async function llamar<T>(
	baseUrl: string,
	path: string,
	init: RequestInit = {},
): Promise<T> {
	if (!baseUrl) {
		throw new ApiError('N8N_BASE_URL no esta configurada.');
	}

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

	let respuesta: Response;
	try {
		respuesta = await fetch(`${baseUrl}${path}`, {
			...init,
			signal: controller.signal,
			headers: {
				'Content-Type': 'application/json',
				...init.headers,
			},
		});
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			throw new ApiError('El servidor tardo demasiado en responder. Intenta de nuevo.');
		}
		throw new ApiError('No se pudo conectar con el servidor. Revisa tu conexion.');
	} finally {
		clearTimeout(timeout);
	}

	if (!respuesta.ok) {
		throw new ApiError(
			`El servidor respondio con un error (${respuesta.status}).`,
			respuesta.status,
		);
	}

	const texto = await respuesta.text();
	if (!texto) {
		return undefined as T;
	}

	try {
		return JSON.parse(texto) as T;
	} catch {
		throw new ApiError('El servidor devolvio una respuesta invalida.');
	}
}

export function crearClienteApi(baseUrl: string) {
	return {
		login(password: string) {
			return llamar<{ valido: boolean }>(baseUrl, '/login', {
				method: 'POST',
				body: JSON.stringify({ password }),
			});
		},

		crearGasto(gasto: NuevoGasto) {
			return llamar<Gasto>(baseUrl, '/gastos', {
				method: 'POST',
				body: JSON.stringify(gasto),
			});
		},

		obtenerGastos(mes: string) {
			return llamar<Gasto[]>(baseUrl, `/gastos?mes=${encodeURIComponent(mes)}`);
		},

		actualizarGasto(gasto: ActualizarGasto) {
			return llamar<Gasto>(baseUrl, '/gastos', {
				method: 'PUT',
				body: JSON.stringify(gasto),
			});
		},

		eliminarGasto(id: number) {
			return llamar<{ id: number }>(baseUrl, `/gastos?id=${id}`, {
				method: 'DELETE',
			});
		},

		obtenerBalance(mes: string) {
			return llamar<Balance>(baseUrl, `/balance?mes=${encodeURIComponent(mes)}`);
		},

		obtenerPresupuestos(mes: string) {
			return llamar<PresupuestoCategoria[]>(
				baseUrl,
				`/presupuestos?mes=${encodeURIComponent(mes)}`,
			);
		},

		obtenerMeses() {
			return llamar<Mes[]>(baseUrl, '/meses');
		},

		cerrarMes(datos: {
			mes_referencia: string;
			siguiente_anio: number;
			siguiente_mes: number;
			siguiente_mes_referencia: string;
		}) {
			return llamar<{ cerrado: true }>(baseUrl, '/meses/cerrar', {
				method: 'POST',
				body: JSON.stringify(datos),
			});
		},

		registrarPagoSaldo(pago: PagoSaldo) {
			return llamar<PagoSaldo>(baseUrl, '/pagos-saldo', {
				method: 'POST',
				body: JSON.stringify(pago),
			});
		},

		obtenerCategorias() {
			return llamar<Categoria[]>(baseUrl, '/categorias');
		},

		crearCategoria(categoria: NuevaCategoria) {
			return llamar<Categoria>(baseUrl, '/categorias', {
				method: 'POST',
				body: JSON.stringify(categoria),
			});
		},

		actualizarCategoria(categoria: ActualizarCategoria) {
			return llamar<Categoria>(baseUrl, '/categorias', {
				method: 'PUT',
				body: JSON.stringify(categoria),
			});
		},
	};
}

export type ApiClient = ReturnType<typeof crearClienteApi>;
