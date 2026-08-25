/*
 * imagenes.js — recompresión de las fotografías del sitio.
 *
 * NO forma parte de `node build.js`. Se ejecuta a mano, y solo cuando se
 * añaden o reemplazan fotografías en assets/img/_original/:
 *
 *     node _build/imagenes.js
 *
 * Necesita `sharp`, que NO se distribuye con el proyecto: instálalo aparte
 * (npm install sharp) y borra node_modules antes de subir la web. El
 * resultado del proceso (los .jpg y .webp de assets/img/) sí está versionado,
 * así que un despliegue normal nunca necesita ejecutar esto.
 *
 * Regla importante de este proyecto: NINGUNA imagen se amplía. El material
 * original del dominio es diminuto (la mayor mide 466 px de ancho) y ampliarla
 * solo produce desenfoque. Se recomprime al tamaño nativo y se sirve a un
 * tamaño de pantalla igual o menor que el nativo.
 */

'use strict';

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Falta sharp. Instálalo con:  npm install sharp');
  process.exit(1);
}

const RAIZ = path.join(__dirname, '..');
const ORIGEN = path.join(RAIZ, 'assets', 'img', '_original');
const DESTINO = path.join(RAIZ, 'assets', 'img');

/*
 * Renombrado del original al nombre nuevo. El nombre describe lo que se ve
 * en la fotografía, porque de ahí sale también el texto alternativo.
 */
const FOTOS = [
  ['img-insta-exterior.jpg', 'nave-exterior.jpg'],
  ['img-empresa.jpg', 'nave-fachada-lateral.jpg'],
  ['img-contactenos.jpg', 'nave-vista-aerea.jpg'],
  ['img_empresa2.jpg', 'rotulo-fachada.jpg'],
  ['img-servicios01.jpg', 'panel-herramientas.jpg'],
  ['img-serviciosp1.jpg', 'caja-abierta-banco.jpg'],
  ['img-serviciosp2.jpg', 'cajas-estanteria-detalle.jpg'],
  ['img-serviciosp3.jpg', 'convertidores-banco.jpg'],
  ['img-serviciosp4.jpg', 'varilla-nivel-aceite.jpg'],
  ['img-serviciosg1.jpg', 'banco-trabajo-planta-alta.jpg'],
  ['img-serviciosg2.jpg', 'detalle-carcasa.jpg'],
  ['img-serviciosg3.jpg', 'pasillo-oficina-cartel.jpg'],
  ['img-insta-planta1b.jpg', 'elevadores-vista-alta.jpg'],
  ['img-insta-oficina.jpg', 'oficina-recepcion.jpg'],
  ['img-mapa.jpg', 'plano-acceso.jpg'],
  ['img-cab.jpg', 'banda-carcasa.jpg'],
  ['planta1-1.jpg', 'planta-alta-taller.jpg'],
  ['planta1-2.jpg', 'planta-alta-acceso.jpg'],
  ['planta1-3.jpg', 'almacen-cajas-estanteria.jpg'],
  ['plantabaja-1.jpg', 'planta-baja-vehiculos.jpg'],
  ['plantabaja-2.jpg', 'planta-baja-deportivo.jpg'],
  ['plantabaja-3.jpg', 'planta-baja-zona-trabajo.jpg'],
  ['plantabaja-4.jpg', 'planta-baja-elevadores.jpg'],
];

function kb(n) {
  return (n / 1024).toFixed(1) + ' KB';
}

