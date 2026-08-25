/*
 * Mantenimiento del cambio automático.
 *
 * Antes era la capa «mantenimiento» de pags/servicios.html.
 */

'use strict';

const { SITIO } = require('../nav.js');
const L = require('../lib.js');
const D = require('../data.js');
const M = require('../layout.js');

function construir() {
  const servicio = D.SERVICIOS[3];

  const contenido = L.unir([
    M.heroeInterior({
      migas: [{ texto: 'Servicios', href: 'servicios.html' }, { texto: 'Mantenimiento' }],
      antetitulo: 'Con cita previa',
      titulo: 'Mantenimiento del<br>cambio automático',
      entradilla:
        'Un correcto mantenimiento en el cambio automático de su vehículo puede evitar futuras averías. De ahí la importancia de la sustitución del aceite y el filtro del cambio automático.',
      foto: {
        archivo: 'varilla-nivel-aceite.jpg',
        alt: 'Manos de un técnico comprobando la varilla del nivel de aceite del cambio en el vano motor de un vehículo.',
        pie: 'Comprobación del nivel de aceite',
      },
    }),

    '<section class="seccion" aria-labelledby="t-cita">',
    '  <div class="contenedor">',
    '    <div class="cita">',
    '      <div class="cita__texto">',
    '        <h2 class="titular" id="t-cita">Se hace mientras usted espera</h2>',
    '        <p class="parrafo parrafo--guia">A través de una <strong>cita previa</strong> le hacemos el mantenimiento de su cambio automático, mientras usted espera cómodamente en nuestras instalaciones.</p>',
    '        <p class="parrafo">Es el único trabajo del taller que funciona por cita: el resto entra por el flujo normal de la nave. Para pedirla hay una sola vía, el teléfono.</p>',
    '        <p class="cita__accion">' +
      L.enlaceTelefono(SITIO, {
        clase: 'boton boton--rojo boton--grande',
        texto: 'Pedir cita al ' + SITIO.telefono,
        etiqueta: 'Llamar al ' + SITIO.telefono + ' para pedir cita',
      }) +
      '</p>',
    '        ' +
      L.aviso(
        'El horario de apertura no aparecía publicado en ningún sitio del dominio anterior, así que esta web no lo indica. Confírmelo al llamar.'
      ),
    '      </div>',
    '      <div class="cita__lado">',
    L.placa(
      '<p class="destaque__rotulo">Qué se sustituye</p>' +
        '<ul class="destaque__lista">' +
        '<li>' +
        L.icono('gota') +
        '<span>El aceite del cambio automático</span></li>' +
        '<li>' +
        L.icono('llave') +
        '<span>El filtro del cambio automático</span></li>' +
        '</ul>' +
        '<p class="destaque__texto">Son los dos elementos que cita el taller. Cualquier otra intervención deja de ser mantenimiento y pasa a ser reparación.</p>',
      { tono: 'azul', clase: 'destaque' }
    ),
    '      </div>',
    '    </div>',
    '  </div>',
    '</section>',

    '<section class="seccion seccion--claro" aria-labelledby="t-donde">',
    '  <div class="contenedor">',
    '    <div class="prueba prueba--invertida">',
    '      <div class="prueba__foto">',
    '        ' +
      L.placaFoto(
        'oficina-recepcion.jpg',
        'Oficina de recepción con el mostrador, archivadores y una pared con diplomas enmarcados.',
        'La oficina, donde se espera'
      ),
    '      </div>',
    '      <div class="prueba__texto">',
    '        <h2 class="titular" id="t-donde">Dónde se espera</h2>',
    '        <p class="parrafo parrafo--guia">Desde nuestras oficinas gestionamos los pedidos y atendemos todas sus preguntas e informamos del estado de su vehículo.</p>',
    '        <p class="parrafo">La nave está en el Polígono Industrial Marconi, en la calle Laguna del Marquesado 10, naves 4 y 20.</p>',
    '        <a class="boton boton--azul" href="contacto.html">Cómo llegar' + L.icono('flecha') + '</a>',
    '      </div>',
    '    </div>',
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
      href: 'convertidores.html',
      titulo: 'Convertidores de par',
      texto: L.esc(D.SERVICIOS[1].resumen),
      icono: 'engranaje',
    }),
    '    </div>',
    '  </div>',
    '</section>',
  ]);

  return {
    archivo: 'mantenimiento.html',
    titulo: 'Mantenimiento del cambio automático · Tecnicars Madrid',
    descripcion:
      'Sustitución del aceite y el filtro del cambio automático con cita previa, mientras espera en nuestras instalaciones del Polígono Marconi, Madrid.',
    prioridad: '0.8',
    contenido: contenido,
    jsonLd: D.servicioJsonLd(servicio),
    cta: {
      titulo: '¿Pedimos cita para el mantenimiento?',
      texto:
        'La sustitución de aceite y filtro se hace con cita previa. Llame y le damos día y hora.',
    },
  };
}

module.exports = { construir };
