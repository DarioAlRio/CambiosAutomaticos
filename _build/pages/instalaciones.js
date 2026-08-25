/*
 * Instalaciones.
 *
 * Hereda pags/instalaciones.html. Allí las cuatro zonas estaban en pestañas
 * Spry, y las dos primeras mostraban animaciones Flash que dejaron de verse
 * en 2020. Las siete fotografías que había dentro de esos dos archivos .swf
 * se extrajeron y se publican aquí como imágenes normales.
 *
 * Se sustituyen las pestañas por secciones con título propio: cada zona es
 * ahora un destino con ancla, indexable y enlazable.
 */

'use strict';

const L = require('../lib.js');
const D = require('../data.js');
const M = require('../layout.js');

const ZONAS = [
  {
    id: 'planta-superior',
    rotulo: 'Planta superior',
    titulo: 'Donde se reconstruye la caja',
    texto:
      'En esta planta se realizan los trabajos de mantenimiento de piezas, limpieza, engrasado, etc. También sirve de almacén de piezas. Aquí se efectúan los trabajos de reparación y reconstrucción de los cambios automáticos, con un completo almacén de recambios en la misma sala.',
    fotos: D.GALERIA_PLANTA_ALTA,
    rescatadas: true,
  },
  {
    id: 'planta-inferior',
    rotulo: 'Planta inferior',
    titulo: 'Donde entra el vehículo',
    texto:
      'Planta baja de fácil acceso para los vehículos. Disponemos de grúas elevadoras y herramientas de montaje y reparación. Es la planta en la que se extrae y se repone la caja de cambios, con cinco elevadores.',
    fotos: D.GALERIA_PLANTA_BAJA,
    rescatadas: true,
  },
  {
    id: 'oficina',
    rotulo: 'Oficina',
    titulo: 'Donde se atiende',
    texto:
      'Desde nuestras oficinas gestionamos los pedidos y atendemos todas sus preguntas e informamos del estado de su vehículo.',
    fotos: [D.GALERIA_OTRAS[0], D.GALERIA_OTRAS[1]],
    rescatadas: false,
  },
  {
    id: 'exterior',
    rotulo: 'Exterior',
    titulo: 'La nave desde la calle',
    texto:
      'Edificio de reciente construcción, en el Polígono Industrial Marconi. La nave ocupa los números 4 y 20 de la calle Laguna del Marquesado.',
    fotos: [
      D.GALERIA_OTRAS[2],
      D.GALERIA_OTRAS[3],
      {
        archivo: 'nave-vista-aerea.jpg',
        alt: 'Vista aérea del edificio de Tecnicars, con la cubierta azul y los rótulos comerciales en la fachada.',
        pie: 'El edificio desde el aire',
      },
      {
        archivo: 'elevadores-vista-alta.jpg',
        alt: 'Vista desde la planta superior hacia los vehículos aparcados en la planta baja del taller.',
        pie: 'Vista entre plantas',
      },
    ],
    rescatadas: false,
  },
];

function construir() {
  const indice =
    '<nav class="indice-zonas" aria-label="Zonas de las instalaciones"><ul>' +
    ZONAS.map(function (z) {
      return '<li><a href="#' + z.id + '">' + L.esc(z.rotulo) + '</a></li>';
    }).join('') +
    '</ul></nav>';

  const secciones = ZONAS.map(function (z, i) {
    return L.unir([
      '<section class="seccion seccion--zona' + (i % 2 === 1 ? ' seccion--claro' : '') + '" id="' + z.id + '" aria-labelledby="t-' + z.id + '">',
      '  <div class="contenedor">',
      '    <div class="zona__cabeza">',
      '      <p class="zona__rotulo">' + L.esc(z.rotulo) + '</p>',
      '      <h2 class="titular" id="t-' + z.id + '">' + L.esc(z.titulo) + '</h2>',
      '      <p class="parrafo parrafo--guia">' + L.esc(z.texto) + '</p>',
      z.rescatadas
        ? '      <p class="zona__nota">' +
          L.icono('aviso') +
          '<span>Estas fotografías estaban dentro de una animación Flash y no podían verse desde 2020.</span></p>'
        : '',
      '    </div>',
      '    ' + L.galeria(z.fotos, { clase: 'galeria--cuatro' }),
      '  </div>',
      '</section>',
    ]);
  }).join('\n');

  const contenido = L.unir([
    M.heroeInterior({
      migas: [{ texto: 'El taller' }, { texto: 'Instalaciones' }],
      antetitulo: 'Dos plantas en el Polígono Marconi',
      titulo: 'Las instalaciones,<br>por dentro',
      entradilla:
        'Contamos con unas amplias instalaciones dotadas con la última tecnología y en las que se cumplen todas las medidas de seguridad para nuestros técnicos.',
      foto: {
        archivo: 'planta-alta-acceso.jpg',
        alt: 'Zona de paso de la planta superior, con puerta de salida señalizada, estanterías de recambios y la oficina técnica al fondo.',
        pie: 'Paso entre el almacén y el taller',
      },
    }),
    '<div class="contenedor contenedor--indice">' + indice + '</div>',
    secciones,
  ]);

  return {
    archivo: 'instalaciones.html',
    titulo: 'Instalaciones del taller · Tecnicars Cambios Automáticos',
    descripcion:
      'Las dos plantas del taller, la oficina y el exterior de la nave, en fotografías reales, incluidas siete rescatadas de las animaciones Flash del sitio de 2007.',
    prioridad: '0.7',
    contenido: contenido,
  };
}

module.exports = { construir };
