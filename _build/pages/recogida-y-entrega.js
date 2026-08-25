/*
 * Recogida y entrega a domicilio.
 *
 * Antes era la capa «recogida» de pags/servicios.html.
 */

'use strict';

const { SITIO } = require('../nav.js');
const L = require('../lib.js');
const D = require('../data.js');
const M = require('../layout.js');

const MEDIOS = [
  {
    icono: 'camion',
    titulo: 'Flota propia de vehículos',
    texto: 'El taller dispone de sus propios vehículos para mover cajas y piezas.',
  },
  {
    icono: 'caja',
    titulo: 'Empresa de transporte',
    texto: 'Para los envíos que no cubre la flota propia.',
  },
  {
    icono: 'elevador',
    titulo: 'Servicio de grúa',
    texto: 'Para el vehículo que no puede moverse por su propio pie.',
  },
];

function construir() {
  const servicio = D.SERVICIOS[4];

  const contenido = L.unir([
    M.heroeInterior({
      migas: [{ texto: 'Recogida y entrega' }],
      antetitulo: 'En toda la península',
      titulo: 'Recogida y entrega<br>a domicilio',
      entradilla:
        'Recogida y entrega a domicilio en toda la península. Disponemos de nuestra propia flota de vehículos, empresa de transporte y servicio de grúa.',
      foto: {
        archivo: 'nave-fachada-lateral.jpg',
        alt: 'Esquina del edificio de Tecnicars vista desde la calle, con un descapotable rojo aparcado delante.',
        pie: 'Salida y entrada de vehículos',
      },
    }),

    '<section class="seccion" aria-labelledby="t-medios">',
    '  <div class="contenedor">',
    '    <div class="cabeza-seccion">',
    '      <h2 class="titular" id="t-medios">Con qué medios</h2>',
    '      <p class="parrafo parrafo--guia">Estar fuera de Madrid no descarta el trabajo. Estos son los tres medios de los que dispone el taller, tal como los describe.</p>',
    '    </div>',
    '    <ul class="medios">',
    MEDIOS.map(function (m) {
      return (
        '<li class="medios__item">' +
        '<span class="medios__ico">' +
        L.icono(m.icono) +
        '</span>' +
        '<h3 class="medios__titulo">' +
        L.esc(m.titulo) +
        '</h3>' +
        '<p class="medios__texto">' +
        L.esc(m.texto) +
        '</p></li>'
      );
    }).join(''),
    '    </ul>',
    '  </div>',
    '</section>',

    '<section class="seccion seccion--azul" aria-labelledby="t-como">',
    '  <div class="contenedor contenedor--estrecho">',
    '    <h2 class="titular titular--claro" id="t-como">Cómo se organiza una recogida</h2>',
    '    <p class="parrafo parrafo--claro parrafo--guia">Por teléfono. No hay formulario de recogida ni tarifa publicada: cada caso depende de dónde esté el vehículo y de si viaja el coche entero o solo la caja.</p>',
    '    <p class="parrafo parrafo--claro">Al llamar conviene tener a mano la marca y el modelo del vehículo, qué está haciendo el cambio y desde cuándo, y la población donde está parado.</p>',
    '    <p class="cita__accion">' +
      L.enlaceTelefono(SITIO, {
        clase: 'boton boton--rojo boton--grande',
        texto: 'Llamar al ' + SITIO.telefono,
        etiqueta: 'Llamar al ' + SITIO.telefono,
      }) +
      '</p>',
    '    ' +
      L.aviso(
        'Ni el precio de la recogida ni el plazo de entrega aparecían publicados en el dominio anterior, y esta web no los inventa. Se acuerdan por teléfono.',
        { clase: 'aviso--claro' }
      ),
    '  </div>',
    '</section>',

    '<section class="seccion seccion--siguiente" aria-labelledby="t-siguiente">',
    '  <div class="contenedor">',
    '    <h2 class="titular" id="t-siguiente">Continúa por aquí</h2>',
    '    <div class="rejilla-servicios rejilla-servicios--pareja">',
    L.placaEnlace({
      href: 'desmontaje-y-montaje.html',
      titulo: 'Desmontaje y montaje',
      texto: L.esc(D.SERVICIOS[2].resumen),
      icono: 'elevador',
    }),
    L.placaEnlace({
      href: 'contacto.html',
      titulo: 'Contacto y ubicación',
      texto: 'Teléfono, fax, correo y el plano de acceso al Polígono Industrial Marconi.',
      icono: 'ubicacion',
      accion: 'Ver el contacto',
    }),
    '    </div>',
    '  </div>',
    '</section>',
  ]);

  return {
    archivo: 'recogida-y-entrega.html',
    titulo: 'Recogida y entrega a domicilio en toda la península · Tecnicars',
    descripcion:
      'Recogida y entrega a domicilio de vehículos y cajas de cambio en toda la península, con flota propia, empresa de transporte y servicio de grúa.',
    prioridad: '0.8',
    contenido: contenido,
    jsonLd: D.servicioJsonLd(servicio),
  };
}

module.exports = { construir };
