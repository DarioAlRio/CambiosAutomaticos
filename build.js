/*
 * build.js — genera el sitio completo.
 *
 *     node build.js
 *
 * Produce en la raíz del proyecto:
 *   · los .html de todas las páginas
 *   · sitemap.xml y robots.txt
 *   · las redirecciones de las direcciones antiguas (carpeta pags/)
 *   · .htaccess con los 301 y la página de error
 *
 * Y DESPUÉS LOS VERIFICA. Si algún enlace interno apunta a una página que no
 * existe, si una imagen referenciada falta, si una página tiene dos <h1> o si
 * dos páginas comparten título, el proceso termina con código 1.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  EL HTML GENERADO NO SE EDITA A MANO.
 *  Cualquier cambio hecho directamente en un .html se pierde en la siguiente
 *  ejecución de este archivo. Para cambiar algo:
 *    · un teléfono, una dirección o el menú ....... _build/nav.js
 *    · la cabecera, el pie, el héroe o la banda ... _build/layout.js
 *    · un icono o un componente ................... _build/lib.js
 *    · un texto compartido o los datos ............ _build/data.js
 *    · el contenido de una página ................. _build/pages/<pagina>.js
 * ─────────────────────────────────────────────────────────────────────────
 */

'use strict';

const fs = require('fs');
const path = require('path');

const { SITIO } = require('./_build/nav.js');
const layout = require('./_build/layout.js');

const RAIZ = __dirname;

/*
 * Modo demo:  DEMO=1 node build.js
 *
 * Genera exactamente la misma web, pero apuntando a la dirección temporal de
 * GitHub Pages y marcada como NO indexable, con robots.txt cerrado y sin
 * sitemap. Sirve para enseñarla sin que la copia de muestra compita en Google
 * con el dominio del taller ni se quede rondando en los buscadores.
 *
 * La web que se entrega es la normal: «node build.js», sin más.
 */
const DEMO = process.env.DEMO === '1';
const BASE_DEMO = 'https://darioalrio.github.io/CambiosAutomaticos';

if (DEMO) {
  SITIO.base = BASE_DEMO;
  console.log('  MODO DEMO: ' + BASE_DEMO + '  ·  todas las páginas noindex\n');
}

/* Orden de construcción. Es también el orden del sitemap. */
const PAGINAS = [
  'index',
  'servicios',
  'cajas-de-cambio',
  'convertidores',
  'desmontaje-y-montaje',
  'mantenimiento',
  'recogida-y-entrega',
  'marcas',
  'empresa',
  'instalaciones',
  'contacto',
  '404',
];

/*
 * Direcciones del sitio de 2007 que desaparecen. Cada una recibe un archivo
 * de redirección en su ruta antigua, para que un enlace o un marcador viejo
 * siga funcionando aunque el hosting no llegue a configurar los 301.
 */
const REDIRECCIONES = [
  { antigua: 'pags/servicios.html', nueva: 'servicios.html' },
  { antigua: 'pags/instalaciones.html', nueva: 'instalaciones.html' },
  { antigua: 'pags/contactenos.html', nueva: 'contacto.html' },
];

/* --------------------------------------------------------------- generación */

function generar() {
  const construidas = [];

  for (const nombre of PAGINAS) {
    const modulo = require('./_build/pages/' + nombre + '.js');
    const pagina = modulo.construir();
    if (DEMO) pagina.noindex = true;
    const html = layout.pagina(pagina);
    fs.writeFileSync(path.join(RAIZ, pagina.archivo), html, 'utf8');
    construidas.push(pagina);
    console.log('  escrita  ' + pagina.archivo + '  (' + (html.length / 1024).toFixed(1) + ' KB)');
  }

  return construidas;
}

