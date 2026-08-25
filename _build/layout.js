/*
 * layout.js — el esqueleto de todas las páginas.
 *
 * Aquí viven el <head>, la cabecera con el mega-menú, el cajón lateral de
 * móvil, los héroes, la banda de llamada a la acción, el pie y la barra fija
 * inferior del móvil. Cambiar algo aquí lo cambia en las trece páginas.
 */

'use strict';

const { SITIO, NAV, PIE } = require('./nav.js');
const L = require('./lib.js');

const ANIO = new Date().getFullYear();

/*
 * Contrato de dirección. Se emite como comentario HTML en cada página para
 * que sobreviva a la compilación y cualquiera pueda leer con qué criterio se
 * tomaron las decisiones visuales.
 */
const CONTRATO = `<!--
  DIRECCIÓN DE DISEÑO — «RÓTULO DE NAVE»

  TESIS: un taller que solo abre cambios automáticos se presenta con el oficio
  de su propio letrero de fachada, no con la foto oscura de motor y las tres
  tarjetas de icono que publica todo el sector.

  MUNDO PROPIO: placas esmaltadas de doble filete sobre esmalte azul #00527a,
  letra de rótulo Archivo condensada y pesada, barra roja #e91b23 de acento,
  aluminio claro para leer. Toda fotografía va montada como placa a su tamaño
  nativo: el material del dominio no pasa de 466 px y no se amplía nunca.

  RELATO: el visitante entiende en un vistazo que aquí se repara la caja en
  vez de sustituirla, lo comprueba viendo el almacén y el banco, y llama.

  PRIMER GOLPE DE VISTA: tablero azul a todo ancho, «CAMBIOS AUTOMÁTICOS» en
  letra de rótulo, teléfono en placa roja a la izquierda, fachada real montada
  a la derecha y banda de datos de nave debajo.

  FORMA: candidata 7 de 7 de la lista ordenada; tirada ae4dd6d5, en modo
  degradado (sin retadores).
-->`;

/* ------------------------------------------------------------------- <head> */

function cabezaHtml(pagina) {
  const url = SITIO.base + '/' + (pagina.archivo === 'index.html' ? '' : pagina.archivo);
  const og = SITIO.base + '/assets/img/' + (pagina.og || 'og-tecnicars.jpg');

  return L.unir([
    '<!doctype html>',
    '<html lang="es">',
    '<head>',
    CONTRATO,
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
    '<title>' + L.esc(pagina.titulo) + '</title>',
    '<meta name="description" content="' + L.esc(pagina.descripcion) + '">',
    pagina.noindex
      ? '<meta name="robots" content="noindex, follow">'
      : '<link rel="canonical" href="' + L.esc(url) + '">',
    '',
    '<meta property="og:type" content="website">',
    '<meta property="og:locale" content="es_ES">',
    '<meta property="og:site_name" content="' + L.esc(SITIO.nombreCompleto) + '">',
    '<meta property="og:title" content="' + L.esc(pagina.titulo) + '">',
    '<meta property="og:description" content="' + L.esc(pagina.descripcion) + '">',
    '<meta property="og:url" content="' + L.esc(url) + '">',
    '<meta property="og:image" content="' + L.esc(og) + '">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="Logotipo de Tecnicars Cambios Automáticos junto a la estantería del almacén de cajas de cambio.">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' + L.esc(pagina.titulo) + '">',
    '<meta name="twitter:description" content="' + L.esc(pagina.descripcion) + '">',
    '<meta name="twitter:image" content="' + L.esc(og) + '">',
    '',
    '<meta name="theme-color" content="#00527a">',
    '<link rel="icon" href="favicon.svg" type="image/svg+xml">',
    '<link rel="icon" href="favicon-32.png" sizes="32x32" type="image/png">',
    '<link rel="apple-touch-icon" href="apple-touch-icon.png">',
    '',
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&amp;family=Asap:ital,wght@0,400..700;1,400..600&amp;display=swap">',
    '<link rel="stylesheet" href="assets/css/site.css">',
    '',
    '<!-- Marca el documento como «con JavaScript» antes de que pinte nada, para',
    '     que las animaciones de entrada solo existan si van a poder ejecutarse.',
    '     Sin esta clase, todo el contenido se ve de entrada, sin animación. -->',
    '<script>document.documentElement.className+=" js";</script>',
    pagina.jsonLd ? '\n<script type="application/ld+json">' + JSON.stringify(pagina.jsonLd) + '</script>' : '',
    '</head>',
  ]);
}

