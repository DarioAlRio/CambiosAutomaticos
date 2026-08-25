/*
 * Contacto.
 *
 * Hereda pags/contactenos.html. Se conservan literales la dirección, el
 * teléfono, el fax, el correo y el plano de acceso dibujado a mano.
 *
 * El formulario NO envía nada por su cuenta: este sitio es HTML estático y no
 * tiene servidor. Lo que hace es componer un correo con los datos ya
 * escritos y abrirlo en el programa de correo del visitante. Se le dice tal
 * cual, antes de que pulse el botón. Las alternativas para convertirlo en un
 * envío real están en PENDIENTE.md.
 */

'use strict';

const { SITIO } = require('../nav.js');
const L = require('../lib.js');
const D = require('../data.js');
const M = require('../layout.js');

function campo(o) {
  const id = 'c-' + o.nombre;
  const etiqueta =
    '<label class="campo__etiqueta" for="' +
    id +
    '">' +
    L.esc(o.etiqueta) +
    (o.requerido
      ? ' <span class="campo__obligatorio" aria-hidden="true">*</span>'
      : ' <span class="campo__opcional">(opcional)</span>') +
    '</label>';

  const comunes =
    'id="' +
    id +
    '" name="' +
    o.nombre +
    '" class="campo__control"' +
    (o.requerido ? ' required' : '') +
    (o.tipo === 'tel' ? ' inputmode="tel" autocomplete="tel"' : '') +
    (o.tipo === 'email' ? ' autocomplete="email"' : '') +
    (o.nombre === 'nombre' ? ' autocomplete="name"' : '') +
    ' aria-describedby="' +
    id +
    '-error' +
    (o.ayuda ? ' ' + id + '-ayuda' : '') +
    '"';

  const control =
    o.tipo === 'textarea'
      ? '<textarea ' + comunes + ' rows="6"></textarea>'
      : '<input type="' + (o.tipo || 'text') + '" ' + comunes + '>';

  return (
    '<div class="campo" data-campo>' +
    etiqueta +
    (o.ayuda ? '<p class="campo__ayuda" id="' + id + '-ayuda">' + L.esc(o.ayuda) + '</p>' : '') +
    control +
    '<p class="campo__error" id="' + id + '-error" data-error hidden></p>' +
    '</div>'
  );
}