function generarRedirecciones() {
  for (const r of REDIRECCIONES) {
    const destinoRelativo = '../' + r.nueva;
    const url = SITIO.base + '/' + r.nueva;
    const html =
      '<!doctype html>\n' +
      '<html lang="es">\n' +
      '<head>\n' +
      '<meta charset="utf-8">\n' +
      '<title>Esta página se ha mudado · Tecnicars</title>\n' +
      '<meta name="robots" content="noindex, follow">\n' +
      '<link rel="canonical" href="' + url + '">\n' +
      '<meta http-equiv="refresh" content="0; url=' + destinoRelativo + '">\n' +
      '<style>body{font-family:system-ui,sans-serif;margin:0;display:grid;place-items:center;' +
      'min-height:100vh;background:#00527a;color:#fff;text-align:center;padding:24px}' +
      'a{color:#fff}</style>\n' +
      '</head>\n' +
      '<body>\n' +
      '<div>\n' +
      '<p>Esta página ha cambiado de dirección.</p>\n' +
      '<p><a href="' + destinoRelativo + '">Continuar a la página nueva</a></p>\n' +
      '</div>\n' +
      '</body>\n' +
      '</html>\n';

    const destino = path.join(RAIZ, r.antigua);
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.writeFileSync(destino, html, 'utf8');
    console.log('  redirige ' + r.antigua + '  →  ' + r.nueva);
  }
}

