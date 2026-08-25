/*
 * La empresa.
 *
 * Hereda el contenido de la antigua portada (index.html), que era la página
 * «La empresa». El texto institucional se conserva; solo se ha reescrito la
 * antigüedad, porque «lleva 12 años en el sector» estaba escrito en 2007.
 */

'use strict';

const { SITIO } = require('../nav.js');
const L = require('../lib.js');
const D = require('../data.js');
const M = require('../layout.js');

function construir() {
  const contenido = L.unir([
    M.heroeInterior({
      migas: [{ texto: 'El taller' }, { texto: 'La empresa' }],
      antetitulo: 'Desde ' + SITIO.desde,
      titulo: 'Una empresa que solo<br>hace cambios automáticos',
      entradilla:
        'Somos una empresa del sector de los cambios automáticos, dedicada y especializada únicamente a la reparación y reconstrucción de cajas de cambios automáticas de vehículos, así como de convertidores de par o hidráulicos.',
      foto: {
        archivo: 'rotulo-fachada.jpg',
        alt: 'Rótulo de Tecnicars Cambios Automáticos sobre la marquesina de la nave, visto desde abajo.',
        pie: 'El rótulo de la nave',
      },
    }),

    '<section class="seccion" aria-labelledby="t-diferencia">',
    '  <div class="contenedor">',
    '    <div class="dos-columnas">',
    '      <div class="dos-columnas__principal">',
    '        <h2 class="titular" id="t-diferencia">Cómo se trabaja</h2>',
    '        <p class="parrafo parrafo--guia">Dentro del sector nos diferenciamos por nuestro alto grado de responsabilidad y profesionalidad en el desarrollo de nuestro trabajo. Disponemos de un gran equipo de profesionales con una alta formación y especialización en su trabajo.</p>',
    '        <p class="parrafo">Utilizamos recambios originales de primeras marcas y contamos con los últimos avances en el campo.</p>',
    '        <p class="parrafo">Contamos con unas amplias instalaciones dotadas con la última tecnología y en las que se cumplen todas las medidas de seguridad para nuestros técnicos.</p>',
    '      </div>',
    '      <aside class="dos-columnas__lado">',
    L.placa(
      '<p class="destaque__rotulo">La especialidad</p>' +
        '<p class="destaque__frase">Únicamente cambios automáticos y convertidores de par.</p>' +
        '<p class="destaque__texto">La palabra «únicamente» es del propio taller. No es un taller general que además toca automáticos.</p>',
      { tono: 'azul', clase: 'destaque' }
    ),
    '      </aside>',
    '    </div>',
    '  </div>',
    '</section>',

    '<section class="seccion seccion--claro" aria-labelledby="t-nave">',
    '  <div class="contenedor">',
    '    <div class="prueba prueba--invertida">',
    '      <div class="prueba__foto">',
    '        ' +
      L.placaFoto(
        'banco-trabajo-planta-alta.jpg',
        'Dos técnicos trabajando en la planta superior sobre carcasas de cambio automático desmontadas.',
        'El equipo, en el banco de la planta superior'
      ),
    '      </div>',
    '      <div class="prueba__texto">',
    '        <h2 class="titular" id="t-nave">Un edificio pensado como proceso</h2>',
    '        <p class="parrafo parrafo--guia">El taller consta de dos plantas, y la distribución no es casual: abajo se queda el vehículo, arriba se trabaja la caja, y el almacén de recambios está en la misma sala que el banco.</p>',
    '        <p class="parrafo">El edificio es de construcción reciente y la nave ocupa los números 4 y 20 de la calle Laguna del Marquesado, en el Polígono Industrial Marconi de Madrid.</p>',
    '        <a class="boton boton--azul" href="instalaciones.html">Recorrer las instalaciones' +
      L.icono('flecha') +
      '</a>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</section>',

    '<section class="seccion seccion--azul" aria-labelledby="t-hechos">',
    '  <div class="contenedor">',
    '    <h2 class="titular titular--claro" id="t-hechos">Los hechos comprobables</h2>',
    '    <p class="parrafo parrafo--claro parrafo--guia">Todo lo que afirma esta web sale del propio taller. Estos son los datos concretos.</p>',
    '    <div class="cifras cifras--claro">',
    L.cifra('12', ' meses', 'De garantía en todos los trabajos'),
    L.cifra('6', '', 'Marcas de caja con stock propio'),
    L.cifra('2', '', 'Plantas de taller en la misma nave'),
    L.cifra('5', '', 'Elevadores para vehículo'),
    '    </div>',
    '    ' +
      L.aviso(
        'El año de inicio, ' +
          SITIO.desde +
          ', se deduce del texto del sitio anterior, que en 2007 decía «lleva 12 años en el sector». Conviene confirmarlo antes de publicar.',
        { clase: 'aviso--claro' }
      ),
    '  </div>',
    '</section>',

    '<section class="seccion seccion--siguiente" aria-labelledby="t-siguiente">',
    '  <div class="contenedor">',
    '    <h2 class="titular" id="t-siguiente">Continúa por aquí</h2>',
    '    <div class="rejilla-servicios rejilla-servicios--pareja">',
    L.placaEnlace({
      href: 'servicios.html',
      titulo: 'Los seis servicios',
      texto: 'Reparación, convertidores, desmontaje, mantenimiento, recogida y asistencia.',
      icono: 'llave',
      accion: 'Ver el índice',
    }),
    L.placaEnlace({
      href: 'instalaciones.html',
      titulo: 'Instalaciones',
      texto: 'Las dos plantas, la oficina y el exterior, en fotografías del propio taller.',
      icono: 'elevador',
      accion: 'Ver las fotos',
    }),
    '    </div>',
    '  </div>',
    '</section>',
  ]);

  return {
    archivo: 'empresa.html',
    titulo: 'La empresa · Tecnicars Cambios Automáticos, Madrid',
    descripcion:
      'Empresa dedicada únicamente a la reparación y reconstrucción de cajas de cambio automáticas y convertidores de par, en el Polígono Marconi de Madrid.',
    prioridad: '0.8',
    contenido: contenido,
  };
}

module.exports = { construir };