function construir() {
  const formulario = L.unir([
    '<form class="formulario" data-formulario novalidate>',
    '  <p class="formulario__intro">Rellene el formulario y pulse el botón: se abrirá su programa de correo con el mensaje ya redactado y dirigido al taller. Usted solo tiene que darle a enviar.</p>',
    campo({
      nombre: 'nombre',
      etiqueta: 'Su nombre',
      requerido: true,
    }),
    campo({
      nombre: 'telefono',
      etiqueta: 'Teléfono de contacto',
      tipo: 'tel',
      requerido: true,
      ayuda: 'Es la vía por la que el taller responde antes.',
    }),
    campo({
      nombre: 'vehiculo',
      etiqueta: 'Marca y modelo del vehículo',
      requerido: false,
    }),
    campo({
      nombre: 'mensaje',
      etiqueta: 'Qué le pasa al cambio',
      tipo: 'textarea',
      requerido: true,
      ayuda: 'Qué nota al conducir y desde cuándo. Cuanto más concreto, mejor puede orientarle el taller.',
    }),
    /* Trampa antispam: un campo que ninguna persona ve ni puede enfocar, y
       que los robots rellenan por costumbre. Si llega con contenido, no se
       compone ningún correo. */
    '  <div class="trampa" aria-hidden="true">',
    '    <label for="c-empresa-web">No rellene este campo</label>',
    '    <input type="text" id="c-empresa-web" name="empresa_web" tabindex="-1" autocomplete="off">',
    '  </div>',
    '  <noscript><p class="formulario__intro formulario__intro--sinjs">Su navegador tiene JavaScript desactivado, así que este formulario no puede componer el correo. Llame al ' +
      L.esc(SITIO.telefono) +
      ' o escriba a info (arroba) cambios-automaticos.com.</p></noscript>',
    '  <p class="formulario__aviso" data-formulario-estado role="status"></p>',
    '  <button type="submit" class="boton boton--rojo boton--grande boton--ancho">Preparar el correo' +
      L.icono('correo') +
      '</button>',
    '  <p class="formulario__pie">¿Prefiere hablarlo? ' +
      L.enlaceTelefono(SITIO, {
        clase: 'enlace-tel enlace-tel--linea',
        texto: 'Llame al ' + SITIO.telefono,
        icono: false,
      }) +
      '</p>',
    '</form>',
  ]);

  const contenido = L.unir([
    M.heroeInterior({
      migas: [{ texto: 'Contacto' }],
      antetitulo: 'Polígono Industrial Marconi, Madrid',
      titulo: 'Dónde estamos<br>y cómo localizarnos',
      entradilla:
        'Nuestras instalaciones se encuentran en el Polígono Industrial Marconi, calle Laguna del Marquesado 10, naves 4 y 20, Madrid.',
      foto: {
        archivo: 'nave-vista-aerea.jpg',
        alt: 'Vista aérea del edificio de Tecnicars, con la cubierta azul y los rótulos comerciales en la fachada.',
        pie: 'El edificio, desde el aire',
      },
    }),

    '<section class="seccion seccion--contacto" aria-labelledby="t-datos">',
    '  <div class="contenedor">',
    '    <h2 class="visually-hidden" id="t-datos">Datos de contacto</h2>',
    '    <div class="contacto">',

    '      <div class="contacto__datos">',
    L.placa(
      '<p class="ficha__rotulo">Teléfono</p>' +
        '<p class="ficha__dato">' +
        L.enlaceTelefono(SITIO, { clase: 'ficha__enlace', icono: false }) +
        '</p>' +
        '<p class="ficha__nota">Llámenos sin compromiso. También atendemos consultas por teléfono.</p>',
      { tono: 'azul', clase: 'ficha ficha--principal' }
    ),
    L.placa(
      '<p class="ficha__rotulo">Correo electrónico</p>' +
        '<p class="ficha__dato">' +
        L.enlaceCorreo(SITIO, { clase: 'ficha__enlace', icono: false }) +
        '</p>' +
        '<p class="ficha__nota">La dirección se escribe sola en su navegador: así no queda a la vista de los robots que recogen correos.</p>',
      { tono: 'blanco', clase: 'ficha' }
    ),
    L.placa(
      '<p class="ficha__rotulo">Dirección</p>' +
        '<address class="ficha__direccion">' +
        L.esc(SITIO.poligono) +
        '<br>' +
        L.esc(SITIO.calle) +
        '<br>' +
        L.esc(SITIO.naves) +
        '<br>' +
        L.esc(SITIO.ciudad) +
        '</address>' +
        '<p class="ficha__nota">Fax ' +
        L.esc(SITIO.fax) +
        '</p>',
      { tono: 'blanco', clase: 'ficha' }
    ),
    '      </div>',

    '      <div class="contacto__formulario">',
    '        <h3 class="titular titular--menor">Escríbanos</h3>',
    formulario,
    '      </div>',

    '    </div>',
    '  </div>',
    '</section>',

    '<section class="seccion seccion--claro" aria-labelledby="t-plano">',
    '  <div class="contenedor">',
    '    <div class="prueba">',
    '      <div class="prueba__foto">',
    '        ' +
      L.placaFoto(
        'plano-acceso.jpg',
        'Plano de acceso dibujado a mano: la nave de Tecnicars entre la calle Laguna del Marquesado y la calle de la Resina, con las salidas de la M-40, la M-45, la A-4 y la avenida de Andalucía.',
        'Plano de acceso publicado por el taller'
      ),
    '      </div>',
    '      <div class="prueba__texto">',
    '        <h2 class="titular" id="t-plano">Cómo llegar</h2>',
    '        <p class="parrafo parrafo--guia">El taller está en el Polígono Industrial Marconi, al sur de Madrid, entre la M-40 y la M-45, con acceso desde la avenida de Andalucía y la avenida Real de Pinto.</p>',
    '        <p class="parrafo">La nave hace esquina entre la calle Laguna del Marquesado y la calle de la Resina, y ocupa los números 4 y 20.</p>',
    '        ' +
      L.aviso(
        'Este plano es el que publicaba el taller, dibujado a mano. No hay mapa interactivo porque el dominio anterior no tenía ninguno y no se han publicado nunca sus coordenadas exactas.'
      ),
    '      </div>',
    '    </div>',
    '  </div>',
    '</section>',

    '<section class="seccion" id="asistencia" aria-labelledby="t-asistencia">',
    '  <div class="contenedor contenedor--estrecho">',
    '    <h2 class="titular" id="t-asistencia">Asistencia telefónica</h2>',
    '    <p class="parrafo parrafo--guia">Para cualquier aclaración, no dude en ponerse en contacto con nosotros.</p>',
    '    <p class="parrafo">Puede contactar con nosotros a través del teléfono <strong>' +
      L.esc(SITIO.telefono) +
      '</strong> o enviarnos un correo electrónico.</p>',
    '    <div class="asistencia__acciones">',
    '      ' +
      L.enlaceTelefono(SITIO, {
        clase: 'boton boton--rojo boton--grande',
        texto: SITIO.telefono,
        etiqueta: 'Llamar al ' + SITIO.telefono,
      }),
    '      ' +
      L.enlaceCorreo(SITIO, {
        clase: 'boton boton--linea boton--grande',
        texto: 'Escribir un correo',
      }),
    '    </div>',
    '  </div>',
    '</section>',

    '<section class="seccion seccion--claro" aria-labelledby="t-preguntas">',
    '  <div class="contenedor contenedor--estrecho">',
    '    <h2 class="titular" id="t-preguntas">Antes de llamar</h2>',
    '    <p class="parrafo parrafo--guia">Las dudas que más se repiten al teléfono, respondidas con lo que el taller tiene publicado.</p>',
    '    ' + L.acordeon(D.PREGUNTAS, { unico: true }),
    '  </div>',
    '</section>',
  ]);

  return {
    archivo: 'contacto.html',
    titulo: 'Contacto y cómo llegar · Tecnicars, Polígono Marconi Madrid',
    descripcion:
      'Teléfono ' +
      SITIO.telefono +
      ', fax ' +
      SITIO.fax +
      ' y dirección del taller: calle Laguna del Marquesado 10, naves 4 y 20, Polígono Industrial Marconi, Madrid.',
    prioridad: '0.9',
    contenido: contenido,
    sinCta: true,
    jsonLd: D.negocioJsonLd(),
  };
}

module.exports = { construir };