/* ----------------------------------------------------------------- cabecera */

function marca(nivel) {
  const enlace = nivel === 'inicio' ? '' : ' href="index.html"';
  const etiqueta = nivel === 'inicio' ? 'span' : 'a';
  return (
    '<' +
    etiqueta +
    ' class="marca"' +
    enlace +
    (nivel === 'inicio' ? ' aria-current="page"' : '') +
    '>' +
    L.imagen('logotipo-tecnicars.png', 'Tecnicars, cambios automáticos', {
      clase: 'marca__logo',
      prioridad: true,
    }) +
    '<span class="visually-hidden">Tecnicars Cambios Automáticos, ir a la portada</span>' +
    '</' +
    etiqueta +
    '>'
  );
}

function megaMenu(item, indice, activa) {
  const id = 'mega-' + indice;
  const columnas = item.columnas
    .map(function (col) {
      return (
        '<div class="mega__columna">' +
        '<p class="mega__rotulo">' +
        L.esc(col.titulo) +
        '</p>' +
        '<ul class="mega__lista">' +
        col.enlaces
          .map(function (e) {
            const esActiva = e.href === activa;
            return (
              '<li><a class="mega__enlace" href="' +
              L.esc(e.href) +
              '"' +
              (esActiva ? ' aria-current="page"' : '') +
              '>' +
              '<span class="mega__enlace-texto">' +
              L.esc(e.texto) +
              '</span>' +
              '<span class="mega__enlace-desc">' +
              L.esc(e.desc) +
              '</span></a></li>'
            );
          })
          .join('') +
        '</ul></div>'
      );
    })
    .join('');

  const destacado = item.destacado
    ? '<div class="mega__destacado">' +
      L.imagen(item.destacado.imagen, item.destacado.alt, { clase: 'mega__img' }) +
      '<p class="mega__destacado-titulo">' +
      L.esc(item.destacado.titulo) +
      '</p>' +
      '<p class="mega__destacado-texto">' +
      L.esc(item.destacado.texto) +
      '</p></div>'
    : '';

  /* La familia entera se marca como activa cuando la página abierta cuelga
     de ella, igual que un rótulo se ilumina al llegar a su nave. */
  const familiaActiva = item.columnas.some(function (c) {
    return c.enlaces.some(function (e) {
      return e.href === activa;
    });
  });

  return (
    '<li class="nav__item nav__item--mega" data-mega>' +
    '<button type="button" class="nav__enlace nav__enlace--boton" aria-expanded="false" aria-controls="' +
    id +
    '"' +
    (familiaActiva ? ' data-familia-activa="true"' : '') +
    '>' +
    L.esc(item.texto) +
    L.icono('chevron', 'nav__chevron') +
    '</button>' +
    '<div class="mega" id="' +
    id +
    '" hidden>' +
    '<div class="mega__interior">' +
    columnas +
    destacado +
    '</div></div></li>'
  );
}

function cabecera(pagina) {
  const activa = pagina.archivo;

  const items = NAV.map(function (item, i) {
    if (item.tipo === 'mega') return megaMenu(item, i, activa);
    return (
      '<li class="nav__item"><a class="nav__enlace" href="' +
      L.esc(item.href) +
      '"' +
      (item.href === activa ? ' aria-current="page"' : '') +
      '>' +
      L.esc(item.texto) +
      '</a></li>'
    );
  }).join('');

  return L.unir([
    '<a class="salto" href="#contenido">Saltar al contenido</a>',
    '<header class="cabecera" data-cabecera>',
    '  <div class="cabecera__interior">',
    '    ' + marca(pagina.archivo === 'index.html' ? 'inicio' : ''),
    '    <nav class="nav" aria-label="Navegación principal">',
    '      <ul class="nav__lista">' + items + '</ul>',
    '    </nav>',
    '    <div class="cabecera__acciones">',
    '      ' +
      L.enlaceTelefono(SITIO, {
        clase: 'placa-tel',
        etiqueta: 'Llamar al ' + SITIO.telefono,
      }),
    '      <button type="button" class="cajon-boton" aria-expanded="false" aria-controls="cajon" data-abrir-cajon>' +
      L.icono('menu') +
      '<span>Menú</span></button>',
    '    </div>',
    '  </div>',
    navSinJs(activa),
    '</header>',
    cajon(activa),
  ]);
}

