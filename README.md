# Tecnicars Cambios Automáticos — sitio web

Sitio completo del taller, rehecho desde cero a partir del contenido del
dominio original `http://www.cambios-automaticos.com/`. Mismo negocio, mismos
datos y mismos textos; arquitectura, diseño y código nuevos.

Son **doce páginas HTML estáticas**. No hay base de datos, ni servidor de
aplicación, ni framework. Se suben tal cual a cualquier hosting y funcionan.

---

**Copia de muestra en línea:** <https://darioalrio.github.io/CambiosAutomaticos/>

---

## 1. Cómo verlo en su ordenador

Hace falta tener [Node](https://nodejs.org) instalado (versión 16 o
posterior). Desde la carpeta del proyecto:

```bash
node _build/serve.js 4173
```

Y abrir `http://localhost:4173` en el navegador.

Para volver a generar las páginas después de cambiar cualquier cosa:

```bash
node build.js
```

El generador escribe los doce archivos `.html`, el `sitemap.xml`, el
`robots.txt` y el `.htaccess`, y a continuación **comprueba** el resultado. Si
un enlace interno apunta a una página que no existe, si una imagen referenciada
falta, si una página tiene dos `<h1>` o si dos páginas comparten el mismo
título, el proceso termina con error y no da el trabajo por bueno.

---

## 2. Cómo está montado

Los archivos `.html` que hay en la raíz **están generados. No se editan a
mano**: el siguiente `node build.js` los sobrescribe y se pierde el cambio.
Todo se toca en `_build/`.

```
TecniCars/
├── index.html … 404.html      ← generados. No tocar.
├── sitemap.xml, robots.txt    ← generados. No tocar.
├── .htaccess                  ← generado. Configuración de Apache.
├── build.js                   ← el generador. Escribe y verifica.
│
├── _build/                    ← aquí se trabaja. No se sube al hosting.
│   ├── nav.js                 ← datos del negocio y menús
│   ├── data.js                ← servicios, marcas, galerías, preguntas
│   ├── layout.js              ← cabecera, mega-menú, cajón, pie, héroes
│   ├── lib.js                 ← iconos SVG y piezas reutilizables
│   ├── pages/*.js             ← una página, un archivo
│   ├── imagenes.js            ← recompresión de fotos (se lanza a mano)
│   ├── imagenes.json          ← medidas de cada foto, para el HTML
│   └── serve.js               ← servidor de pruebas local
│
├── assets/
│   ├── css/site.css           ← toda la hoja de estilos, un solo archivo
│   ├── js/site.js             ← todo el JavaScript, un solo archivo
│   └── img/
│       ├── *.jpg / *.webp     ← las fotos que se sirven
│       └── _original/         ← copia intacta de las originales. No subir.
│
├── pags/                      ← tres redirecciones del sitio de 2007
├── _original-sitio/           ← el sitio antiguo tal como se descargó. No subir.
│
├── PRODUCT.md                 ← qué es el producto y para quién
├── DESIGN.md                  ← el sistema de diseño
└── PENDIENTE.md               ← lo que falta por decidir o activar
```

### Qué archivo tocar para cambiar cada cosa

| Quiere cambiar… | Abra… |
|---|---|
| El teléfono, el fax, la dirección, las marcas, la garantía | `_build/nav.js` (objeto `SITIO`) |
| El menú de arriba o los enlaces del pie | `_build/nav.js` (`NAV` y `PIE`) |
| La lista de servicios, las marcas, las preguntas frecuentes | `_build/data.js` |
| El texto de una página concreta | `_build/pages/<esa-página>.js` |
| La cabecera, el pie, la barra de móvil, las etiquetas del `<head>` | `_build/layout.js` |
| Un color, un tamaño de letra, un margen | `assets/css/site.css` (bloque `:root`, arriba del todo) |
| El comportamiento del menú, el visor de fotos o el formulario | `assets/js/site.js` |
| Añadir o sustituir fotografías | ver el punto 7 |

