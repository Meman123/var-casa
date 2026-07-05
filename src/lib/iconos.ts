// Mapa central de íconos de categoría: el backend guarda un nombre ("shopping-cart",
// "home", "bulb", ...) y aquí se traduce a un SVG inline (estilo outline, 24x24,
// stroke: currentColor). Cualquier nombre desconocido cae en ICONO_FALLBACK.
//
// Se usa tanto en el servidor (IconoCategoria.astro, picker de configuración)
// como en el cliente (preview del formulario de gasto).

export const ICONOS: Record<string, string> = {
	'shopping-cart':
		'<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
	home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
	bulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4.09 12.68c.63.46 1.09 1.15 1.09 1.93V17h6v-.39c0-.78.46-1.47 1.09-1.93A7 7 0 0 0 12 2z"/>',
	broom:
		'<path d="M19.5 4.5 12 12"/><path d="m12 12-7.6 7.6c2.6 1.6 6 1.2 8.2-1L16 15z"/><path d="M4.4 19.6 3 21"/><path d="m14 13 2.5 2.5"/>',
	bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
	utensils:
		'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
	car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
	heart:
		'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/>',
	droplet:
		'<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
	zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
	wifi: '<path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M12 20h.01"/>',
	gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C9.5 3 11 4.5 12 8c1-3.5 2.5-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
	paw: '<circle cx="6" cy="9" r="1.8"/><circle cx="18" cy="9" r="1.8"/><circle cx="10" cy="5.5" r="1.8"/><circle cx="14" cy="5.5" r="1.8"/><path d="M12 11c-2.5 0-4.8 2.1-4.8 4.5 0 1.6 1 3 2.6 3 .9 0 1.5-.5 2.2-.5s1.3.5 2.2.5c1.6 0 2.6-1.4 2.6-3 0-2.4-2.3-4.5-4.8-4.5z"/>',
	tv: '<rect x="2" y="7" width="20" height="15" rx="2"/><path d="m17 2-5 5-5-5"/>',
	shirt:
		'<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
	plane:
		'<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 5.3 3.5c.4.3.9.2 1.3-.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
	wrench:
		'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
	book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
	tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
};

export const ICONO_FALLBACK = 'tag';

/** Nombres disponibles, para el picker de configuración. */
export const NOMBRES_ICONOS = Object.keys(ICONOS);

/** Etiquetas legibles para el picker (accesibilidad / title). */
export const ETIQUETAS_ICONOS: Record<string, string> = {
	'shopping-cart': 'Mercado',
	home: 'Hogar',
	bulb: 'Servicios',
	broom: 'Aseo',
	bag: 'Compras',
	utensils: 'Comida',
	car: 'Transporte',
	heart: 'Salud',
	droplet: 'Agua',
	zap: 'Energía',
	wifi: 'Internet',
	gift: 'Regalos',
	paw: 'Mascotas',
	tv: 'Entretenimiento',
	shirt: 'Ropa',
	plane: 'Viajes',
	wrench: 'Mantenimiento',
	book: 'Educación',
	tag: 'Otros',
};

/** Devuelve el markup SVG completo del ícono (con fallback si el nombre no existe). */
export function svgIcono(nombre: string): string {
	const contenido = ICONOS[nombre] ?? ICONOS[ICONO_FALLBACK];
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${contenido}</svg>`;
}
