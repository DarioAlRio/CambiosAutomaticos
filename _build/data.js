/*
 * data.js — contenido compartido entre páginas.
 *
 * Los textos marcados como LITERAL vienen palabra por palabra del sitio de
 * 2007. Solo se han corregido erratas evidentes del original: «e-amil» por
 * «e-mail», «reponsabilidad» por «responsabilidad», «hidraúlicos» por
 * «hidráulicos», «efectuan» por «efectúan», «almacen» por «almacén»,
 * «Intalaciones» por «Instalaciones» y las tildes que faltaban.
 *
 * Nada de lo que hay aquí está inventado. Lo que el dominio no decía, no
 * aparece: está en PENDIENTE.md.
 */

'use strict';

const { SITIO } = require('./nav.js');

/* --------------------------------------------------------------- servicios */

const SERVICIOS = [
  {
    id: 'cajas',
    archivo: 'cajas-de-cambio.html',
    titulo: 'Cajas de cambio automáticas',
    corto: 'Cajas de cambio',
    icono: 'caja',
    resumen:
      'Reparación y reconstrucción de cajas de cambio automáticas de todas las marcas, con garantía de doce meses.',
    prioridad: '1.0',
  },
  {
    id: 'convertidores',
    archivo: 'convertidores.html',
    titulo: 'Convertidores de par',
    corto: 'Convertidores',
    icono: 'engranaje',
    resumen:
      'Reparación y reconstrucción de convertidores, sustituyendo los componentes de desgaste y fricción en vez de cambiar la pieza entera.',
    prioridad: '0.9',
  },
  {
    id: 'desmontaje',
    archivo: 'desmontaje-y-montaje.html',
    titulo: 'Desmontaje y montaje',
    corto: 'Desmontaje y montaje',
    icono: 'elevador',
    resumen:
      'Extracción y reposición de la caja de cambios en su vehículo, en nuestro propio taller y sobre nuestros cinco elevadores.',
    prioridad: '0.8',
  },
  {
    id: 'mantenimiento',
    archivo: 'mantenimiento.html',
    titulo: 'Mantenimiento',
    corto: 'Mantenimiento',
    icono: 'gota',
    resumen:
      'Sustitución del aceite y el filtro del cambio automático con cita previa, mientras usted espera en las instalaciones.',
    prioridad: '0.8',
  },
  {
    id: 'recogida',
    archivo: 'recogida-y-entrega.html',
    titulo: 'Recogida y entrega',
    corto: 'Recogida y entrega',
    icono: 'camion',
    resumen:
      'Recogida y entrega a domicilio en toda la península, con flota propia, empresa de transporte y servicio de grúa.',
    prioridad: '0.8',
  },
  {
    id: 'asistencia',
    archivo: 'contacto.html#asistencia',
    titulo: 'Asistencia telefónica',
    corto: 'Asistencia telefónica',
    icono: 'telefono',
    resumen:
      'Para cualquier aclaración, no dude en ponerse en contacto con nosotros por teléfono o por correo.',
    prioridad: null,
  },
];

/* ------------------------------------------------------------------ marcas */

/*
 * LITERAL: «Algunas de las marcas que trabajamos: ZF, GM, AISIN WARNER,
 * HYDRA-MATIC, ALLISON, JACTO. Contando con amplio stock de todas ellas.»
 *
 * La nota de cada marca es descripción del fabricante, no una afirmación
 * sobre modelos concretos: el dominio no publicaba ni una sola referencia de
 * caja, y aquí no se inventa ninguna.
 */
const MARCAS = [
  {
    nombre: 'ZF',
    nota: 'Fabricante alemán de cajas automáticas. Una de las marcas de las que se mantiene stock.',
  },
  {
    nombre: 'GM',
    nota: 'General Motors. Marca de las que se mantiene stock en el almacén de la planta superior.',
  },
  {
    nombre: 'Aisin Warner',
    nota: 'Fabricante japonés de cambios automáticos. Marca con stock disponible.',
  },
  {
    nombre: 'Hydra-Matic',
    nota: 'Cambios automáticos Hydra-Matic. Marca con stock disponible.',
  },
  {
    nombre: 'Allison',
    nota: 'Transmisiones automáticas Allison. Marca con stock disponible.',
  },
  {
    nombre: 'Jacto',
    nota: 'Marca recogida en el listado original del taller. Con stock disponible.',
  },
];

/* ----------------------------------------------------------------- galería */

/*
 * Las siete primeras fotografías salieron del interior de planta1.swf y
 * plantabaja.swf. Estaban publicadas en el dominio desde 2008, pero dejaron
 * de poder verse en 2020, cuando los navegadores retiraron Flash. Se
 * extrajeron de los archivos y se vuelven a publicar como imágenes normales.
 */
