/*
 * Índice de servicios.
 *
 * Es la página que hereda la dirección antigua pags/servicios.html. En el
 * sitio de 2007 esta única dirección contenía los cinco servicios metidos en
 * capas que se mostraban y ocultaban con JavaScript: para Google era una
 * sola página, y quien llegaba desde un buscador veía solo la primera capa.
 */

'use strict';

const L = require('../lib.js');
const D = require('../data.js');
const M = require('../layout.js');

function construir() {
  const contenido = L.unir([
    M.heroeInterior({
      migas: [{ texto: 'Servicios' }],
      antetitulo: 'Índice',
      titulo: 'Los seis servicios<br>del taller',
      entradilla:
        'Todo lo que se hace en la nave del Polígono Marconi, cada cosa con su página. Nada de esto es un servicio general de mecánica: son seis trabajos sobre el cambio automático.',
      foto: {
        archivo: 'panel-herramientas.jpg',
        alt: 'Panel de herramienta ordenada sobre el banco de trabajo del taller, con llaves, útiles y piezas.',
        pie: 'Panel de herramienta del taller',
      },
    }),

    '<section class="seccion" aria-labelledby="t-lista">',
    '  <div class="contenedor">',
    '    <h2 class="visually-hidden" id="t-lista">Listado de servicios</h2>',
    '    <div class="rejilla-servicios rejilla-servicios--indice">',
    D.SERVICIOS.map(function (s, i) {
      return L.placaEnlace({
        href: s.archivo,
        titulo: s.titulo,
        texto: L.esc(s.resumen),
        icono: s.icono,
        clase:
          i === 0
            ? 'placa-enlace--ancha'
            : i === D.SERVICIOS.length - 1
            ? 'placa-enlace--fila'
            : '',
        accion: s.id === 'asistencia' ? 'Ir al contacto' : 'Ver el servicio',
      });
    }).join(''),
    '    </div>',
    '  </div>',
    '</section>',

    '<section class="seccion seccion--claro" aria-labelledby="t-limites">',
    '  <div class="contenedor contenedor--estrecho">',
    '    <h2 class="titular" id="t-limites">Lo que no se hace aquí</h2>',
    '    <p class="parrafo parrafo--guia">Somos una empresa dedicada y especializada <strong>únicamente</strong> a la reparación y reconstrucción de cajas de cambios automáticas de vehículos, así como de convertidores de par o hidráulicos.</p>',
    '    <p class="parrafo">Eso significa que este no es el taller para una revisión general, una distribución o un problema de motor. Si la avería no está en el cambio automático, lo honesto es decirlo antes de que traiga el coche.</p>',
    '  </div>',
    '</section>',
  ]);

  return {
    archivo: 'servicios.html',
    titulo: 'Servicios · Tecnicars Cambios Automáticos, Madrid',
    descripcion:
      'Reparación de cajas automáticas y convertidores, desmontaje y montaje, mantenimiento con cita previa y recogida en toda la península.',
    prioridad: '0.9',
    contenido: contenido,
  };
}

module.exports = { construir };
