/*
 * Marcas de caja que se trabajan, y el stock.
 *
 * Página nueva. En el sitio de 2007 esta información era una sola frase
 * perdida dentro de una capa oculta, pese a ser el dato que más buscan los
 * talleres que subcontratan.
 */

'use strict';

const L = require('../lib.js');
const D = require('../data.js');
const M = require('../layout.js');

function construir() {
  const contenido = L.unir([
    M.heroeInterior({
      migas: [{ texto: 'Marcas' }],
      antetitulo: 'Con stock en almacén',
      titulo: 'Las marcas<br>que trabajamos',
      entradilla:
        'Algunas de las marcas que trabajamos: ZF, GM, Aisin Warner, Hydra-Matic, Allison, Jacto. Contando con amplio stock de todas ellas.',
      foto: {
        archivo: 'cajas-estanteria-detalle.jpg',
        alt: 'Detalle de dos cajas de cambio automáticas completas colocadas en la estantería del almacén.',
        pie: 'Cajas completas en la estantería',
      },
    }),

    '<section class="seccion" aria-labelledby="t-placas">',
    '  <div class="contenedor">',
    '    <h2 class="visually-hidden" id="t-placas">Listado de marcas</h2>',
    '    <ul class="placas-marcas">',
    D.MARCAS.map(function (m) {
      return (
        '<li class="placas-marcas__item"><span class="placas-marcas__nombre">' +
        L.esc(m.nombre) +
        '</span></li>'
      );
    }).join(''),
    '    </ul>',
    '    ' +
      L.aviso(
        'La palabra «algunas» es del propio taller: el listado no es cerrado. Si su caja es de otra marca, pregúntelo por teléfono antes de darla por perdida.'
      ),
    '  </div>',
    '</section>',

    '<section class="seccion seccion--claro" aria-labelledby="t-stock">',
    '  <div class="contenedor">',
    '    <div class="prueba">',
    '      <div class="prueba__foto">',
    '        ' +
      L.placaFoto(
        'almacen-cajas-estanteria.jpg',
        'Estanterías metálicas de cuatro alturas llenas de cajas de cambio automáticas completas, ordenadas por modelo.',
        'El almacén de la planta superior'
      ),
    '      </div>',
    '      <div class="prueba__texto">',
    '        <h2 class="titular" id="t-stock">Qué significa «amplio stock»</h2>',
    '        <p class="parrafo parrafo--guia">Significa esto: cajas completas, en estantería, en la misma planta en la que se reconstruye. El almacén está junto al banco de trabajo, no en otra nave ni en el catálogo de un proveedor.</p>',
    '        <p class="parrafo">En la segunda planta hay un completo almacén con todo tipo de recambios, para poder ofrecer de la forma más rápida el mejor servicio.</p>',
    '        <p class="parrafo parrafo--pequeno">Esta fotografía estaba dentro de una animación Flash del sitio anterior y dejó de verse en 2020, cuando los navegadores retiraron Flash.</p>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</section>',

    '<section class="seccion" aria-labelledby="t-tabla">',
    '  <div class="contenedor">',
    '    <h2 class="titular" id="t-tabla">Marca por marca</h2>',
    '    ' +
      L.tabla(
        ['Marca', 'Situación en el taller'],
        D.MARCAS.map(function (m) {
          return ['<strong>' + L.esc(m.nombre) + '</strong>', L.esc(m.nota)];
        }),
        {
          titulo: 'Marcas de caja de cambios que se trabajan',
          leyenda:
            'El dominio anterior no publicaba ninguna referencia de modelo de caja, y esta web no se inventa ninguna.',
        }
      ),
    '  </div>',
    '</section>',
  ]);

  return {
    archivo: 'marcas.html',
    titulo: 'Marcas de caja que trabajamos: ZF, GM, Aisin Warner… · Tecnicars',
    descripcion:
      'Se trabajan cajas de cambio automáticas de ZF, GM, Aisin Warner, Hydra-Matic, Allison y Jacto, con amplio stock de todas ellas en el almacén del taller.',
    prioridad: '0.8',
    contenido: contenido,
  };
}

module.exports = { construir };