/*
 * Navegación de respaldo. El mega-menú y el cajón lateral necesitan
 * JavaScript para abrirse; sin él, sus enlaces quedarían fuera de alcance
 * desde la cabecera. Este bloque, que solo existe cuando no hay JavaScript,
 * pone todas las páginas del sitio a un clic. El pie ya las lleva también,
 * pero nadie debería tener que bajar hasta el pie para navegar.
 */
function navSinJs(activa) {
  const enlaces = [];
  NAV.forEach(function (item) {
    if (item.tipo !== 'mega') {
      enlaces.push({ href: item.href, texto: item.texto });
      return;
    }
    item.columnas.forEach(function (col) {
      col.enlaces.forEach(function (e) {
        enlaces.push({ href: e.href, texto: e.texto });
      });
    });
  });

  return (
    '    <noscript><nav class="nav-sin-js" aria-label="Navegación completa">' +
    '<ul>' +
    enlaces
      .map(function (e) {
        return (
          '<li><a href="' +
          L.esc(e.href) +
          '"' +
          (e.href === activa ? ' aria-current="page"' : '') +
          '>' +
          L.esc(e.texto) +
          '</a></li>'
        );
      })
      .join('') +
    '</ul></nav></noscript>'
  );
}

/* --------------------------------------------------- cajón lateral de móvil */

function cajon(activa) {
  const bloques = NAV.map(function (item) {
    if (item.tipo !== 'mega') {
      return (
        '<a class="cajon__directo" href="' +
        L.esc(item.href) +
        '"' +
        (item.href === activa ? ' aria-current="page"' : '') +
        '>' +
        L.esc(item.texto) +
        L.icono('flecha') +
        '</a>'
      );
    }
    const enlaces = []
      .concat.apply(
        [],
        item.columnas.map(function (c) {
          return c.enlaces;
        })
      )
      .map(function (e) {
        return (
          '<li><a href="' +
          L.esc(e.href) +
          '"' +
          (e.href === activa ? ' aria-current="page"' : '') +
          '>' +
          L.esc(e.texto) +
          '</a></li>'
        );
      })
      .join('');
    return L.acordeon(
      [
        {
          titulo: item.texto,
          cuerpo: '<ul class="cajon__lista">' + enlaces + '</ul>',
        },
      ],
      { clase: 'cajon__acordeon' }
    );
  }).join('');

  return L.unir([
    '<div class="cajon-velo" data-velo hidden></div>',
    '<div class="cajon" id="cajon" hidden>',
    '  <div class="cajon__cabeza">',
    '    <p class="cajon__rotulo">Menú</p>',
    '    <button type="button" class="cajon__cerrar" data-cerrar-cajon>' +
      L.icono('cerrar') +
      '<span class="visually-hidden">Cerrar el menú</span></button>',
    '  </div>',
    '  <nav class="cajon__nav" aria-label="Navegación del menú lateral">',
    '    ' + bloques,
    '  </nav>',
    '  <div class="cajon__contacto">',
    '    ' +
      L.enlaceTelefono(SITIO, {
        clase: 'boton boton--rojo boton--ancho',
        texto: 'Llamar al ' + SITIO.telefono,
      }),
    '    ' +
      L.enlaceCorreo(SITIO, {
        clase: 'boton boton--linea boton--ancho',
        texto: 'Escribir un correo',
      }),
    '    <p class="cajon__direccion">' +
      L.esc(SITIO.calle) +
      ', ' +
      L.esc(SITIO.naves) +
      '<br>' +
      L.esc(SITIO.poligono) +
      ', ' +
      L.esc(SITIO.ciudad) +
      '</p>',
    '  </div>',
    '</div>',
  ]);
}

/* ------------------------------------------------------------------ héroes */

/*
 * Héroe de portada: el tablero de rótulo. Es la única pieza del sitio que
 * ocupa la pantalla entera, y está construida con tipografía y color, no con
 * una fotografía a sangre (que no existe: la mayor mide 466 px).
 */