const GALERIA_PLANTA_ALTA = [
  {
    archivo: 'planta-alta-taller.jpg',
    alt: 'Planta superior del taller: bancos azules a ambos lados, carcasas de cambio desmontadas sobre las mesas y prensa roja al fondo.',
    pie: 'Banco de reconstrucción, planta superior',
  },
  {
    archivo: 'almacen-cajas-estanteria.jpg',
    alt: 'Estanterías metálicas de cuatro alturas llenas de cajas de cambio automáticas completas, ordenadas por modelo.',
    pie: 'Almacén de cajas completas',
  },
  {
    archivo: 'planta-alta-acceso.jpg',
    alt: 'Zona de paso de la planta superior, con puerta de salida señalizada, estanterías de recambios y la oficina técnica al fondo.',
    pie: 'Acceso y estanterías de recambio',
  },
  {
    archivo: 'banco-trabajo-planta-alta.jpg',
    alt: 'Dos técnicos trabajando en la planta superior sobre carcasas de cambio automático desmontadas.',
    pie: 'Dos técnicos en el banco',
  },
];

const GALERIA_PLANTA_BAJA = [
  {
    archivo: 'planta-baja-elevadores.jpg',
    alt: 'Dos vehículos subidos en elevadores de la planta baja, con un tercer coche esperando en el suelo rojo del taller.',
    pie: 'Elevadores en carga',
  },
  {
    archivo: 'planta-baja-vehiculos.jpg',
    alt: 'Monovolumen blanco con las puertas abiertas junto a una berlina, en la nave de la planta baja con dos elevadores al fondo.',
    pie: 'Entrada de vehículos',
  },
  {
    archivo: 'planta-baja-deportivo.jpg',
    alt: 'Deportivo azul oscuro de gran cilindrada con el capó levantado, en el interior de la planta baja.',
    pie: 'Deportivo en reparación',
  },
  {
    archivo: 'planta-baja-zona-trabajo.jpg',
    alt: 'Zona de trabajo de la planta baja con carro de herramienta, equipos de taller contra la pared y varios vehículos aparcados.',
    pie: 'Zona de trabajo y equipos',
  },
];

const GALERIA_OTRAS = [
  {
    archivo: 'oficina-recepcion.jpg',
    alt: 'Oficina de recepción con el mostrador, archivadores y una pared con diplomas enmarcados.',
    pie: 'La oficina',
  },
  {
    archivo: 'pasillo-oficina-cartel.jpg',
    alt: 'Pasillo interior con un cartel de Tecnicars que muestra el despiece de una caja de cambios, y la oficina acristalada al fondo.',
    pie: 'Paso a la oficina',
  },
  {
    archivo: 'nave-exterior.jpg',
    alt: 'Fachada de la nave de Tecnicars en el Polígono Industrial Marconi, con el rótulo azul y rojo de la empresa sobre la entrada.',
    pie: 'Exterior de la nave',
  },
  {
    archivo: 'nave-fachada-lateral.jpg',
    alt: 'Esquina del edificio de Tecnicars vista desde la calle, con un descapotable rojo aparcado delante.',
    pie: 'La esquina de la nave',
  },
];

const GALERIA_PIEZAS = [
  {
    archivo: 'caja-abierta-banco.jpg',
    alt: 'Carcasa de una caja de cambios automática abierta sobre el banco, con la herramienta preparada al lado.',
    pie: 'Caja abierta en el banco',
  },
  {
    archivo: 'cajas-estanteria-detalle.jpg',
    alt: 'Detalle de dos cajas de cambio automáticas completas colocadas en la estantería del almacén.',
    pie: 'Cajas completas en estantería',
  },
  {
    archivo: 'convertidores-banco.jpg',
    alt: 'Cuatro convertidores de par desmontados y colocados en fila sobre la mesa de trabajo.',
    pie: 'Convertidores desmontados',
  },
  {
    archivo: 'varilla-nivel-aceite.jpg',
    alt: 'Manos de un técnico comprobando la varilla del nivel de aceite del cambio en el vano motor de un vehículo.',
    pie: 'Comprobación de nivel',
  },
];

/* ----------------------------------------------------- preguntas frecuentes */

/*
 * Las preguntas están escritas para esta web; las respuestas NO añaden ningún
 * dato que no estuviera en el dominio. Cuando el dato no existe (precios,
 * plazos, horario), la respuesta lo dice y remite al teléfono.
 */
