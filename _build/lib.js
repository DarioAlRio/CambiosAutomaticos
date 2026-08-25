/*
 * lib.js — piezas reutilizables del HTML.
 *
 * Todo lo visual del sitio sale de aquí: los iconos (SVG en línea, sin
 * ninguna librería) y los componentes que se repiten en varias páginas
 * (placas, fotografías montadas, galería, acordeón, tablas, banda de aviso).
 *
 * El vocabulario del diseño es el de la rotulación industrial: una PLACA es
 * un panel con doble filete, como un rótulo esmaltado atornillado a la
 * fachada de una nave. Ver DESIGN.md.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const MEDIDAS = JSON.parse(fs.readFileSync(path.join(__dirname, 'imagenes.json'), 'utf8'));

/* ---------------------------------------------------------------- utilidades */

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* Une trozos de HTML saltándose los vacíos. */
function unir(partes) {
  return partes.filter(Boolean).join('\n');
}

/* ------------------------------------------------------------------- iconos */

/*
 * Pictogramas de señalética industrial: trazo uniforme, esquinas rectas,
 * nada de degradados. Se dibujan sobre una caja de 24×24 y heredan el color
 * del texto. Ninguno lleva texto dentro, así que van con aria-hidden y el
 * significado lo pone siempre la palabra que los acompaña.
 */
const ICONOS = {
  telefono:
    '<path d="M6 3h4l2 5-2.5 1.5a12 12 0 0 0 5 5L16 12l5 2v4a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3Z"/>',
  correo: '<path d="M3 5h18v14H3z"/><path d="m3 6 9 7 9-7"/>',
  ubicacion: '<path d="M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/>',
  camion: '<path d="M2 6h11v11H2z"/><path d="M13 9h4.5l3.5 4v4h-8z"/><circle cx="7" cy="18.5" r="2"/><circle cx="17" cy="18.5" r="2"/>',
  garantia: '<path d="M12 3 4 6v6c0 5 3.4 8.2 8 9 4.6-.8 8-4 8-9V6Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  /* Caja de cambios: cuerpo, campana de acoplamiento y eje de salida. */
  caja: '<rect x="2.5" y="6.5" width="11" height="11" rx="2"/><path d="M13.5 9.5h2.6a2.6 2.6 0 0 1 0 5.2h-2.6"/><path d="M18.7 12H21.5"/><path d="M5.5 6.5V4M10.5 6.5V4"/>',
  /* Convertidor de par: corona exterior, buje central y álabes. */
  engranaje:
    '<circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="2.9"/><path d="M12 3.4v5.7M12 14.9v5.7M3.4 12h5.7M14.9 12h5.7"/>',
  elevador: '<path d="M3 20h18"/><path d="M12 20V9"/><path d="M6 9h12"/><path d="M6 9 9 5h6l3 4"/><path d="M8 20v-3h8v3"/>',
  gota: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z"/>',
  llave: '<path d="M14.5 3a5.5 5.5 0 0 0-5 7.8L3 17.3V21h3.7l6.5-6.5A5.5 5.5 0 1 0 14.5 3Z"/><circle cx="16" cy="8" r="1.4"/>',
  flecha: '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
  chevron: '<path d="m7 10 5 5 5-5"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  cerrar: '<path d="M5 5 19 19M19 5 5 19"/>',
  aviso: '<path d="M12 3 2 20h20Z"/><path d="M12 10v4"/><path d="M12 17h.01"/>',
  mas: '<path d="M12 5v14M5 12h14"/>',
  lupa: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 4.5 4.5"/>',
  fax: '<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="7" rx="1.5"/><path d="M7 16h10v5H7z"/>',
};

function icono(nombre, clase) {
  const d = ICONOS[nombre];
  if (!d) throw new Error('Icono inexistente: ' + nombre);
  return (
    '<svg class="ico' +
    (clase ? ' ' + clase : '') +
    '" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    d +
    '</svg>'
  );
}

/* ------------------------------------------------------------------ imágenes */

/*
 * <picture> con WebP y respaldo JPEG. Las medidas salen del manifiesto que
 * genera _build/imagenes.js, así que ninguna imagen puede quedarse sin
 * width/height (y por tanto sin reserva de espacio).
 *
 * Aviso importante de este proyecto: las fotografías originales son
 * diminutas (la mayor tiene 466 px de ancho). Nunca se muestran a más de su
 * tamaño nativo. `anchoCss` es el ancho máximo al que se pinta.
 */
function imagen(archivo, alt, opciones) {
  const o = opciones || {};
  const m = MEDIDAS[archivo];
  if (!m) throw new Error('Imagen sin medidas en imagenes.json: ' + archivo);

  const ruta = (o.raiz || 'assets/img/') + archivo;
  const rutaWebp = ruta.replace(/\.(jpg|png)$/, '.webp');

  const attrs = [
    'src="' + esc(ruta) + '"',
    'alt="' + esc(alt) + '"',
    'width="' + m.ancho + '"',
    'height="' + m.alto + '"',
  ];

  if (o.prioridad) {
    attrs.push('fetchpriority="high"', 'decoding="async"');
  } else {
    attrs.push('loading="lazy"', 'decoding="async"');
  }
  if (o.clase) attrs.push('class="' + esc(o.clase) + '"');
  if (o.sizes) attrs.push('sizes="' + esc(o.sizes) + '"');

  const img = '<img ' + attrs.join(' ') + '>';

  if (!m.webp) return img;
  return (
    '<picture>' +
    '<source type="image/webp" srcset="' +
    esc(rutaWebp) +
    '">' +
    img +
    '</picture>'
  );
}

