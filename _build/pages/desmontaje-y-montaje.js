/*
 * Desmontaje y montaje de la caja en el vehículo.
 *
 * Antes era la capa «desmonte» de pags/servicios.html.
 */

'use strict';

const L = require('../lib.js');
const D = require('../data.js');
const M = require('../layout.js');

function construir() {
  const servicio = D.SERVICIOS[2];

  const contenido = L.unir([
    M.heroeInterior({
      migas: [{ texto: 'Servicios', href: 'servicios.html' }, { texto: 'Desmontaje y montaje' }],
      antetitulo: 'En nuestro taller',
      titulo: 'Desmontaje y montaje<br>de la caja de cambios',
      entradilla:
        'Desmontaje y montaje de la caja de cambios de su vehículo en nuestro taller. El coche no tiene que ir a un sitio a que le quiten la caja y a otro a que se la reparen.',
      foto: {
        archivo: 'planta-baja-elevadores.jpg',
        alt: 'Dos vehículos subidos en elevadores de la planta baja, con un tercer coche esperando en el suelo rojo del taller.',
        pie: 'Elevadores de la planta baja',
      },
    }),

    '<section class="seccion" aria-labelledby="t-plantas">',
    '  <div class="contenedor">',
    '    <div class="cabeza-seccion">',
    '      <h2 class="titular" id="t-plantas">Nuestro taller consta de dos plantas</h2>',
    '      <p class="parrafo parrafo--guia">Una para el vehículo y otra para la caja. Todo el trabajo ocurre dentro del mismo edificio.</p>',
    '    </div>',
    '    <div class="plantas">',
    '      <article class="plantas__ficha">',
    '        <p class="plantas__numero" aria-hidden="true">1</p>',
    '        <h3 class="plantas__titulo">Primera planta</h3>',
    '        <p class="plantas__texto">Se realizan los trabajos de extracción y reposición de la caja de cambios automática en el vehículo, contando con cinco elevadores.</p>',
    '        ' +
      L.placaFoto(
        'planta-baja-vehiculos.jpg',
        'Monovolumen blanco con las puertas abiertas junto a una berlina, en la nave de la planta baja con dos elevadores al fondo.',
        'Entrada de vehículos'
      ),
    '      </article>',
    '      <article class="plantas__ficha">',
    '        <p class="plantas__numero" aria-hidden="true">2</p>',
    '        <h3 class="plantas__titulo">Segunda planta</h3>',
    '        <p class="plantas__texto">Se efectúan los trabajos de reparación y reconstrucción de los cambios automáticos. Aquí tenemos ubicado un completo almacén con todo tipo de recambios para poder ofrecerle, de la forma más rápida, el mejor servicio a nuestros clientes.</p>',
    '        ' +
      L.placaFoto(
        'planta-alta-taller.jpg',
        'Planta superior del taller: bancos azules a ambos lados, carcasas de cambio desmontadas sobre las mesas y prensa roja al fondo.',
        'Banco de reconstrucción'
      ),
    '      </article>',
    '    </div>',
    '  </div>',
    '</section>',

    '<section class="seccion seccion--claro" aria-labelledby="t-cifras">',
    '  <div class="contenedor">',
    '    <h2 class="titular" id="t-cifras">La nave, en cifras</h2>',
    '    <p class="parrafo parrafo--guia">Cuatro datos que salen del propio taller. No hay más cifras publicadas.</p>',
    '    <div class="cifras">',
    L.cifra('5', '', 'Elevadores en la planta de vehículos'),
    L.cifra('2', '', 'Plantas: una para el coche, otra para la caja'),
    L.cifra('12', ' meses', 'De garantía en todos los trabajos'),
    L.cifra('6', '', 'Marcas de caja con stock en almacén'),
    '    </div>',
    '  </div>',
    '</section>',

    '<section class="seccion" aria-labelledby="t-galeria">',
    '  <div class="contenedor">',
    '    <h2 class="titular" id="t-galeria">La planta de vehículos</h2>',
    '    ' + L.galeria(D.GALERIA_PLANTA_BAJA, { clase: 'galeria--cuatro' }),
    '  </div>',
    '</section>',

    '<section class="seccion seccion--siguiente" aria-labelledby="t-siguiente">',
    '  <div class="contenedor">',
    '    <h2 class="titular" id="t-siguiente">Continúa por aquí</h2>',
    '    <div class="rejilla-servicios rejilla-servicios--pareja">',
    L.placaEnlace({
      href: 'instalaciones.html',
      titulo: 'Instalaciones',
      texto: 'Las dos plantas, la oficina y el exterior de la nave, en veinte fotografías del propio taller.',
      icono: 'elevador',
      accion: 'Ver las instalaciones',
    }),
    L.placaEnlace({
      href: 'recogida-y-entrega.html',
      titulo: 'Recogida y entrega',
      texto: L.esc(D.SERVICIOS[4].resumen),
      icono: 'camion',
    }),
    '    </div>',
    '  </div>',
    '</section>',
  ]);

  return {
    archivo: 'desmontaje-y-montaje.html',
    titulo: 'Desmontaje y montaje de la caja de cambios · Tecnicars Madrid',
    descripcion:
      'Extracción y reposición de la caja de cambios automática en su vehículo, en nuestro propio taller de dos plantas del Polígono Marconi, con cinco elevadores.',
    prioridad: '0.8',
    contenido: contenido,
    jsonLd: D.servicioJsonLd(servicio),
  };
}

module.exports = { construir };