function heroePortada() {
  return L.unir([
    '<section class="tablero" aria-labelledby="tablero-titulo">',
    '  <div class="tablero__interior">',
    '    <div class="tablero__texto">',
    '      <p class="tablero__marca">Tecnicars</p>',
    '      <h1 class="tablero__titulo" id="tablero-titulo">Cambios<br>automáticos</h1>',
    '      <p class="tablero__bajada">Reparación y reconstrucción de cajas de cambio automáticas y convertidores de par. Es lo único que hacemos, y lo hacemos desde ' +
      SITIO.desde +
      ' en el Polígono Marconi de Madrid.</p>',
    '      <div class="tablero__acciones">',
    '        ' +
      L.enlaceTelefono(SITIO, {
        clase: 'boton boton--rojo boton--grande',
        texto: SITIO.telefono,
        etiqueta: 'Llamar al ' + SITIO.telefono,
      }),
    '        <a class="boton boton--claro boton--grande" href="servicios.html">Ver los servicios' +
      L.icono('flecha') +
      '</a>',
    '      </div>',
    '      <p class="tablero__nota">Llámenos sin compromiso. Atendemos consultas por teléfono.</p>',
    '    </div>',
    '    <div class="tablero__placa">',
    '      ' +
      L.placaFoto(
        'nave-exterior.jpg',
        'Fachada de la nave de Tecnicars en el Polígono Industrial Marconi, con el rótulo azul y rojo de la empresa sobre la entrada.',
        'La nave, en el Polígono Marconi',
        { prioridad: true }
      ),
    '    </div>',
    '  </div>',
    '  <div class="tablero__banda">',
    '    <ul class="banda-datos">',
    '      <li><span class="banda-datos__clave">Dónde</span><span class="banda-datos__valor">' +
      L.esc(SITIO.poligono) +
      ', ' +
      L.esc(SITIO.ciudad) +
      '</span></li>',
    '      <li><span class="banda-datos__clave">Naves</span><span class="banda-datos__valor">4 y 20, calle Laguna del Marquesado 10</span></li>',
    '      <li><span class="banda-datos__clave">Garantía</span><span class="banda-datos__valor">12 meses en todos los trabajos</span></li>',
    '      <li><span class="banda-datos__clave">Alcance</span><span class="banda-datos__valor">Recogida y entrega en toda la península</span></li>',
    '    </ul>',
    '  </div>',
    '</section>',
  ]);
}

/*
 * Héroe de página interior: placa de rótulo con miga de pan, título y
 * entradilla. Admite una fotografía montada al lado.
 */
function heroeInterior(o) {
  const migas =
    '<nav class="migas" aria-label="Migas de pan"><ol>' +
    '<li><a href="index.html">Inicio</a></li>' +
    (o.migas || [])
      .map(function (m) {
        return m.href
          ? '<li><a href="' + L.esc(m.href) + '">' + L.esc(m.texto) + '</a></li>'
          : '<li><span aria-current="page">' + L.esc(m.texto) + '</span></li>';
      })
      .join('') +
    '</ol></nav>';

  return L.unir([
    '<section class="rotulo' + (o.foto ? ' rotulo--con-foto' : '') + '">',
    '  <div class="rotulo__interior">',
    '    <div class="rotulo__texto">',
    '      ' + migas,
    o.antetitulo ? '      <p class="rotulo__ante">' + L.esc(o.antetitulo) + '</p>' : '',
    '      <h1 class="rotulo__titulo">' + o.titulo + '</h1>',
    o.entradilla ? '      <p class="rotulo__entradilla">' + o.entradilla + '</p>' : '',
    '    </div>',
    o.foto
      ? '    <div class="rotulo__foto">' +
        L.placaFoto(o.foto.archivo, o.foto.alt, o.foto.pie, { prioridad: true }) +
        '</div>'
      : '',
    '  </div>',
    '</section>',
  ]);
}

/* ------------------------------------------------------------- banda de CTA */

function bandaCta(o) {
  const op = o || {};
  return L.unir([
    '<section class="cta" aria-labelledby="cta-titulo">',
    '  <div class="cta__interior">',
    '    <div class="cta__texto">',
    '      <h2 class="cta__titulo" id="cta-titulo">' +
      (op.titulo || '¿Su cambio automático da problemas?') +
      '</h2>',
    '      <p class="cta__bajada">' +
      (op.texto ||
        'Cuéntenos qué hace el coche y desde cuándo. La consulta por teléfono no cuesta nada y le diremos si es un trabajo nuestro.') +
      '</p>',
    '    </div>',
    '    <div class="cta__acciones">',
    '      ' +
      L.enlaceTelefono(SITIO, {
        clase: 'boton boton--rojo boton--grande',
        texto: SITIO.telefono,
        etiqueta: 'Llamar al ' + SITIO.telefono,
      }),
    '      <a class="boton boton--linea-claro boton--grande" href="contacto.html">Escribir o venir' +
      L.icono('flecha') +
      '</a>',
    '    </div>',
    '  </div>',
    '</section>',
  ]);
}