function generarSitemap(paginas) {
  /* En la demo no hay sitemap: la copia de muestra no se ofrece a Google. */
  if (DEMO) {
    const viejo = path.join(RAIZ, 'sitemap.xml');
    if (fs.existsSync(viejo)) fs.unlinkSync(viejo);
    fs.writeFileSync(
      path.join(RAIZ, 'robots.txt'),
      '# Copia de muestra. No se indexa.\n' + 'User-agent: *\n' + 'Disallow: /\n',
      'utf8'
    );
    console.log('  escrito  robots.txt  (demo: Disallow /)');
    return;
  }

  const hoy = new Date().toISOString().slice(0, 10);
  const urls = paginas
    .filter(function (p) {
      return p.enSitemap !== false && !p.noindex;
    })
    .map(function (p) {
      const loc = SITIO.base + '/' + (p.archivo === 'index.html' ? '' : p.archivo);
      return (
        '  <url>\n' +
        '    <loc>' + loc + '</loc>\n' +
        '    <lastmod>' + hoy + '</lastmod>\n' +
        '    <changefreq>monthly</changefreq>\n' +
        '    <priority>' + (p.prioridad || '0.5') + '</priority>\n' +
        '  </url>'
      );
    })
    .join('\n');

  fs.writeFileSync(
    path.join(RAIZ, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urls +
      '\n</urlset>\n',
    'utf8'
  );
  console.log('  escrito  sitemap.xml');

  fs.writeFileSync(
    path.join(RAIZ, 'robots.txt'),
    'User-agent: *\n' +
      'Allow: /\n' +
      'Disallow: /_build/\n' +
      'Disallow: /_original-sitio/\n' +
      'Disallow: /assets/img/_original/\n' +
      '\n' +
      'Sitemap: ' + SITIO.base + '/sitemap.xml\n',
    'utf8'
  );
  console.log('  escrito  robots.txt');
}

function generarHtaccess() {
  const lineas = [
    '# Configuración para Apache, que es el servidor donde vive hoy el dominio.',
    '# Si el hosting es Nginx, Netlify, Vercel o Cloudflare, este archivo no',
    '# hace nada: las instrucciones equivalentes están en README.md.',
    '',
    '# Página de error propia. Sin esta línea, una dirección inexistente',
    '# devuelve la página gris de Apache (que es lo que pasa hoy).',
    'ErrorDocument 404 /404.html',
    '',
    '# Redirecciones permanentes de las direcciones del sitio de 2007.',
    'Redirect 301 /pags/servicios.html /servicios.html',
    'Redirect 301 /pags/instalaciones.html /instalaciones.html',
    'Redirect 301 /pags/contactenos.html /contacto.html',
    '',
    '# Una sola dirección buena para cada página: con www y por https.',
    '# ATENCIÓN: no activar el bloque https hasta que el certificado del',
    '# dominio sea correcto. Hoy no lo es (ver PENDIENTE.md).',
    '<IfModule mod_rewrite.c>',
    '  RewriteEngine On',
    '  RewriteCond %{HTTP_HOST} !^www\\. [NC]',
    '  RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [R=301,L]',
    '  # RewriteCond %{HTTPS} off',
    '  # RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]',
    '</IfModule>',
    '',
    '# Compresión y caché de los archivos estáticos.',
    '<IfModule mod_deflate.c>',
    '  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml text/xml',
    '</IfModule>',
    '<IfModule mod_expires.c>',
    '  ExpiresActive On',
    '  ExpiresByType image/jpeg "access plus 1 year"',
    '  ExpiresByType image/webp "access plus 1 year"',
    '  ExpiresByType image/png "access plus 1 year"',
    '  ExpiresByType image/svg+xml "access plus 1 year"',
    '  ExpiresByType text/css "access plus 1 month"',
    '  ExpiresByType application/javascript "access plus 1 month"',
    '</IfModule>',
    '',
  ];
  fs.writeFileSync(path.join(RAIZ, '.htaccess'), lineas.join('\n'), 'utf8');
  console.log('  escrito  .htaccess');
}

/* ------------------------------------------------------------ verificación */

const fallos = [];
const avisos = [];

function fallo(archivo, texto) {
  fallos.push(archivo + ': ' + texto);
}

/* Saca todos los valores de un atributo del HTML. */
function extraer(html, atributo) {
  const re = new RegExp(atributo + '="([^"]*)"', 'g');
  const salida = [];
  let m;
  while ((m = re.exec(html)) !== null) salida.push(m[1]);
  return salida;
}

function esExterno(url) {
  return (
    /^(https?:|mailto:|tel:|data:|\/\/)/i.test(url) ||
    url === '' ||
    url.charAt(0) === '#'
  );
}

function verificar(paginas) {
  const anclas = {}; /* archivo → conjunto de id */
  const htmls = {};

  /* Primera pasada: leer todo y recoger los id de cada página. */
  for (const p of paginas) {
    const html = fs.readFileSync(path.join(RAIZ, p.archivo), 'utf8');
    htmls[p.archivo] = html;
    anclas[p.archivo] = new Set(extraer(html, 'id'));
  }

  const titulos = new Map();
  const descripciones = new Map();

  for (const p of paginas) {
    const html = htmls[p.archivo];
    const nombre = p.archivo;

    /* --- enlaces internos --- */
    for (const href of extraer(html, 'href')) {
      if (esExterno(href)) continue;
      const partes = href.split('#');
      const ruta = partes[0];
      const ancla = partes[1];

      if (ruta) {
        const destino = path.join(RAIZ, ruta);
        if (!fs.existsSync(destino)) {
          fallo(nombre, 'enlace roto → ' + href);
          continue;
        }
        if (ancla && anclas[ruta] && !anclas[ruta].has(ancla)) {
          fallo(nombre, 'ancla inexistente → ' + href);
        }
      } else if (ancla && !anclas[nombre].has(ancla)) {
        fallo(nombre, 'ancla inexistente en la propia página → #' + ancla);
      }
    }

    /* --- imágenes: src y srcset --- */
    const fuentes = extraer(html, 'src').concat(extraer(html, 'srcset'));
    for (const src of fuentes) {
      if (esExterno(src)) continue;
      const limpio = src.split(' ')[0];
      if (!fs.existsSync(path.join(RAIZ, limpio))) {
        fallo(nombre, 'archivo referenciado inexistente → ' + limpio);
      }
    }

    /* --- un solo h1 --- */
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    if (h1 !== 1) fallo(nombre, 'tiene ' + h1 + ' etiquetas <h1>, debe tener exactamente 1');

    /* --- imágenes con medidas --- */
    const imgs = html.match(/<img\b[^>]*>/g) || [];
    for (const img of imgs) {
      if (!/\bwidth="/.test(img) || !/\bheight="/.test(img)) {
        fallo(nombre, 'imagen sin width/height → ' + img.slice(0, 90));
      }
      if (!/\balt="/.test(img)) {
        fallo(nombre, 'imagen sin alt → ' + img.slice(0, 90));
      }
      if (!/\bloading="lazy"/.test(img) && !/\bfetchpriority="high"/.test(img)) {
        avisos.push(nombre + ': imagen sin loading ni fetchpriority → ' + img.slice(0, 70));
      }
    }

    /* --- title y description únicos --- */
    const t = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
    const d = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
    if (!t) fallo(nombre, 'sin <title>');
    if (!d) fallo(nombre, 'sin meta description');
    if (t) {
      if (titulos.has(t)) fallo(nombre, 'título repetido, ya lo usa ' + titulos.get(t));
      titulos.set(t, nombre);
      if (t.length > 70) avisos.push(nombre + ': título de ' + t.length + ' caracteres (más de 70)');
    }
    if (d) {
      if (descripciones.has(d)) fallo(nombre, 'descripción repetida, ya la usa ' + descripciones.get(d));
      descripciones.set(d, nombre);
      if (d.length > 165) avisos.push(nombre + ': descripción de ' + d.length + ' caracteres (más de 165)');
    }

    /* --- canonical --- */
    if (!p.noindex && !/rel="canonical"/.test(html)) fallo(nombre, 'sin enlace canonical');

    /* --- enlace de salto al contenido --- */
    if (!/class="salto"/.test(html)) fallo(nombre, 'sin enlace de salto al contenido');

    /* --- el correo no puede aparecer escrito en el HTML --- */
    const correoEntero = SITIO.correoCuenta + '@' + SITIO.correoDominio;
    const enJsonLd = (html.match(/"email":"[^"]*"/g) || []).length;
    const apariciones = (html.split(correoEntero).length - 1);
    if (apariciones > enJsonLd) {
      fallo(
        nombre,
        'el correo aparece escrito en el HTML ' +
          apariciones +
          ' veces (solo se admite dentro del JSON-LD)'
      );
    }
  }

  /* --- los archivos de redirección apuntan a algo que existe --- */
  for (const r of REDIRECCIONES) {
    if (!fs.existsSync(path.join(RAIZ, r.nueva))) {
      fallo(r.antigua, 'la redirección apunta a una página inexistente → ' + r.nueva);
    }
  }

  /* --- CSS y JS existen y no hay librerías externas --- */
  for (const activo of ['assets/css/site.css', 'assets/js/site.js']) {
    if (!fs.existsSync(path.join(RAIZ, activo))) fallo('proyecto', 'falta ' + activo);
  }

  const paginaEjemplo = htmls['index.html'];
  const externos = extraer(paginaEjemplo, 'src')
    .concat(extraer(paginaEjemplo, 'href'))
    .filter(function (u) {
      return /^https?:\/\//i.test(u) && !/fonts\.(googleapis|gstatic)\.com/.test(u) && u.indexOf(SITIO.base) !== 0;
    });
  if (externos.length) {
    fallo('index.html', 'recursos externos no permitidos → ' + externos.join(', '));
  }
}

/* ------------------------------------------------------------------ arranque */

console.log('\nConstruyendo Tecnicars…\n');

const paginas = generar();
generarRedirecciones();
generarSitemap(paginas);
generarHtaccess();

console.log('\nVerificando…\n');
verificar(paginas);

if (avisos.length) {
  console.log('  Avisos (no bloquean):');
  for (const a of avisos) console.log('    · ' + a);
  console.log('');
}

if (fallos.length) {
  console.error('  ' + fallos.length + ' PROBLEMA(S):');
  for (const f of fallos) console.error('    ✗ ' + f);
  console.error('\nConstrucción fallida.\n');
  process.exit(1);
}

console.log('  Sin enlaces rotos ni imágenes que falten.');
console.log('  ' + paginas.length + ' páginas, ' + REDIRECCIONES.length + ' redirecciones.\n');
console.log('Listo. Para verlo:  node _build/serve.js\n');
