/*
 * Convertidores de par.
 *
 * Antes era la segunda mitad de la capa «reparacion» de pags/servicios.html.
 * Merece página propia porque es el servicio que menos talleres ofrecen.
 */

'use strict';

const L = require('../lib.js');
const D = require('../data.js');
const M = require('../layout.js');

const PIEZAS = [
  {
    nombre: 'Rueda libre',
    nota: 'Componente citado expresamente entre los que se sustituyen.',
  },
  {
    nombre: 'Discos de impacto',
    nota: 'Componente citado expresamente entre los que se sustituyen.',
  },
  {
    nombre: 'Componentes de desgaste y fricción',
    nota: 'Se sustituyen los elementos que han perdido material por rozamiento.',
  },
];

function construir() {
  const servicio = D.SERVICIOS[1];

  const contenido = L.unir([
    M.heroeInterior({
      migas: [{ texto: 'Servicios', href: 'servicios.html' }, { texto: 'Convertidores de par' }],
      antetitulo: 'Reparación y reconstrucción',
      titulo: 'Convertidores<br>de par',
      entradilla:
        'Reparación y reconstrucción de convertidores de par o hidráulicos. Se sustituyen los componentes de desgaste y fricción en lugar de reemplazar la pieza completa.',
      foto: {
        archivo: 'convertidores-banco.jpg',
        alt: 'Cuatro convertidores de par desmontados y colocados en fila sobre la mesa de trabajo.',
        pie: 'Convertidores desmontados, listos para el banco',
      },
    }),

    '<section class="seccion" aria-labelledby="t-piezas">',
    '  <div class="contenedor">',
    '    <div class="cabeza-seccion">',
    '      <h2 class="titular" id="t-piezas">Qué se sustituye por dentro</h2>',
    '      <p class="parrafo parrafo--guia">Un convertidor de par no es una pieza sellada de usar y tirar. Estos son los componentes que se cambian cuando entra uno en el taller.</p>',
    '    </div>',
    '    <ul class="lista-piezas">',
    PIEZAS.map(function (p) {
      return (
        '<li class="lista-piezas__item">' +
        '<span class="lista-piezas__ico">' +
        L.icono('engranaje') +
        '</span>' +
        '<div><p class="lista-piezas__nombre">' +
        L.esc(p.nombre) +
        '</p><p class="lista-piezas__nota">' +
        L.esc(p.nota) +
        '</p></div></li>'
      );
    }).join(''),
    '    </ul>',
    '    ' +
      L.aviso(
        'El listado anterior es el que publicaba el taller, palabra por palabra. No hay más despiece publicado: para saber si su convertidor concreto es reparable, llámenos.'
      ),
    '  </div>',
    '</section>',

    '<section class="seccion seccion--azul" aria-labelledby="t-porque">',
    '  <div class="contenedor contenedor--estrecho">',
    '    <h2 class="titular titular--claro" id="t-porque">Por qué importa que se abra</h2>',
    '    <p class="parrafo parrafo--claro parrafo--guia">El convertidor es la pieza que sustituye al embrague en un cambio automático. Cuando se sustituye entero se paga una unidad completa; cuando se abre, se paga el desgaste.</p>',
    '    <p class="parrafo parrafo--claro">Es el mismo criterio que se aplica a la caja: se reconstruye lo que puede reconstruirse y se emplean primeras marcas en todos los componentes sustituidos. Todos los trabajos salen con doce meses de garantía.</p>',
    '  </div>',
    '</section>',

    '<section class="seccion seccion--siguiente" aria-labelledby="t-siguiente">',
    '  <div class="contenedor">',
    '    <h2 class="titular" id="t-siguiente">Continúa por aquí</h2>',
    '    <div class="rejilla-servicios rejilla-servicios--pareja">',
    L.placaEnlace({
      href: 'cajas-de-cambio.html',
      titulo: 'Cajas de cambio automáticas',
      texto: L.esc(D.SERVICIOS[0].resumen),
      icono: 'caja',
    }),
    L.placaEnlace({
      href: 'mantenimiento.html',
      titulo: 'Mantenimiento',
      texto: L.esc(D.SERVICIOS[3].resumen),
      icono: 'gota',
    }),
    '    </div>',
    '  </div>',
    '</section>',
  ]);

  return {
    archivo: 'convertidores.html',
    titulo: 'Reparación de convertidores de par · Tecnicars Madrid',
    descripcion:
      'Reparación y reconstrucción de convertidores de par o hidráulicos: rueda libre, discos de impacto y demás componentes de desgaste y fricción. Garantía de 12 meses.',
    prioridad: '0.8',
    contenido: contenido,
    jsonLd: D.servicioJsonLd(servicio),
  };
}

module.exports = { construir };
