/*
 * nav.js — datos del negocio y estructura de navegación.
 *
 * Este es el archivo que se toca para cambiar un teléfono, una dirección o
 * el menú. Todo lo que hay aquí procede del dominio original
 * http://www.cambios-automaticos.com/ (páginas de 2007-2008). No hay ningún
 * dato inventado: los que faltan están listados en PENDIENTE.md.
 */

'use strict';

const SITIO = {
  nombre: 'Tecnicars',
  nombreCompleto: 'Tecnicars Cambios Automáticos',
  descriptor: 'Cambios automáticos',

  /* Dominio de publicación. Se usa para canonical, Open Graph y sitemap.
   * OJO: hoy el certificado HTTPS del hosting no coincide con el dominio.
   * Si no se arregla antes de publicar, cambiar a http:// (ver PENDIENTE.md). */
  base: 'https://www.cambios-automaticos.com',

  /* Origen: pags/contactenos.html y el gráfico imgs/telefono.gif */
  telefono: '91 723 18 43',
  telefonoEnlace: '+34917231843',
  fax: '91 797 89 80',

  /* El correo NO se escribe entero en el HTML. Se monta en el navegador a
   * partir de estas dos mitades para estorbar a los robots recolectores.
   * Ver assets/js/site.js y la función correo() de lib.js. */
  correoCuenta: 'info',
  correoDominio: 'cambios-automaticos.com',

  /* Origen: pags/contactenos.html */
  calle: 'Calle Laguna del Marquesado, 10',
  naves: 'Naves 4 y 20',
  poligono: 'Polígono Industrial Marconi',
  ciudad: 'Madrid',
  pais: 'ES',

  /* Origen: el texto de 2007 decía «lleva 12 años en el sector». */
  desde: 1995,

  /* Marcas de caja con stock. Origen literal: pags/servicios.html */
  marcas: ['ZF', 'GM', 'Aisin Warner', 'Hydra-Matic', 'Allison', 'Jacto'],

  garantiaMeses: 12,
  elevadores: 5,
  plantas: 2,
};

/*
 * Menú principal.
 *
 * El menú de 2007 era plano: cuatro botones («La empresa», «Servicios»,
 * «Instalaciones», «Contáctenos») y todo el contenido real de servicios
 * escondido detrás de un JavaScript que mostraba y ocultaba capas. Eso dejaba
 * cinco servicios sin URL propia y, por tanto, invisibles para Google.
 *
 * Aquí cada servicio tiene su página. El menú se agrupa en cinco familias.
 * La tabla completa antiguo → nuevo está en README.md.
 */
const NAV = [
  {
    texto: 'Servicios',
    tipo: 'mega',
    destacado: {
      imagen: 'caja-abierta-banco.jpg',
      alt: 'Carcasa de una caja de cambios automática abierta sobre el banco de trabajo.',
      titulo: 'Solo cambios automáticos',
      texto: 'No somos un taller general que además toca automáticos. Es lo único que hacemos.',
    },
    columnas: [
      {
        titulo: 'En la caja',
        enlaces: [
          {
            href: 'cajas-de-cambio.html',
            texto: 'Cajas de cambio automáticas',
            desc: 'Reparación y reconstrucción de todas las marcas, con garantía de 12 meses.',
          },
          {
            href: 'convertidores.html',
            texto: 'Convertidores de par',
            desc: 'Rueda libre, discos de impacto y demás componentes de desgaste y fricción.',
          },
        ],
      },
      {
        titulo: 'En el vehículo',
        enlaces: [
          {
            href: 'desmontaje-y-montaje.html',
            texto: 'Desmontaje y montaje',
            desc: 'Extracción y reposición de la caja en la planta baja, con cinco elevadores.',
          },
          {
            href: 'mantenimiento.html',
            texto: 'Mantenimiento',
            desc: 'Sustitución de aceite y filtro con cita previa, mientras usted espera.',
          },
        ],
      },
      {
        titulo: 'Ver todo',
        enlaces: [
          {
            href: 'servicios.html',
            texto: 'Los seis servicios',
            desc: 'Índice completo de lo que se hace en el taller, en una sola página.',
          },
        ],
      },
    ],
  },
  {
    texto: 'Marcas',
    href: 'marcas.html',
  },
  {
    texto: 'Recogida y entrega',
    href: 'recogida-y-entrega.html',
  },
  {
    texto: 'El taller',
    tipo: 'mega',
    destacado: {
      imagen: 'almacen-cajas-estanteria.jpg',
      alt: 'Estanterías metálicas de la planta superior llenas de cajas de cambio automáticas completas.',
      titulo: 'Fotografías rescatadas',
      texto: 'Siete imágenes del taller llevaban desde 2020 encerradas en dos archivos Flash. Vuelven a verse.',
    },
    columnas: [
      {
        titulo: 'Quiénes somos',
        enlaces: [
          {
            href: 'empresa.html',
            texto: 'La empresa',
            desc: 'Especialización, equipo y forma de trabajar desde 1995.',
          },
        ],
      },
      {
        titulo: 'Dónde se trabaja',
        enlaces: [
          {
            href: 'instalaciones.html',
            texto: 'Instalaciones',
            desc: 'Las dos plantas, la oficina y el exterior de la nave, en fotografías.',
          },
          {
            href: 'contacto.html#asistencia',
            texto: 'Asistencia telefónica',
            desc: 'Para cualquier aclaración, sin necesidad de acercarse.',
          },
        ],
      },
    ],
  },
  {
    texto: 'Contacto',
    href: 'contacto.html',
  },
];

/*
 * Pie de página. Tres columnas de enlaces más la columna de datos de contacto,
 * que la genera layout.js.
 */
const PIE = [
  {
    titulo: 'Reparación',
    enlaces: [
      { href: 'cajas-de-cambio.html', texto: 'Cajas de cambio automáticas' },
      { href: 'convertidores.html', texto: 'Convertidores de par' },
      { href: 'desmontaje-y-montaje.html', texto: 'Desmontaje y montaje' },
      { href: 'marcas.html', texto: 'Marcas que trabajamos' },
    ],
  },
  {
    titulo: 'Servicio',
    enlaces: [
      { href: 'mantenimiento.html', texto: 'Mantenimiento' },
      { href: 'recogida-y-entrega.html', texto: 'Recogida y entrega' },
      { href: 'servicios.html', texto: 'Todos los servicios' },
      { href: 'contacto.html#asistencia', texto: 'Asistencia telefónica' },
    ],
  },
  {
    titulo: 'La empresa',
    enlaces: [
      { href: 'empresa.html', texto: 'Quiénes somos' },
      { href: 'instalaciones.html', texto: 'Instalaciones' },
      { href: 'contacto.html', texto: 'Dónde estamos' },
    ],
  },
];

module.exports = { SITIO, NAV, PIE };