/* ---------------------------------------------------------------------- pie */

function pie() {
  const columnas = PIE.map(function (c) {
    return (
      '<div class="pie__columna">' +
      '<p class="pie__rotulo">' +
      L.esc(c.titulo) +
      '</p><ul>' +
      c.enlaces
        .map(function (e) {
          return '<li><a href="' + L.esc(e.href) + '">' + L.esc(e.texto) + '</a></li>';
        })
        .join('') +
      '</ul></div>'
    );
  }).join('');

  return L.unir([
    '<footer class="pie">',
    '  <div class="pie__interior">',
    '    <div class="pie__marca">',
    '      <div class="pie__placa">' +
      L.imagen('logotipo-tecnicars.png', 'Tecnicars, cambios automáticos', {
        clase: 'pie__logo',
      }) +
      '</div>',
    '      <p class="pie__lema">Reparación y reconstrucción de cajas de cambio automáticas y convertidores de par.</p>',
    '    </div>',
    '    ' + columnas,
    '    <div class="pie__columna pie__columna--contacto">',
    '      <p class="pie__rotulo">Dónde y cómo</p>',
    '      <address class="pie__direccion">',
    '        ' + L.esc(SITIO.poligono) + '<br>',
    '        ' + L.esc(SITIO.calle) + '<br>',
    '        ' + L.esc(SITIO.naves) + ' &middot; ' + L.esc(SITIO.ciudad) + '<br>',
    '      </address>',
    '      <ul class="pie__contacto">',
    '        <li>' + L.enlaceTelefono(SITIO, {}) + '</li>',
    '        <li>' + L.enlaceCorreo(SITIO, {}) + '</li>',
    '        <li class="pie__fax">' + L.icono('fax') + '<span>Fax ' + L.esc(SITIO.fax) + '</span></li>',
    '      </ul>',
    '    </div>',
    '  </div>',
    '  <div class="pie__legal">',
    '    <p>&copy; ' + ANIO + ' ' + L.esc(SITIO.nombre) + '. Todos los derechos reservados.</p>',
    '    <p><a href="index.html">Inicio</a> &middot; <a href="contacto.html">Contacto</a> &middot; <a href="servicios.html">Servicios</a></p>',
    '  </div>',
    '</footer>',
  ]);
}

/* ------------------------------------------------- barra fija de móvil */

/*
 * En un negocio local el móvil es el caso principal: alguien de pie en otro
 * taller, con una mano ocupada. Estas tres acciones no se pierden nunca de
 * vista. Se reserva el hueco del notch con env(safe-area-inset-bottom).
 */
function barraMovil() {
  return L.unir([
    '<div class="barra-movil" role="group" aria-label="Acciones rápidas">',
    '  ' +
      L.enlaceTelefono(SITIO, {
        clase: 'barra-movil__accion barra-movil__accion--principal',
        texto: 'Llamar',
        etiqueta: 'Llamar al ' + SITIO.telefono,
      }),
    '  ' +
      L.enlaceCorreo(SITIO, {
        clase: 'barra-movil__accion',
        texto: 'Correo',
      }),
    '  <a class="barra-movil__accion" href="contacto.html">' +
      L.icono('ubicacion') +
      '<span>Cómo llegar</span></a>',
    '</div>',
  ]);
}

/* -------------------------------------------------------------- documento */

function pagina(p) {
  return L.unir([
    cabezaHtml(p),
    '<body class="pagina pagina--' + (p.cuerpoClase || 'interior') + '">',
    cabecera(p),
    '<main id="contenido">',
    p.contenido,
    '</main>',
    p.sinCta ? '' : bandaCta(p.cta),
    pie(),
    barraMovil(),
    '<script src="assets/js/site.js" defer></script>',
    '</body>',
    '</html>',
    '',
  ]);
}

module.exports = {
  pagina,
  heroePortada,
  heroeInterior,
  bandaCta,
  ANIO,
};