Después de cualquier cambio: `node build.js`.

---

## 3. Qué había antes y dónde está ahora

El sitio antiguo tenía **cuatro páginas** y no se tocaba desde febrero de 2008.
Los cinco servicios del taller vivían todos dentro de una sola dirección,
escondidos detrás de un JavaScript que mostraba y ocultaba capas: para Google
sólo existía una página de servicios sin contenido visible. Las instalaciones
usaban pestañas, y dos de ellas eran animaciones Flash, que ningún navegador
reproduce desde 2020: siete fotografías del taller llevaban seis años sin poder
verse.

### Tabla de direcciones: antiguo → nuevo

| Dirección antigua | Dirección nueva | Qué pasa con el contenido |
|---|---|---|
| `/index.html` | `/index.html` | La portada es nueva. El texto «La empresa» que había en ella se ha trasladado íntegro a `/empresa.html` |
| `/pags/servicios.html` | `/servicios.html` | Índice de los seis servicios |
| ↳ capa «reparación» | `/cajas-de-cambio.html` | Página propia, indexable |
| ↳ capa «convertidores» | `/convertidores.html` | Página propia, indexable |
| ↳ capa «desmonte y montaje» | `/desmontaje-y-montaje.html` | Página propia, indexable |
| ↳ capa «mantenimiento» | `/mantenimiento.html` | Página propia, indexable |
| ↳ capa «recogida y entrega» | `/recogida-y-entrega.html` | Página propia, indexable |
| ↳ capa «asistencia telefónica» | `/contacto.html#asistencia` | Sección con enlace directo |
| ↳ lista de marcas con stock | `/marcas.html` | Página propia |
| `/pags/instalaciones.html` | `/instalaciones.html` | Las cuatro pestañas son ahora cuatro secciones con enlace propio. Las fotos que estaban en Flash se han recuperado y se ven |
| `/pags/contactenos.html` | `/contacto.html` | Datos, plano de acceso y formulario |
| — | `/404.html` | No existía. El servidor devolvía la página gris de Apache |

Las tres direcciones antiguas que desaparecen **no se pierden**:

1. En `/pags/` hay tres archivos que redirigen solos al abrirlos (etiqueta
   `refresh` más un enlace visible, para quien llegue desde un marcador).
2. En `.htaccess` están las tres redirecciones `301` de verdad, que son las que
   traspasan el posicionamiento. Si el hosting no es Apache, hay que
   configurarlas allí; están escritas en el punto 9.

### Por qué el menú se ha reorganizado así

De cuatro botones planos a **cinco familias**, que es como pregunta la gente
por teléfono:

- **Servicios** (menú desplegable en tres columnas): «en la caja» —cajas y
  convertidores—, «en el vehículo» —desmontaje y mantenimiento— y el índice
  completo.
- **Marcas** — la pregunta que más se repite: si trabajan o no la caja del
  visitante.
- **Recogida y entrega** — el argumento para quien no está en Madrid; antes
  estaba enterrado como una capa más.
- **El taller** (menú desplegable en dos columnas): la empresa, las
  instalaciones y la asistencia telefónica.
- **Contacto**.

En móvil el mismo menú se abre como cajón lateral con acordeones, y abajo queda
fija una barra con «Llamar», «Correo» y «Cómo llegar».

---

## 4. El sistema de diseño, en corto

La dirección visual se llama **«Rótulo de nave»**: el sitio se presenta con el
oficio de un letrero de fachada de polígono industrial —placa esmaltada, doble
filete, letra condensada de rótulo— en lugar de la foto oscura de motor y las
tres tarjetas con icono que publica todo el sector. El detalle completo está en
`DESIGN.md`.

### De dónde sale cada color

Ninguno es inventado. Todos salen del logotipo o del CSS de 2007.