async function main() {
  fs.mkdirSync(DESTINO, { recursive: true });

  let antes = 0;
  let despues = 0;
  const filas = [];
  const manifiesto = {};

  for (const [origen, destino] of FOTOS) {
    const rutaOrigen = path.join(ORIGEN, origen);
    if (!fs.existsSync(rutaOrigen)) {
      console.error('  FALTA el original: ' + origen);
      process.exitCode = 1;
      continue;
    }

    const pesoOrigen = fs.statSync(rutaOrigen).size;
    antes += pesoOrigen;

    const meta = await sharp(rutaOrigen).metadata();

    const rutaJpg = path.join(DESTINO, destino);
    const rutaWebp = rutaJpg.replace(/\.jpg$/, '.webp');

    await sharp(rutaOrigen)
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toFile(rutaJpg);

    /*
     * Estas fotografías ya venían comprimidas con calidad baja desde 2007.
     * Recomprimir a calidad 80 a veces produce un archivo MÁS grande que el
     * original y encima con más pérdida. Cuando pasa, se conserva el original
     * tal cual: es más pequeño y se ve mejor.
     */
    let pesoJpg = fs.statSync(rutaJpg).size;
    let jpgEsOriginal = false;
    if (pesoJpg >= pesoOrigen) {
      fs.copyFileSync(rutaOrigen, rutaJpg);
      pesoJpg = pesoOrigen;
      jpgEsOriginal = true;
    }

    await sharp(rutaOrigen).webp({ quality: 80, effort: 6 }).toFile(rutaWebp);
    let pesoWebp = fs.statSync(rutaWebp).size;

    /* El WebP solo se conserva si de verdad pesa menos que el JPEG. Si no,
     * se borra y el <picture> se genera sin fuente WebP para esa imagen. */
    let tieneWebp = true;
    if (pesoWebp >= pesoJpg) {
      fs.unlinkSync(rutaWebp);
      tieneWebp = false;
      pesoWebp = pesoJpg;
    }

    despues += pesoWebp;

    manifiesto[destino] = {
      ancho: meta.width,
      alto: meta.height,
      webp: tieneWebp,
    };

    filas.push({
      destino: destino + (jpgEsOriginal ? '  (original)' : ''),
      medidas: meta.width + '×' + meta.height,
      pesoOrigen,
      pesoJpg,
      pesoWebp: tieneWebp ? pesoWebp : 0,
    });
  }

  /*
   * El logotipo es un GIF de 195×56 px con fondo blanco opaco y sin versión
   * vectorial. No se recorta el fondo: en el diseño el logotipo va siempre
   * sobre una placa blanca, igual que en el rótulo real de la fachada.
   */
  const rutaLogo = path.join(ORIGEN, 'logo.gif');
  const pesoLogo = fs.statSync(rutaLogo).size;
  antes += pesoLogo;
  await sharp(rutaLogo)
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(DESTINO, 'logotipo-tecnicars.png'));
  await sharp(rutaLogo)
    .webp({ quality: 92, effort: 6 })
    .toFile(path.join(DESTINO, 'logotipo-tecnicars.webp'));
  const pesoLogoPng = fs.statSync(path.join(DESTINO, 'logotipo-tecnicars.png')).size;
  const pesoLogoWebp = fs.statSync(path.join(DESTINO, 'logotipo-tecnicars.webp')).size;
  despues += Math.min(pesoLogoWebp, pesoLogoPng);
  manifiesto['logotipo-tecnicars.png'] = { ancho: 195, alto: 56, webp: pesoLogoWebp < pesoLogoPng };
  if (pesoLogoWebp >= pesoLogoPng) fs.unlinkSync(path.join(DESTINO, 'logotipo-tecnicars.webp'));
  filas.push({
    destino: 'logotipo-tecnicars.png',
    medidas: '195×56',
    pesoOrigen: pesoLogo,
    pesoJpg: pesoLogoPng,
    pesoWebp: pesoLogoWebp,
  });

  /* Imagen para redes sociales: composición con material real, sin texto
   * inventado. Placa blanca con el logotipo sobre el azul corporativo y la
   * fotografía del almacén de cajas montada a la derecha. */
  await construirOpenGraph();
  const pesoOg = fs.statSync(path.join(DESTINO, 'og-tecnicars.jpg')).size;
  despues += pesoOg;
  manifiesto['og-tecnicars.jpg'] = { ancho: 1200, alto: 630, webp: false };
  filas.push({
    destino: 'og-tecnicars.jpg  (compuesta)',
    medidas: '1200×630',
    pesoOrigen: 0,
    pesoJpg: pesoOg,
    pesoWebp: pesoOg,
  });

  await construirIconos();

  fs.writeFileSync(
    path.join(__dirname, 'imagenes.json'),
    JSON.stringify(manifiesto, null, 2) + '\n'
  );

  console.log('');
  console.log('archivo'.padEnd(36) + 'medidas'.padEnd(11) + 'original'.padEnd(11) + 'jpg/png'.padEnd(11) + 'webp');
  console.log('-'.repeat(80));
  for (const f of filas) {
    console.log(
      f.destino.padEnd(36) +
        f.medidas.padEnd(11) +
        (f.pesoOrigen ? kb(f.pesoOrigen) : '—').padEnd(11) +
        kb(f.pesoJpg).padEnd(11) +
        kb(f.pesoWebp)
    );
  }
  console.log('-'.repeat(80));
  console.log('Total original (los que venían del dominio): ' + kb(antes));
  console.log('Total servido (WebP + la imagen social):     ' + kb(despues));
  console.log('Ahorro: ' + (100 - (despues / antes) * 100).toFixed(1) + ' %');
}

