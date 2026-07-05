// Tipos que reflejan el contrato de los webhooks de n8n.
// No modificar sin verificar antes el contrato real del backend.

export type Persona = 'meman' | 'paya';
export type PagadoPor = Persona | 'conjunto';
export type TipoCategoria = 'fija' | 'variable';
export type EstadoMes = 'abierto' | 'cerrado';

export interface Categoria {
	id: number;
	nombre: string;
	tipo: TipoCategoria;
	icono: string;
	color: string;
	presupuesto_mensual: number | null;
	activa: boolean;
}

export interface Gasto {
	id: number;
	categoria_id: number;
	categoria_nombre: string;
	icono: string;
	color: string;
	descripcion: string;
	monto: number;
	fecha: string; // YYYY-MM-DD
	pagado_por: PagadoPor;
	split_meman: number; // porcentaje 0-100
	split_paya: number; // porcentaje 0-100
	mes_referencia: string; // YYYY-MM
}

export interface NuevoGasto {
	categoria_id: number;
	descripcion: string;
	monto: number;
	fecha: string;
	pagado_por: PagadoPor;
	split_meman: number;
	split_paya: number;
	mes_referencia: string;
}

export interface ActualizarGasto {
	id: number;
	categoria_id: number;
	descripcion: string;
	monto: number;
	fecha: string;
	pagado_por: PagadoPor;
	split_meman: number;
	split_paya: number;
}

export interface Balance {
	total_gastado: number;
	pagado_meman: number;
	pagado_paya: number;
	diferencia_meman: number; // positivo = Paya le debe a Meman; negativo = Meman le debe a Paya
}

export interface PresupuestoCategoria {
	categoria_id: number;
	nombre: string;
	icono: string;
	color: string;
	presupuesto_mensual: number;
	gastado: number;
	porcentaje_usado: number | null;
}

export interface Mes {
	mes_referencia: string;
	estado: EstadoMes;
	fecha_cierre: string | null;
	total_gastado: number;
}

export interface PagoSaldo {
	mes_referencia: string;
	de_quien: Persona;
	a_quien: Persona;
	monto: number;
	fecha?: string;
}

export interface NuevaCategoria {
	nombre: string;
	tipo: TipoCategoria;
	icono: string;
	color: string;
	presupuesto_mensual: number | null;
}

export interface ActualizarCategoria extends NuevaCategoria {
	id: number;
	activa: boolean;
}