| Token | Valor | Procedencia |
|---|---|---|
| `--azul-logo` | `#026899` | Muestreado píxel a píxel de `logo.gif` |
| `--azul-marca` | `#006699` | Color de los títulos y del gráfico del teléfono de 2007 |
| `--azul-esmalte` | `#00527a` | El azul de marca oscurecido para llevar texto blanco encima (8,44:1) |
| `--azul-tinta` | `#0b4f72` | Variante para texto azul sobre fondo claro (8,84:1) |
| `--rojo` | `#e91b23` | Rojo de la banda de menú de 2007 (`bg-menu.gif`) |
| `--rojo-tinta` | `#c00e18` | Variante para texto rojo sobre blanco (6,33:1) |
| `--azul-papel` | `#e0eaf4` | Fondo azul claro original (`bg-pags.gif`) |
| `--azul-medio` | `#b2cbe4` | Azul intermedio de `telefono.gif` |
| `--azul-numero` | `#4b87b2` | Azul de marca aclarado hasta el límite de 3:1, para las cifras grandes |
| `--gris-2007` | `#666666` | El gris del texto secundario del CSS antiguo |

**La regla, y por qué:** los colores de la marca no se cambian. Cuando un color
de marca no llega al contraste mínimo con el texto que va encima, no se retoca
el color: se crea una variante «tinta» sólo para el texto y se deja
documentada. Así el azul y el rojo de Tecnicars siguen siendo exactamente los
suyos y, aun así, todo se lee.

### Tipografía

- **Archivo** para rótulos y titulares: condensada y pesada, es letra de
  letrero, no de folleto.
- **Asap** para el texto corrido: humanista, ancha y cómoda en párrafos largos.

Ambas de Google Fonts, con `display=swap` y `preconnect`, y con pila de
respaldo del sistema por si no cargan. La escala de tamaños es fluida
(`clamp()`) de 360 px a 1440 px: no hay saltos al redimensionar la ventana.

---

## 5. Decisiones técnicas y por qué

**HTML estático generado, no un framework.** El sitio son doce archivos que
cualquier hosting sirve. Pero mantener a mano la cabecera y el pie en doce
archivos es garantía de que un día se descuadren, así que hay un generador
propio en Node: la cabecera se escribe una vez y sale en las doce. Node hace
falta para *generar*, no para *servir*.

**Cero librerías.** No hay jQuery, ni Bootstrap, ni GSAP, ni Swiper, ni Font
Awesome. Una hoja de estilos (54 KB) y un archivo de JavaScript (18 KB). Los
iconos son SVG escritos a mano dentro del propio HTML, así que no hay una
petición extra ni una fuente de iconos que descargar. La única dependencia
externa son las dos tipografías de Google.

**El sitio funciona sin JavaScript.** El texto, las fotos y la navegación están
en el HTML. Si el JavaScript no carga, un bloque de navegación de respaldo
muestra las once páginas, los acordeones siguen abriéndose (son `<details>` de
HTML) y la galería se convierte en enlaces a las fotos. Las animaciones de
entrada sólo se activan si una línea en la cabecera confirma que hay
JavaScript: sin él nada se queda invisible.

**El correo no está escrito en el HTML.** Si estuviera, los robots que rastrean
la web buscando direcciones lo tendrían servido. Se guarda partido en dos
(`data-correo="cuenta|dominio"`) y el navegador lo junta al cargar. El enlace
`mailto:` funciona igual y los lectores de pantalla lo leen igual.

**Compatibilidad.** Escrito para Safari 15 en adelante, Chrome, Edge y Firefox:
prefijos `-webkit-` donde hacen falta, `@supports` para `aspect-ratio`, sin
`:has()`, sin `@container`, sin `background-attachment: fixed`, las rejillas
automáticas escritas como `minmax(min(Npx, 100%), 1fr)` y
`env(safe-area-inset-bottom)` para el hueco del móvil sin marco.

