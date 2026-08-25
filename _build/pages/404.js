/*
 * Página de error 404.
 *
 * El servidor actual no tiene ErrorDocument configurado: al pedir una
 * dirección inexistente responde con la página de error por defecto de
 * Apache y, además, con un segundo error por no encontrar el documento de
 * error. Las instrucciones para activarla están en README.md.
 */

'use strict';

const { SITIO } = require('../nav.js');
const L = require('../lib.js');
const D = require('../data.js');
const M = require('../layout.js');

function construir() {
  const contenido = L.unir([
    '<section class="rotulo rotulo--error">',
    '  <div class="rotulo__interior">',
    '    <div class="rotulo__texto">',
    '      <p class="rotulo__ante">Error 404</p>',
    '      <h1 class="rotulo__titulo">Esta página<br>no existe</h1>',
    '      <p class="rotulo__entradilla">La dirección que ha seguido no corresponde a ninguna página de este sitio. Puede que el enlace fuera del sitio antiguo y haya cambiado de nombre.</p>',
    '    </div>',
    '  </div>',
    '</section>',

    '<section class="seccion" aria-labelledby="t-donde">',
    '  <div class="contenedor">',
    '    <h2 class="titular" id="t-donde">Adónde quería ir</h2>',
    '    <div class="rejilla-servicios rejilla-servicios--indice">',
    L.placaEnlace({
      href: 'servicios.html',
      titulo: 'Los servicios',
      texto: 'Reparación de cajas, convertidores, desmontaje, mantenimiento y recogida.',
      icono: 'llave',
      accion: 'Ver el índice',
      clase: 'placa-enlace--ancha',
    }),
    L.placaEnlace({
      href: 'contacto.html',
      titulo: 'Contacto',
      texto: 'Teléfono, correo, dirección y plano de acceso al Polígono Marconi.',
      icono: 'ubicacion',
      accion: 'Ver el contacto',
    }),
    L.placaEnlace({
      href: 'instalaciones.html',
      titulo: 'Instalaciones',
      texto: 'Las dos plantas del taller, la oficina y el exterior de la nave.',
      icono: 'elevador',
      accion: 'Ver las fotos',
    }),
    L.placaEnlace({
      href: 'index.html',
      titulo: 'Portada',
      texto: 'Volver al principio y empezar de nuevo.',
      icono: 'flecha',
      accion: 'Ir a la portada',
      clase: 'placa-enlace--ancha',
    }),
    '    </div>',
    '    <p class="centrado">' +
      L.enlaceTelefono(SITIO, {
        clase: 'boton boton--rojo boton--grande',
        texto: 'O llame al ' + SITIO.telefono,
        etiqueta: 'Llamar al ' + SITIO.telefono,
      }) +
      '</p>',
    '  </div>',
    '</section>',
  ]);

  return {
    archivo: '404.html',
    titulo: 'Página no encontrada · Tecnicars Cambios Automáticos',
    descripcion: 'La dirección solicitada no existe en este sitio.',
    noindex: true,
    enSitemap: false,
    contenido: contenido,
    sinCta: true,
  };
}

module.exports = { construir };