async function construirOpenGraph() {
  const AZUL = '#00527a';
  const fondo = sharp({
    create: { width: 1200, height: 630, channels: 3, background: AZUL },
  });

  /* Placa blanca con el logotipo, a escala 2× para que no se vea blando. */
  const logo = await sharp(path.join(ORIGEN, 'logo.gif'))
    .resize({ width: 390, kernel: 'lanczos3' })
    .toBuffer();
  const placaLogo = await sharp({
    create: { width: 470, height: 192, channels: 3, background: '#ffffff' },
  })
    .composite([{ input: logo, top: 54, left: 40 }])
    .png()
    .toBuffer();

  /* Fotografía del almacén de cajas, montada como placa con filete. */
  const foto = await sharp(path.join(ORIGEN, 'planta1-3.jpg'))
    .resize({ width: 430, height: 430, fit: 'cover', position: 'centre' })
    .toBuffer();
  const placaFoto = await sharp({
    create: { width: 446, height: 446, channels: 3, background: '#ffffff' },
  })
    .composite([{ input: foto, top: 8, left: 8 }])
    .png()
    .toBuffer();

  const barraRoja = await sharp({
    create: { width: 470, height: 22, channels: 3, background: '#e91b23' },
  })
    .png()
    .toBuffer();

  await fondo
    .composite([
      { input: placaLogo, top: 150, left: 92 },
      { input: barraRoja, top: 358, left: 92 },
      { input: placaFoto, top: 92, left: 662 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(DESTINO, 'og-tecnicars.jpg'));
}

async function construirIconos() {
  /* Icono: placa esmaltada azul con doble filete y barra roja. Es el mismo
   * lenguaje del resto del sitio, reducido a 32 px. */
  const svg = Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">' +
      '<rect width="512" height="512" rx="72" fill="#00527a"/>' +
      '<rect x="46" y="46" width="420" height="420" rx="36" fill="none" stroke="#ffffff" stroke-width="20"/>' +
      '<rect x="118" y="150" width="276" height="86" fill="#ffffff"/>' +
      '<rect x="118" y="276" width="276" height="86" fill="#e91b23"/>' +
      '</svg>',
    'utf8'
  );
  const raizProyecto = RAIZ;
  await sharp(svg).resize(180, 180).png().toFile(path.join(raizProyecto, 'apple-touch-icon.png'));
  await sharp(svg).resize(32, 32).png().toFile(path.join(raizProyecto, 'favicon-32.png'));
  fs.writeFileSync(path.join(raizProyecto, 'favicon.svg'), svg);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
