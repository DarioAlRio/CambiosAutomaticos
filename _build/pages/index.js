/*
 * Portada.
 *
 * Corresponde a la antigua http://www.cambios-automaticos.com/index.html,
 * que era la página «La empresa». Aquí la portada es una portada de verdad
 * y el texto institucional se ha movido a empresa.html.
 */

'use strict';

const { SITIO } = require('../nav.js');
const L = require('../lib.js');
const D = require('../data.js');
const M = require('../layout.js');

function construir() {
  const servicios = D.SERVICIOS.filter(function (s) {
    return s.id !== 'asistencia';
  });

  const contenido = L.unir([
    M.heroePortada(),

    /* ---------------------------------------------- la especialidad */
    '<section class="seccion seccion--especialidad" aria-labelledby="t-especialidad">',
    '  <div class="contenedor">',
    '    <div class="dos-columnas">',
    '      <div class="dos-columnas__principal">',
    '        <h2 class="titular" id="t-especialidad">Aquí solo se abren cambios automáticos</h2>',
    '        <p class="parrafo parrafo--guia">Dentro del sector nos diferenciamos por nuestro alto grado de responsabilidad y profesionalidad en el desarrollo de nuestro trabajo. Disponemos de un gran equipo de profesionales con una alta formación y especialización en su trabajo.</p>',
    '        <p class="parrafo">Utilizamos recambios originales de primeras marcas y contamos con los últimos avances en el campo. Cuando un taller general dice que la caja «hay que cambiarla entera», casi siempre quiere decir que no puede abrirla. Nosotros la abrimos: se repara y se reconstruye, y solo se sustituye lo que está gastado.</p>',
    '      </div>',
    '      <aside class="dos-columnas__lado">',
    L.placa(
      '<p class="destaque__rotulo">La garantía</p>' +
        '<p class="destaque__cifra">12 meses</p>' +
        '<p class="destaque__texto">Todos nuestros trabajos tienen una garantía de 12 meses, utilizando primeras marcas en todos los componentes sustituidos.</p>',
      { tono: 'azul', clase: 'destaque' }
    ),
    '    ' +
      L.placaFoto(
        'detalle-carcasa.jpg',
        'Detalle en primer plano de la carcasa de aluminio de una caja de cambios automática, con el mecanizado a la vista.',
        'Carcasa mecanizada, vista de cerca',
        { clase: 'placa-foto--lado' }
      ),
    '      </aside>',
    '    </div>',
    '  </div>',
    '</section>',

    /* ---------------------------------------------- prueba: el almacén */
    '<section class="seccion seccion--prueba" aria-labelledby="t-prueba">',
    '  <div class="contenedor">',
    '    <div class="prueba">',
    '      <div class="prueba__foto">',
    '        ' +
      L.placaFoto(
        'almacen-cajas-estanteria.jpg',
        'Estanterías metálicas de cuatro alturas llenas de cajas de cambio automáticas completas, ordenadas por modelo.',
        'Almacén de la planta superior'
      ),
    '      </div>',
    '      <div class="prueba__texto">',
    '        <h2 class="titular" id="t-prueba">El almacén es el argumento</h2>',
    '        <p class="parrafo parrafo--guia">Se trabaja con ZF, GM, Aisin Warner, Hydra-Matic, Allison y Jacto, contando con amplio stock de todas ellas. Ese stock está en la planta superior, al lado del banco donde se reconstruye, y es la razón de que un trabajo no dependa de esperar a un pedido.</p>',
    '        <ul class="lista-marcas">',
    D.MARCAS.map(function (m) {
      return '<li>' + L.esc(m.nombre) + '</li>';
    }).join(''),
    '        </ul>',
    '        <p class="parrafo parrafo--pequeno">Esta fotografía llevaba desde 2020 sin poder verse: estaba dentro de una animación Flash del sitio antiguo.</p>',
    '        <a class="boton boton--azul" href="marcas.html">Ver las marcas y el stock' + L.icono('flecha') + '</a>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</section>',

    /* ---------------------------------------------- servicios */
    '<section class="seccion seccion--servicios" aria-labelledby="t-servicios">',
    '  <div class="contenedor">',
    '    <div class="cabeza-seccion">',
    '      <h2 class="titular" id="t-servicios">Lo que se hace en el taller</h2>',
    '      <p class="parrafo parrafo--guia">Cinco trabajos y una línea de teléfono. En el sitio anterior estos cinco servicios compartían una sola dirección web y se mostraban y ocultaban con un botón; ahora cada uno tiene su página.</p>',
    '    </div>',
    '    <div class="rejilla-servicios">',
    servicios
      .map(function (s, i) {
        return L.placaEnlace({
          href: s.archivo,
          titulo: s.titulo,
          texto: L.esc(s.resumen),
          icono: s.icono,
          clase: i === 0 ? 'placa-enlace--ancha' : '',
        });
      })
      .join(''),
    '    </div>',
    '  </div>',
    '</section>',

    /* ---------------------------------------------- el recorrido */
    '<section class="seccion seccion--recorrido" aria-labelledby="t-recorrido">',
    '  <div class="contenedor">',
    '    <div class="cabeza-seccion cabeza-seccion--clara">',
    '      <h2 class="titular titular--claro" id="t-recorrido">El recorrido de una caja por la nave</h2>',
    '      <p class="parrafo parrafo--claro parrafo--guia">El taller consta de dos plantas, y esa distribución es literalmente el proceso: el vehículo se queda abajo y la caja sube.</p>',
    '    </div>',
    '    <ol class="recorrido">',
    '      <li class="recorrido__paso">',
    '        <p class="recorrido__planta">Planta baja</p>',
    '        <h3 class="recorrido__titulo">Se extrae la caja del vehículo</h3>',
    '        <p class="recorrido__texto">Planta baja de fácil acceso para los vehículos, con cinco elevadores, grúas elevadoras y herramientas de montaje y reparación. Aquí se realizan los trabajos de extracción y reposición de la caja de cambios automática en el vehículo.</p>',
    '      </li>',
    '      <li class="recorrido__paso">',
    '        <p class="recorrido__planta">Planta superior</p>',
    '        <h3 class="recorrido__titulo">Se repara y se reconstruye</h3>',
    '        <p class="recorrido__texto">Arriba se efectúan los trabajos de reparación y reconstrucción de los cambios automáticos, y también el mantenimiento de piezas, la limpieza y el engrasado. Al lado está el almacén con todo tipo de recambios.</p>',
    '      </li>',
    '      <li class="recorrido__paso">',
    '        <p class="recorrido__planta">Planta baja</p>',
    '        <h3 class="recorrido__titulo">Vuelve a montarse</h3>',
    '        <p class="recorrido__texto">La caja regresa al vehículo en la misma planta en la que se desmontó. Si el coche no puede venir por su propio pie, hay flota propia, empresa de transporte y servicio de grúa.</p>',
    '      </li>',
    '    </ol>',
    '    <div class="recorrido__pie">',
    '      <a class="boton boton--claro" href="instalaciones.html">Ver las instalaciones' + L.icono('flecha') + '</a>',
    '      <a class="boton boton--linea-claro" href="desmontaje-y-montaje.html">Cómo es el desmontaje' + L.icono('flecha') + '</a>',
    '    </div>',
    '  </div>',
    '</section>',

    /* ---------------------------------------------- galería breve */
    '<section class="seccion seccion--vistazo" aria-labelledby="t-vistazo">',
    '  <div class="contenedor">',
    '    <div class="cabeza-seccion">',
    '      <h2 class="titular" id="t-vistazo">Un vistazo a la nave</h2>',
    '      <p class="parrafo parrafo--guia">Fotografías del propio taller. Siete de las que hay en esta web estaban encerradas en dos archivos Flash y no se veían desde 2020.</p>',
    '    </div>',
    '    ' +
      L.galeria(
        [D.GALERIA_PLANTA_BAJA[0], D.GALERIA_PLANTA_ALTA[0], D.GALERIA_PLANTA_BAJA[2], D.GALERIA_OTRAS[0]],
        { clase: 'galeria--cuatro' }
      ),
    '    <p class="centrado"><a class="boton boton--azul" href="instalaciones.html">Las instalaciones al completo' +
      L.icono('flecha') +
      '</a></p>',
    '  </div>',
    '</section>',

    /* ---------------------------------------------- preguntas */
    '<section class="seccion seccion--preguntas" aria-labelledby="t-preguntas">',
    '  <div class="contenedor contenedor--estrecho">',
    '    <h2 class="titular" id="t-preguntas">Preguntas que llegan por teléfono</h2>',
    '    ' + L.acordeon(D.PREGUNTAS, { unico: true, primeroAbierto: true }),
    '  </div>',
    '</section>',
  ]);

  return {
    archivo: 'index.html',
    cuerpoClase: 'portada',
    titulo: 'Tecnicars · Reparación de cambios automáticos en Madrid',
    descripcion:
      'Taller especializado únicamente en reparar y reconstruir cajas de cambio automáticas y convertidores de par. Polígono Marconi, Madrid. Garantía de 12 meses.',
    prioridad: '1.0',
    contenido: contenido,
    jsonLd: [D.negocioJsonLd(), D.preguntasJsonLd()],
  };
}

module.exports = { construir };