/*
 * Fotografía montada como placa: filete exterior, respiro blanco y pie
 * opcional. Es el modo estándar de enseñar una foto en este sitio, y el que
 * resuelve el problema de que el material sea tan pequeño: la foto nunca se
 * estira, se enmarca.
 */
function placaFoto(archivo, alt, pie, opciones) {
  const o = opciones || {};
  const m = MEDIDAS[archivo];
  return (
    '<figure class="placa-foto' +
    (o.clase ? ' ' + o.clase : '') +
    '" style="--ancho-nativo:' +
    m.ancho +
    'px">' +
    '<div class="placa-foto__marco">' +
    imagen(archivo, alt, { prioridad: o.prioridad, raiz: o.raiz }) +
    '</div>' +
    (pie ? '<figcaption class="placa-foto__pie">' + pie + '</figcaption>' : '') +
    '</figure>'
  );
}

/* -------------------------------------------------------------------- placas */

/*
 * PLACA: el componente base del sitio. Un panel con doble filete, como un
 * rótulo esmaltado. `tono` elige el acabado: 'claro' (aluminio), 'azul'
 * (esmalte azul corporativo) o 'blanco' (papel).
 */
function placa(contenido, opciones) {
  const o = opciones || {};
  const clases = ['placa', 'placa--' + (o.tono || 'blanco')];
  if (o.clase) clases.push(o.clase);
  const etiqueta = o.etiqueta || 'div';
  return (
    '<' +
    etiqueta +
    ' class="' +
    clases.join(' ') +
    '">' +
    contenido +
    '</' +
    etiqueta +
    '>'
  );
}

/*
 * Placa que además es un enlace entero: la usan los índices de servicios.
 * El enlace envuelve el titular, no toda la placa, para que el lector de
 * pantalla anuncie un destino con sentido; el resto de la placa se hace
 * pulsable con un pseudoelemento en CSS (.placa-enlace__zona).
 */
function placaEnlace(opciones) {
  const o = opciones;
  return (
    '<div class="placa placa--blanco placa-enlace' + (o.clase ? ' ' + o.clase : '') + '">' +
    (o.icono ? '<span class="placa-enlace__ico">' + icono(o.icono) + '</span>' : '') +
    '<h3 class="placa-enlace__titulo">' +
    '<a class="placa-enlace__zona" href="' +
    esc(o.href) +
    '">' +
    esc(o.titulo) +
    '</a></h3>' +
    '<p class="placa-enlace__texto">' +
    o.texto +
    '</p>' +
    '<span class="placa-enlace__pie" aria-hidden="true">' +
    esc(o.accion || 'Ver el servicio') +
    icono('flecha') +
    '</span>' +
    '</div>'
  );
}

/* --------------------------------------------------------------------- datos */

/*
 * Dato duro presentado como plaquita numerada, al estilo de los números de
 * nave pintados en un polígono. Solo se usa con cifras que existen de verdad
 * en el dominio: 12 meses de garantía, 5 elevadores, 2 plantas, 6 marcas.
 */
function cifra(valor, unidad, texto) {
  return (
    '<div class="cifra">' +
    '<p class="cifra__valor">' +
    esc(valor) +
    (unidad ? '<span class="cifra__unidad">' + esc(unidad) + '</span>' : '') +
    '</p>' +
    '<p class="cifra__texto">' +
    texto +
    '</p>' +
    '</div>'
  );
}

/* ------------------------------------------------------------------- galería */

/*
 * Galería de fotografías con visor. Sin JavaScript sigue siendo una lista de
 * enlaces que abren la imagen a tamaño completo, así que nunca queda inservible.
 *
 * Las miniaturas se pintan a la mitad del ancho nativo de la fotografía: al
 * ser material de 2007 tan pequeño, esa es la única forma de que se vean
 * nítidas también en pantallas de alta densidad.
 */
function galeria(items, opciones) {
  const o = opciones || {};
  const piezas = items.map(function (it, i) {
    const m = MEDIDAS[it.archivo];
    return (
      '<li class="galeria__item">' +
      '<a class="galeria__enlace" href="assets/img/' +
      esc(it.archivo) +
      '" data-visor="' +
      i +
      '" data-pie="' +
      esc(it.pie) +
      '" data-alt="' +
      esc(it.alt) +
      '">' +
      imagen(it.archivo, it.alt, { clase: 'galeria__img' }) +
      '<span class="galeria__pie">' +
      esc(it.pie) +
      '<span class="galeria__lupa" aria-hidden="true">' +
      icono('lupa') +
      '</span></span>' +
      '<span class="galeria__medidas" aria-hidden="true">' +
      m.ancho +
      '×' +
      m.alto +
      '</span>' +
      '</a></li>'
    );
  });
  return (
    '<ul class="galeria' + (o.clase ? ' ' + o.clase : '') + '" data-galeria>' +
    piezas.join('') +
    '</ul>'
  );
}