const PREGUNTAS = [
  {
    titulo: '¿Reparan la caja o la sustituyen por otra?',
    cuerpo:
      '<p>Se repara y se reconstruye. El taller está dedicado y especializado únicamente a la reparación y reconstrucción de cajas de cambio automáticas de vehículos, así como de convertidores de par o hidráulicos. La sustitución completa es lo que hace un taller que no puede abrir la caja; aquí se abre.</p>',
  },
  {
    titulo: '¿Qué garantía tienen los trabajos?',
    cuerpo:
      '<p>Todos los trabajos tienen una <strong>garantía de 12 meses</strong>, utilizando primeras marcas en todos los componentes sustituidos.</p>',
  },
  {
    titulo: '¿Con qué marcas de caja trabajan?',
    cuerpo:
      '<p>Algunas de las marcas con las que se trabaja son <strong>ZF, GM, Aisin Warner, Hydra-Matic, Allison y Jacto</strong>, contando con amplio stock de todas ellas. Si su caja es de otra marca, lo más rápido es preguntarlo por teléfono.</p>',
  },
  {
    titulo: '¿También reparan el convertidor de par?',
    cuerpo:
      '<p>Sí. Se sustituyen componentes de desgaste y fricción, como la rueda libre o los discos de impacto, en lugar de reemplazar el convertidor entero.</p>',
  },
  {
    titulo: 'Estoy fuera de Madrid. ¿Puedo llevar el coche?',
    cuerpo:
      '<p>Hay recogida y entrega a domicilio en toda la península, con flota propia de vehículos, empresa de transporte y servicio de grúa. Las condiciones concretas de cada recogida se acuerdan por teléfono.</p>',
  },
  {
    titulo: '¿Cuánto cuesta y cuánto tarda?',
    cuerpo:
      '<p>Depende por completo de la caja y de la avería, y no hay tarifas publicadas: ni el precio ni el plazo se pueden dar por escrito sin ver el vehículo. Llame al <strong>' +
      SITIO.telefono +
      '</strong> y cuéntenos el caso.</p>',
  },
];

/* ------------------------------------------------------- datos estructurados */

/*
 * JSON-LD de AutoRepair (subtipo de LocalBusiness). Solo se declaran campos
 * de los que hay dato real. NO se declaran openingHours ni geo porque el
 * dominio nunca publicó ni el horario ni las coordenadas; declarar un horario
 * inventado sería mentir a Google y al visitante. Ver PENDIENTE.md.
 */
function negocioJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': SITIO.base + '/#negocio',
    name: SITIO.nombreCompleto,
    alternateName: SITIO.nombre,
    url: SITIO.base + '/',
    telephone: '+34 91 723 18 43',
    faxNumber: '+34 91 797 89 80',
    email: SITIO.correoCuenta + '@' + SITIO.correoDominio,
    image: SITIO.base + '/assets/img/nave-exterior.jpg',
    logo: SITIO.base + '/assets/img/logotipo-tecnicars.png',
    foundingDate: String(SITIO.desde),
    description:
      'Taller especializado únicamente en la reparación y reconstrucción de cajas de cambio automáticas y convertidores de par. Polígono Industrial Marconi, Madrid.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITIO.calle + ', ' + SITIO.naves + ' (' + SITIO.poligono + ')',
      addressLocality: SITIO.ciudad,
      addressRegion: 'Madrid',
      addressCountry: SITIO.pais,
    },
    areaServed: [
      { '@type': 'City', name: 'Madrid' },
      { '@type': 'Country', name: 'España' },
    ],
    knowsAbout: SITIO.marcas,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Tecnicars',
      itemListElement: SERVICIOS.map(function (s) {
        return {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.titulo,
            description: s.resumen,
          },
        };
      }),
    },
  };
}

function servicioJsonLd(servicio) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: servicio.titulo,
    description: servicio.resumen,
    serviceType: servicio.titulo,
    url: SITIO.base + '/' + servicio.archivo,
    areaServed: { '@type': 'Country', name: 'España' },
    provider: {
      '@type': 'AutoRepair',
      '@id': SITIO.base + '/#negocio',
      name: SITIO.nombreCompleto,
      telephone: '+34 91 723 18 43',
    },
  };
}

function preguntasJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PREGUNTAS.map(function (p) {
      return {
        '@type': 'Question',
        name: p.titulo,
        acceptedAnswer: {
          '@type': 'Answer',
          text: p.cuerpo.replace(/<[^>]+>/g, '').trim(),
        },
      };
    }),
  };
}

module.exports = {
  SERVICIOS,
  MARCAS,
  GALERIA_PLANTA_ALTA,
  GALERIA_PLANTA_BAJA,
  GALERIA_OTRAS,
  GALERIA_PIEZAS,
  PREGUNTAS,
  negocioJsonLd,
  servicioJsonLd,
  preguntasJsonLd,
};
