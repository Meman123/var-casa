// Calculo de la racha (streak) a partir de /meses.
// No hay endpoint dedicado a logros: la racha se deriva de los meses ya cerrados
// (con al menos un gasto registrado, es decir "saldados a tiempo") mas el mes
// actual si ya tiene actividad.

import type { Mes } from './types';

export interface Racha {
	/** Meses consecutivos, cerrados y con gastos, contando hacia atras desde el mes anterior al actual. */
	mesesConsecutivos: number;
	/** Si el mes en curso (abierto) ya tiene al menos un gasto registrado. */
	mesActualConGasto: boolean;
}

export function calcularRacha(meses: Mes[]): Racha {
	// /meses ya viene en orden descendente por mes_referencia.
	const ordenados = [...meses].sort((a, b) => (a.mes_referencia < b.mes_referencia ? 1 : -1));

	let mesActualConGasto = false;
	let inicio = 0;

	if (ordenados.length > 0 && ordenados[0].estado === 'abierto') {
		mesActualConGasto = ordenados[0].total_gastado > 0;
		inicio = 1;
	}

	let mesesConsecutivos = 0;
	for (let i = inicio; i < ordenados.length; i++) {
		const mes = ordenados[i];
		if (mes.estado === 'cerrado' && mes.total_gastado > 0) {
			mesesConsecutivos++;
		} else {
			break;
		}
	}

	return { mesesConsecutivos, mesActualConGasto };
}