/* ------------------------------------------------------------------ acordeón */

/*
 * Acordeón accesible. Se construye sobre <details>/<summary>, así que
 * funciona sin JavaScript y el teclado lo maneja el propio navegador.
 * site.js solo añade la animación de apertura y el comportamiento de
 * «uno abierto cada vez» cuando se le pide.
 */
function acordeon(items, opciones) {
  const o = opciones || {};
  const piezas = items.map(function (it, i) {
    return (
      '<details class="acordeon__item"' +
      (o.primeroAbierto && i === 0 ? ' open' : '') +
      '>' +
      '<summary class="acordeon__cabeza">' +
      '<span class="acordeon__titulo">' +
      esc(it.titulo) +
      '</span>' +
      '<span class="acordeon__signo" aria-hidden="true">' +
      icono('chevron') +
      '</span>' +
      '</summary>' +
      '<div class="acordeon__cuerpo">' +
      it.cuerpo +
      '</div>' +
      '</details>'
    );
  });
  return (
    '<div class="acordeon' + (o.clase ? ' ' + o.clase : '') + '"' +
    (o.unico ? ' data-acordeon-unico' : '') +
    '>' +
    piezas.join('') +
    '</div>'
  );
}

/* -------------------------------------------------------------------- tablas */

/*
 * Tabla con desplazamiento horizontal propio, para que en móvil se desplace
 * ella y no la página entera. El contenedor es enfocable con el teclado
 * porque, si no, quien navega sin ratón no puede desplazarla.
 */
function tabla(cabeceras, filas, opciones) {
  const o = opciones || {};
  const th = cabeceras
    .map(function (c) {
      return '<th scope="col">' + c + '</th>';
    })
    .join('');
  const tr = filas
    .map(function (f) {
      return (
        '<tr>' +
        f
          .map(function (c, i) {
            return i === 0
              ? '<th scope="row">' + c + '</th>'
              : '<td>' + c + '</td>';
          })
          .join('') +
        '</tr>'
      );
    })
    .join('');
  return (
    '<div class="tabla-marco" tabindex="0" role="region" aria-label="' +
    esc(o.titulo || 'Tabla de datos') +
    '">' +
    '<table class="tabla">' +
    (o.leyenda ? '<caption>' + o.leyenda + '</caption>' : '') +
    '<thead><tr>' +
    th +
    '</tr></thead><tbody>' +
    tr +
    '</tbody></table></div>'
  );
}

/* ------------------------------------------------------- contacto: enlaces */

/*
 * Enlace de teléfono. En el móvil llama; en escritorio al menos deja copiar
 * el número, que se muestra siempre escrito.
 */
function enlaceTelefono(sitio, opciones) {
  const o = opciones || {};
  return (
    '<a class="' +
    (o.clase || 'enlace-tel') +
    '" href="tel:' +
    sitio.telefonoEnlace +
    '"' +
    (o.etiqueta ? ' aria-label="' + esc(o.etiqueta) + '"' : '') +
    '>' +
    (o.icono === false ? '' : icono('telefono')) +
    '<span>' +
    esc(o.texto || sitio.telefono) +
    '</span></a>'
  );
}

/*
 * Enlace de correo SIN la dirección escrita en el HTML.
 *
 * El texto visible y el href los monta site.js a partir de data-correo,
 * que lleva las dos mitades separadas por una barra vertical. Los robots
 * que rascan HTML en busca de «algo@algo» no encuentran nada; el navegador
 * sí, y el enlace resultante es un mailto: normal y corriente.
 *
 * Si el JavaScript no llega a ejecutarse queda un enlace a la página de
 * contacto con el texto «Escríbanos», que sigue siendo útil y navegable.
 */
function enlaceCorreo(sitio, opciones) {
  const o = opciones || {};
  return (
    '<a class="' +
    (o.clase || 'enlace-correo') +
    '" href="contacto.html"' +
    ' data-correo="' +
    sitio.correoCuenta +
    '|' +
    sitio.correoDominio +
    '"' +
    (o.asunto ? ' data-asunto="' + esc(o.asunto) + '"' : '') +
    '>' +
    (o.icono === false ? '' : icono('correo')) +
    '<span data-correo-texto>' +
    esc(o.texto || 'Escríbanos') +
    '</span></a>'
  );
}

/* ---------------------------------------------------------------- avisos */

function aviso(texto, opciones) {
  const o = opciones || {};
  return (
    '<p class="aviso' + (o.clase ? ' ' + o.clase : '') + '" role="note">' +
    icono('aviso') +
    '<span>' +
    texto +
    '</span></p>'
  );
}

module.exports = {
  esc,
  unir,
  icono,
  ICONOS,
  imagen,
  placaFoto,
  placa,
  placaEnlace,
  cifra,
  galeria,
  acordeon,
  tabla,
  enlaceTelefono,
  enlaceCorreo,
  aviso,
  MEDIDAS,
};