**Movimiento.** Un solo gesto en todo el sitio, y con intención: los bloques
«encienden» al entrar en pantalla, como un rótulo al conectarse, con un destello
en el filete interior. Nada gira, nada rebota. Quien tenga activada la opción
de reducir el movimiento en su sistema no ve ninguna animación.

---

## 6. Accesibilidad: qué se ha medido

No es una declaración de intenciones; son comprobaciones hechas sobre el
resultado final.

- **Contraste AA:** se midieron los **852 textos** del sitio, componiendo el
  color real de cada fondo hasta la raíz. Resultado: **0 fallos**. (En una
  primera pasada hubo 2 fallos, en los numerales de planta; se corrigieron
  añadiendo el token `--azul-numero`.)
- **Un solo `<h1>` por página**, verificado por el generador en las doce.
- **Enlace «Saltar al contenido»** en todas las páginas.
- **Teclado:** menú, cajón, acordeones, galería y formulario se manejan enteros
  con teclado. El foco se ve siempre (doble anillo, visible sobre claro y sobre
  oscuro), queda atrapado dentro del cajón y del visor de fotos mientras están
  abiertos, se cierra con `Escape` y vuelve al botón que lo abrió.
- **`aria-expanded`, `aria-controls` y `aria-current`** en menús y acordeones.
- **Zonas pulsables de 44 px** como mínimo.
- **Textos alternativos reales**, escritos mirando cada fotografía, no
  rellenados con el nombre del archivo.
- **Tablas** con `<th scope>` y con su propio desplazamiento horizontal, para
  que no rompan la página en móvil.
- **Sin desbordamiento horizontal**: las doce páginas medidas a 320, 375, 768,
  1024, 1440 y 1920 px. 72 mediciones, ninguna desborda.

---

## 7. Rendimiento e imágenes

**Aviso importante sobre las fotografías.** Las del sitio antiguo son de 2007 y
**ninguna pasa de 466 píxeles de ancho**; la mayoría son de 164×123. No existe
ninguna imagen que pueda servir de fondo a pantalla completa. El diseño está
hecho a la medida de ese límite: cada foto se monta como una placa a su tamaño
real o menor, nunca estirada. Es la razón de que el sitio no tenga una
fotografía gigante de portada, y es una decisión, no un olvido. Si algún día
hay fotos nuevas en condiciones, se sustituyen y el diseño las admite sin
tocar el CSS.

### Antes y después

| | Peso |
|---|---|
| Fotografías originales (24 archivos, incluido el logotipo) | **463,7 KB** |
| Lo que sirve el sitio nuevo (WebP cuando pesa menos, si no el JPEG) | **350,7 KB** |
| **Ahorro** | **113,0 KB — un 24,4 %** |

A eso se suman **64,5 KB** de una imagen nueva de 1200×630 para cuando alguien
comparte un enlace en WhatsApp o en redes (no existía), y **3,5 KB** de iconos
de pestaña y de escritorio (tampoco existían). Contando esos dos añadidos, el
total de imágenes del sitio es de **415,2 KB**, todavía **un 10,5 % menos** que
las fotografías del sitio antiguo por sí solas.

Algunas fotos **engordaban** al recomprimirlas, porque los JPEG de 2007 ya
venían muy apretados. El proceso se queda siempre con el archivo más pequeño de
los dos, y descarta el WebP cuando no mejora al JPEG. Por eso ocho fotos se
sirven en su JPEG y no en WebP.

Además: todas las imágenes llevan `width` y `height` escritos (así la página no
da saltos mientras carga), `loading="lazy"` y `decoding="async"`; sólo la
primera imagen de la portada lleva `fetchpriority="high"`.

### Cambiar o añadir fotografías

1. Dejar el archivo en `assets/img/_original/`.
2. Añadir la pareja «nombre original → nombre nuevo» en la lista `FOTOS` de
   `_build/imagenes.js`.
3. Instalar la herramienta de imagen y lanzar el proceso:

```bash
npm install sharp && node _build/imagenes.js
```

