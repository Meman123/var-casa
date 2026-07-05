// Utilidades de formato compartidas (moneda COP, fechas, mes de referencia).

const formateadorMoneda = new Intl.NumberFormat('es-CO', {
	style: 'currency',
	currency: 'COP',
	maximumFractionDigits: 0,
});

export function formatearMonto(monto: number): string {
	return formateadorMoneda.format(monto);
}

const NOMBRES_MES = [
	'enero',
	'febrero',
	'marzo',
	'abril',
	'mayo',
	'junio',
	'julio',
	'agosto',
	'septiembre',
	'octubre',
	'noviembre',
	'diciembre',
];

/** Recibe 'YYYY-MM' y devuelve algo como "julio 2026". */
export function formatearMesReferencia(mesReferencia: string): string {
	const [anio, mes] = mesReferencia.split('-').map(Number);
	const nombre = NOMBRES_MES[(mes ?? 1) - 1] ?? mesReferencia;
	return `${nombre} ${anio}`;
}

/**
 * Extrae la parte 'YYYY-MM-DD' de una fecha que puede venir como fecha plana
 * o como timestamp ISO ('2026-07-04T05:00:00.000Z') desde los webhooks.
 * Devuelve '' si no hay una fecha reconocible.
 */
export function normalizarFecha(fecha: string | null | undefined): string {
	if (!fecha) return '';
	const coincidencia = fecha.match(/\d{4}-\d{2}-\d{2}/);
	return coincidencia ? coincidencia[0] : '';
}

/** Recibe 'YYYY-MM-DD' (o timestamp ISO) y devuelve algo como "4 jul". */
export function formatearFechaCorta(fecha: string): string {
	const normalizada = normalizarFecha(fecha);
	if (!normalizada) return '';
	const [, mes, dia] = normalizada.split('-').map(Number);
	const nombre = NOMBRES_MES[(mes ?? 1) - 1]?.slice(0, 3) ?? '';
	return `${dia} ${nombre}`;
}

export function fechaHoy(): string {
	const ahora = new Date();
	const anio = ahora.getFullYear();
	const mes = String(ahora.getMonth() + 1).padStart(2, '0');
	const dia = String(ahora.getDate()).padStart(2, '0');
	return `${anio}-${mes}-${dia}`;
}

export function mesReferenciaActual(): string {
	return fechaHoy().slice(0, 7);
}

/** Dado 'YYYY-MM' devuelve el mes siguiente en el mismo formato, junto a sus partes numericas. */
export function mesSiguiente(mesReferencia: string): {
	anio: number;
	mes: number;
	mesReferencia: string;
} {
	const [anio, mes] = mesReferencia.split('-').map(Number);
	const fecha = new Date(anio, mes, 1); // mes es 1-indexado, asi que esto ya avanza un mes
	const siguienteAnio = fecha.getFullYear();
	const siguienteMes = fecha.getMonth() + 1;
	return {
		anio: siguienteAnio,
		mes: siguienteMes,
		mesReferencia: `${siguienteAnio}-${String(siguienteMes).padStart(2, '0')}`,
	};
}

export function mesAnterior(mesReferencia: string): string {
	const [anio, mes] = mesReferencia.split('-').map(Number);
	const fecha = new Date(anio, mes - 2, 1);
	return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
}

export function capitalizar(texto: string): string {
	return texto.charAt(0).toUpperCase() + texto.slice(1);
}
