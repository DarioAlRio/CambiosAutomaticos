/*
 * Cajas de cambio automáticas.
 *
 * Antes era la capa «reparacion» dentro de pags/servicios.html, que se
 * mostraba y ocultaba con JavaScript y no tenía dirección web propia.
 */

'use strict';

const L = require('../lib.js');
const D = require('../data.js');
const M = require('../layout.js');

function construir() {
  const servicio = D.SERVICIOS[0];

  const contenido = L.unir([
    M.heroeInterior({
      migas: [{ texto: 'Servicios', href: 'servicios.html' }, { texto: 'Cajas de cambio automáticas' }],
      antetitulo: 'Reparación y reconstrucción',
      titulo: 'Cajas de cambio<br>automáticas',
      entradilla:
        'Reparación y reconstrucción de cajas de cambios automáticas de todas las marcas. Se abre la caja, se diagnostica y se sustituye únicamente lo que está gastado.',
      foto: {
        archivo: 'caja-abierta-banco.jpg',
        alt: 'Carcasa de una caja de cambios automática abierta sobre el banco, con la herramienta preparada al lado.',
        pie: 'Caja abierta en el banco de trabajo',
      },
    }),

    '<section class="seccion" aria-labelledby="t-marcas">',
    '  <div class="contenedor">',
    '    <div class="dos-columnas">',
    '      <div class="dos-columnas__principal">',
    '        <h2 class="titular" id="t-marcas">Las marcas que se trabajan</h2>',
    '        <p class="parrafo parrafo--guia">Algunas de las marcas que trabajamos: <strong>ZF, GM, Aisin Warner, Hydra-Matic, Allison, Jacto</strong>. Contando con amplio stock de todas ellas.</p>',
    '        <p class="parrafo">El stock está en el almacén de la planta superior, en la misma sala donde se reconstruye. Si su caja es de una marca que no aparece en esa lista, lo más rápido es preguntarlo por teléfono antes de mover el vehículo.</p>',
    '      </div>',
    '      <aside class="dos-columnas__lado">',
    L.placa(
      '<p class="destaque__rotulo">La garantía</p>' +
        '<p class="destaque__cifra">12 meses</p>' +
        '<p class="destaque__texto">Todos nuestros trabajos tienen una garantía de 12 meses, utilizando primeras marcas en todos los componentes sustituidos.</p>',
      { tono: 'azul', clase: 'destaque' }
    ),
    '      </aside>',
    '    </div>',
    '    ' +
      L.tabla(
        ['Marca', 'Situación en el taller'],
        D.MARCAS.map(function (m) {
          return ['<strong>' + L.esc(m.nombre) + '</strong>', L.esc(m.nota)];
        }),
        {
          titulo: 'Marcas de caja de cambios que se trabajan',
          leyenda:
            'Listado literal del taller. No hay referencias de modelo publicadas: consúltelas por teléfono.',
        }
      ),
    '  </div>',
    '</section>',

    '<section class="seccion seccion--claro" aria-labelledby="t-proceso">',
    '  <div class="contenedor">',
    '    <div class="cabeza-seccion">',
    '      <h2 class="titular" id="t-proceso">Reparar no es sustituir</h2>',
    '      <p class="parrafo parrafo--guia">La diferencia entre este taller y uno general está en lo que ocurre cuando la caja se abre.</p>',
    '    </div>',
    '    <div class="comparativa">',
    L.placa(
      '<p class="comparativa__rotulo">Lo habitual</p>' +
        '<h3 class="comparativa__titulo">Sustituir el conjunto</h3>' +
        '<p class="comparativa__texto">Un taller que no abre cambios automáticos solo puede ofrecer el cambio del grupo completo, con el precio de una unidad entera y sin saber qué pieza falló.</p>',
      { tono: 'claro', clase: 'comparativa__lado' }
    ),
    L.placa(
      '<p class="comparativa__rotulo">Aquí</p>' +
        '<h3 class="comparativa__titulo">Abrir, reconstruir y montar</h3>' +
        '<p class="comparativa__texto">La caja se desmonta en el banco de la planta superior y se reconstruye sustituyendo los componentes gastados por recambios originales de primeras marcas. La reposición en el vehículo se hace en la misma nave.</p>',
      { tono: 'azul', clase: 'comparativa__lado comparativa__lado--nuestro' }
    ),
    '    </div>',
    '  </div>',
    '</section>',

    '<section class="seccion" aria-labelledby="t-fotos">',
    '  <div class="contenedor">',
    '    <h2 class="titular" id="t-fotos">El trabajo, en el banco</h2>',
    '    ' + L.galeria(D.GALERIA_PIEZAS, { clase: 'galeria--cuatro' }),
    '  </div>',
    '</section>',

    '<section class="seccion seccion--siguiente" aria-labelledby="t-siguiente">',
    '  <div class="contenedor">',
    '    <h2 class="titular" id="t-siguiente">Continúa por aquí</h2>',
    '    <div class="rejilla-servicios rejilla-servicios--pareja">',
    L.placaEnlace({
      href: 'convertidores.html',
      titulo: 'Convertidores de par',
      texto: L.esc(D.SERVICIOS[1].resumen),
      icono: 'engranaje',
    }),
    L.placaEnlace({
      href: 'desmontaje-y-montaje.html',
      titulo: 'Desmontaje y montaje',
      texto: L.esc(D.SERVICIOS[2].resumen),
      icono: 'elevador',
    }),
    '    </div>',
    '  </div>',
    '</section>',
  ]);

  return {
    archivo: 'cajas-de-cambio.html',
    titulo: 'Reparación de cajas de cambio automáticas · Tecnicars Madrid',
    descripcion:
      'Reparación y reconstrucción de cajas automáticas de todas las marcas: ZF, GM, Aisin Warner, Hydra-Matic, Allison y Jacto. Garantía de 12 meses.',
    prioridad: '0.9',
    contenido: contenido,
    jsonLd: D.servicioJsonLd(servicio),
  };
}

module.exports = { construir };