4. **Borrar `node_modules/` antes de subir nada.** No forma parte del sitio.
5. `node build.js`.

---

## 8. Buscadores

- `title` y descripción **distintos en cada página** (el generador falla si se
  repiten), `canonical`, Open Graph y Twitter Card con imagen.
- **Datos estructurados** JSON-LD de tipo `AutoRepair` (taller de reparación)
  con la dirección y el teléfono reales, más `Service` en cada página de
  servicio y `FAQPage` en las preguntas frecuentes. **No** se declaran horario
  ni coordenadas: el taller nunca los publicó y no se inventan (ver
  `PENDIENTE.md`).
- `sitemap.xml` con prioridad por sección y `robots.txt`, ninguno de los cuales
  existía antes.
- El posicionamiento no se pierde: las tres direcciones antiguas redirigen con
  `301`.
- El sitio antiguo estaba sólo en español y no tenía otra versión de idioma, así
  que no hay `hreflang` que declarar.

---

## 8 bis. La copia de muestra de GitHub Pages

Para poder enseñar el sitio antes de que esté en el dominio del taller, cada
vez que se sube un cambio a la rama `main` se publica solo en:

<https://darioalrio.github.io/CambiosAutomaticos/>

Lo hace `.github/workflows/demo.yml`, que ejecuta el generador **en modo
demo**:

```bash
DEMO=1 node build.js
```

Ese modo produce exactamente la misma web, pero con dos diferencias
importantes:

- Las direcciones canónicas, Open Graph y sitemap apuntan a la dirección de
  GitHub, no a `cambios-automaticos.com`.
- **Todas las páginas van marcadas como no indexables** (`noindex`), el
  `robots.txt` se cierra entero (`Disallow: /`) y no se genera `sitemap.xml`.

Es a propósito: una copia de muestra pública no debe competir en Google con la
web real del taller ni quedarse rondando en los buscadores cuando ya no haga
falta.

**Lo que está guardado en el repositorio es la web de verdad**, la que se sube
al hosting del cliente. La versión de muestra se construye al vuelo y no se
guarda.

Cuando el sitio pase al dominio definitivo, basta con borrar el archivo del
flujo de trabajo y desactivar Pages en los ajustes del repositorio.

---

## 9. Página de error 404: cómo activarla

El archivo `404.html` ya está hecho. Falta decirle al servidor que lo use. Hoy
el dominio no lo tiene configurado y devuelve la página gris de Apache.

**Apache** (es el servidor actual del dominio): ya está puesto en el `.htaccess`
que se sube con el sitio.

```apache
ErrorDocument 404 /404.html
```

**Nginx** — en el bloque `server` del archivo de configuración:

```nginx
error_page 404 /404.html;
```

**Netlify, Vercel y Cloudflare Pages**: no hay que hacer nada. Los tres detectan
solos un archivo llamado `404.html` en la raíz y lo usan.

---

## 10. Antes de publicar

Lo que hay que resolver está detallado en **`PENDIENTE.md`**. En una línea cada
cosa:

1. **El certificado HTTPS del dominio no es válido** (no coincide con el
   nombre). Hasta arreglarlo, no activar el bloque `https` comentado del
   `.htaccess` y cambiar `base` en `_build/nav.js` a `http://`.
2. **Decidir qué hace el formulario de contacto.** Ahora mismo abre el programa
   de correo del visitante con el mensaje ya escrito, y así se le dice antes de
   pulsar. Las tres alternativas para convertirlo en un envío de verdad están
   en `PENDIENTE.md`.
3. **Faltan datos que el sitio antiguo nunca publicó**: horario, razón social y
   CIF, coordenadas exactas. No se han inventado.
4. **No hay páginas legales** (aviso legal, privacidad, cookies). El sitio
   antiguo tampoco las tenía, y la ley española las exige.
5. **Subir sólo lo que es el sitio**: no hacen falta `_build/`,
   `_original-sitio/`, `assets/img/_original/`, ni los archivos `.md`.
