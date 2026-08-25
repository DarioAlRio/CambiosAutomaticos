# Sistema de diseño — Tecnicars

Este documento describe lo que hay construido, no lo que se pretendía
construir. Todo lo que se afirma aquí es comprobable abriendo
`assets/css/site.css`.

---

## La dirección: «Rótulo de nave»

**Tesis.** Un taller que sólo abre cambios automáticos se presenta con el
oficio de su propio letrero de fachada, no con la foto oscura de motor y las
tres tarjetas de icono que publica todo el sector.

**Mundo propio.** Placas esmaltadas de doble filete sobre esmalte azul, letra
de rótulo condensada y pesada, barra roja de acento y aluminio claro para leer.
Toda fotografía va montada como placa a su tamaño nativo.

**Relato.** El visitante entiende en un vistazo que aquí se repara la caja en
vez de sustituirla, lo comprueba viendo el almacén y el banco, y llama.

**Primer golpe de vista.** Tablero azul a todo ancho, «CAMBIOS AUTOMÁTICOS» en
letra de rótulo, el teléfono en placa roja a la izquierda, la fachada real
montada a la derecha y una banda con los datos de la nave debajo.

Esta declaración va escrita como comentario en la cabecera de las doce páginas
generadas, para que quien abra el código sepa a qué obedece lo que ve.

### La restricción que manda sobre todo

Ninguna fotografía del taller pasa de **466 píxeles de ancho**; la mayoría son
de 164×123. Esto no es un detalle de producción: es lo que define el sistema.

Un sitio de 2026 se diseña con fotografía grande a sangre. Aquí no existe una
sola imagen que aguante eso. La decisión fue no fingir: **cada fotografía se
monta como una placa, con su filete y su pie, a su tamaño nativo o por debajo.**
Nunca se amplía, nunca se recorta a un panorámico imposible, nunca se pone de
fondo con texto encima. En la galería incluso se pintan más estrechas que su
ancho real, para que en pantallas de alta densidad se vean nítidas.

El resultado es un sitio construido de superficies —esmalte, aluminio, filete—
en lugar de un sitio construido de fotografías. Es la única forma honrada de
usar este material, y da un carácter que una plantilla con foto de banco de
imágenes no tendría.

---

## 1. Color

Los diez tokens del bloque `:root` de `site.css`. Ninguno inventado.

| Token | Valor | De dónde sale | Dónde se usa |
|---|---|---|---|
| `--azul-logo` | `#026899` | Muestreado píxel a píxel de `logo.gif` | Es la referencia de marca; de él salen los demás azules |
| `--azul-marca` | `#006699` | Color de los títulos y del gráfico del teléfono del sitio de 2007 | Detalles y filetes |
| `--azul-esmalte` | `#00527a` | El azul de marca oscurecido hasta que el blanco encima da 8,44:1 | Tablero de portada, rótulos de página, placas azules, banda de acción, pie |
| `--azul-esmalte-hondo` | `#003f5e` | El mismo, un paso más oscuro | Estados `hover` sobre esmalte |
| `--azul-tinta` | `#0b4f72` | Variante de lectura: 8,84:1 sobre blanco | **Todo texto azul sobre fondo claro**: titulares, enlaces, etiquetas |
| `--rojo` | `#e91b23` | Rojo de la banda de menú de 2007 (`bg-menu.gif`). Blanco encima: 4,52:1 | Botón principal, barra de acento, familia activa del menú |
| `--rojo-hondo` | `#c8121a` | El mismo, un paso más oscuro | `hover` del botón rojo |
| `--rojo-tinta` | `#c00e18` | Variante de lectura: 6,33:1 sobre blanco | **Todo texto rojo sobre fondo claro**: enlaces de acción, errores, signos |
| `--azul-papel` | `#e0eaf4` | Fondo azul claro original (`bg-pags.gif`) | Fondos suaves, placas claras |
| `--azul-medio` | `#b2cbe4` | Azul intermedio de `telefono.gif` | Texto secundario **sobre esmalte** (5,3:1), nunca sobre blanco |
| `--azul-numero` | `#4b87b2` | El azul de marca aclarado hasta el límite exacto de 3:1 | Sólo los numerales grandes de planta |
| `--gris-2007` | `#666666` | El gris del texto secundario del CSS antiguo | Notas y pies |

Neutros: `--papel` `#ffffff`, `--aluminio` `#eef2f5`, `--aluminio-hondo`
`#dde5eb`, `--tinta` `#1c2b33`, `--tinta-suave` `#4a5860`. Líneas: `--linea`
`#0d3d59` para el filete exterior y `--linea-fina` (el mismo al 28 %) para el
interior.

### La regla de las tintas

**El color de marca no se cambia nunca para que el texto se lea.** Cuando el
azul o el rojo de Tecnicars no llegan al mínimo de contraste con el texto que
llevan encima, se crea una variante «tinta» —más oscura— destinada
exclusivamente a ese texto, y el color de marca se queda como está para los
fondos, los filetes y las superficies.

Por eso hay `--azul-marca` y `--azul-tinta`, y `--rojo` y `--rojo-tinta`. El
visitante ve los colores del taller; el lector los lee sin esfuerzo.

Excepción documentada: `--azul-numero`. Los numerales «01» y «02» de las
plantas son cifras decorativas de más de 40 px, es decir, texto grande, cuyo
mínimo AA es 3:1 y no 4,5:1. Se aclaró el azul de marca justo hasta ese límite
(3,88:1 sobre blanco, 3,45:1 sobre aluminio) y no más allá.

### Contraste medido

Se midieron los **852 textos** de las doce páginas, componiendo el color real
de cada fondo hasta la raíz del documento y aplicando el umbral de texto grande
donde correspondía. **Cero fallos.** En la primera pasada hubo dos, ambos en los
numerales de planta; de ahí salió `--azul-numero`.

---

## 2. Tipografía

Dos familias, ambas de Google Fonts, ambas con pila de respaldo del sistema.

**Archivo** (`--letra-rotulo`) para rótulos, titulares, botones y etiquetas. Es
una grotesca de anchura variable: se usa condensada (entre el 90 % y el 92 %) y
pesada (700-900). Es letra de letrero, no de folleto, y es lo que hace que un
titular de esta web se parezca a la fachada de la nave y no a un folleto de
concesionario. Respaldo: `Archivo Narrow, Helvetica Neue, Arial`.

**Asap** (`--letra-texto`) para el texto corrido. Humanista, de formas abiertas
y cómoda en párrafos largos, con cursiva de verdad. Respaldo: `system-ui,
-apple-system, Segoe UI, Roboto, Arial`.

El sitio de 2007 no usaba ninguna tipografía reconocible —era Arial de sistema
sobre imágenes de texto— así que no había continuidad tipográfica que
conservar. Lo que sí se conserva es el gesto: los titulares de entonces eran
GIF de letra condensada en mayúsculas; Archivo es esa misma voz, en texto de
verdad.

### Escala

Fluida con `clamp()`, calculada de 360 px a 1440 px de ventana. No hay saltos:
el texto crece de forma continua al ensanchar la ventana.

| Token | 360 px | 1440 px | Uso |
|---|---|---|---|
| `--t-micro` | 11 px | 12 px | Pies de galería, medidas |
| `--t-rotulo` | 12 px | 13 px | Etiquetas en versal y espaciadas |
| `--t-pequeno` | 14 px | 15 px | Notas, botones normales |
| `--t-base` | 16 px | 18 px | Texto corrido |
| `--t-guia` | 17 px | 21 px | Párrafo de entrada de sección |
| `--t-h3` | 20 px | 24 px | Titulares de placa y de acordeón |
| `--t-h2` | 28 px | 44 px | Titulares de sección |
| `--t-h1` | 36 px | 64 px | Titular de página interior |
| `--t-tablero` | 44 px | 96 px | El titular de la portada |
| `--t-cifra` | 36 px | 60 px | Numerales grandes |

### Jerarquía

Un `<h1>` por página, siempre. `<h2>` abre sección, `<h3>` abre placa. Los
titulares llevan **más aire encima que debajo**, para que se lean pegados a lo
que titulan y separados de lo anterior. El texto corrido no pasa de 68
caracteres por línea.

Las etiquetas de rótulo (antetítulos, etiquetas de campo, pies de galería) van
en versales con `letter-spacing` de 0,06 a 0,1 em. Es el recurso del rotulista:
el texto pequeño en mayúsculas espaciadas se lee de lejos.

---

## 3. Rejilla y espacio

Una sola escala de espacio, de `--e1` (4 px) a `--e9` (96 px), en pasos que
duplican o se acercan a duplicar. Todo margen y todo relleno del sitio sale de
ahí; no hay números sueltos.

- `--seccion-y`: de 56 px a 104 px, fluido. Es el aire vertical de cada sección.
- `--margen-lateral`: de 20 px a 40 px, fluido.
- `--ancho`: 1200 px, el contenedor normal.
- `--ancho-estrecho`: 736 px, para texto de lectura larga.

Las rejillas automáticas se escriben siempre como
`repeat(auto-fit, minmax(min(Npx, 100%), 1fr))`. El `min(…, 100%)` es lo que
impide que una celda con mínimo de 13 rem desborde una pantalla de 320 px.

Cuando una rejilla de tres columnas quedaría con una placa huérfana en la
última fila, esa placa pasa a ocupar la fila entera y se reordena en horizontal
(`.placa-enlace--fila`). No se dejan huecos vacíos.

---

## 4. Formas, filete y sombra

**Radio: 3 px.** Casi recto. Una placa esmaltada de fachada no tiene esquinas
redondeadas de aplicación móvil.

**Filete: 2 px** en color `--linea` (`#0d3d59`), más un segundo filete interior
de 1 px al 28 % separado 6 px del borde. **El doble filete es la firma del
sistema**: aparece en las placas, en las fotografías montadas, en la galería, en
la introducción del formulario. Es lo que hace que una tarjeta de este sitio no
se parezca a una tarjeta de cualquier otro.

**Remaches.** Las placas azules grandes llevan cuatro puntos en las esquinas,
hechos con degradados radiales. Es el detalle que remata la metáfora: la placa
va atornillada a la pared.

**Sombras.** Tres niveles, todos con desplazamiento vertical y desenfoque
amplio, nunca un halo simétrico alrededor del elemento. Son sombras de objeto
apoyado, no de recuadro flotante.

---

## 5. Componentes

### Placa (`.placa`)

La pieza base. Fondo, filete de 2 px, filete interior de 1 px, radio de 3 px.
Variantes: `--azul` (esmalte, con remaches), `--blanca`, `--clara` (papel azul),
`--aluminio`. Todo lo demás del sitio es una placa especializada.

### Placa-enlace (`.placa-enlace`)

La tarjeta de servicio. Icono, titular, texto y una acción en rojo con flecha.
El enlace real envuelve sólo el titular —para que el lector de pantalla anuncie
un destino con sentido— pero **la placa entera es pulsable**, mediante un
seudoelemento que la cubre. Al pasar el ratón, el filete se pone rojo y la
sombra sube un nivel.

### Placa-foto (`.placa-foto`)

Fotografía montada: la imagen a su tamaño, el doble filete alrededor y un pie
en versales bajo una línea. Es la única forma en que aparece una fotografía en
todo el sitio.

### Cifra (`.cifra`)

Numeral grande en letra de rótulo con su etiqueta debajo. Se usa para los cinco
elevadores, las dos plantas, los doce meses de garantía y los años de oficio.
Cada cifra es un dato del dominio, no un adorno.

### Botones

Cuatro variantes: `--rojo` (acción principal: llamar, preparar el correo),
`--azul` (acción secundaria sobre claro), `--claro` (sobre esmalte) y `--linea`
(contorno). Todos en letra de rótulo, versales, con `letter-spacing` de 0,06 em.
Altura mínima de 46 px, y 54 px en la variante grande: por encima de los 44 px
que exige un dedo.

### Campos de formulario

Etiqueta en versales azul tinta, con «(opcional)» escrito cuando el campo no es
obligatorio —en vez del asterisco que nadie descifra— y ayuda en gris debajo. El
control lleva el mismo filete de 2 px que las placas. Al enfocar, contorno rojo
de 3 px. En error, el filete se pone rojo, el fondo toma un rosa muy leve y el
mensaje aparece bajo el campo, enlazado con `aria-describedby`.

### Navegación

Cabecera pegada arriba, con el logotipo siempre sobre placa blanca —es un GIF
con fondo blanco opaco, y así se ve bien— y el teléfono en placa roja a la
derecha.

En escritorio, las dos familias grandes abren **mega-menú en columnas**, cada
enlace con su descripción de una línea, más una imagen destacada con su propio
titular. La familia activa se marca con una barra roja debajo, como el rótulo
que se ilumina.

En móvil, el mismo menú es un **cajón lateral** con acordeones. Se abre desde el
botón de menú, atrapa el foco mientras está abierto, se cierra con `Escape` o
tocando fuera, y devuelve el foco al botón que lo abrió.

Abajo del todo en móvil, **barra fija** con Llamar, Correo y Cómo llegar, con
`env(safe-area-inset-bottom)` para no quedar debajo de la franja del iPhone.

Y un bloque de navegación de respaldo dentro de `<noscript>`, con las once
páginas, para quien no tenga JavaScript.

### Héroes

Dos, no uno:

- **Tablero de portada.** Franja de esmalte a todo ancho con una textura de
  rayado finísimo (chapa esmaltada), el titular en letra de rótulo a tamaño de
  hasta 96 px, el teléfono en placa roja, la fotografía de la fachada montada
  al lado y una banda de datos de la nave abajo.
- **Rótulo de página interior.** Más bajo: migas de pan, antetítulo, titular,
  entradilla y, cuando la página lo pide, una fotografía montada. La barra roja
  bajo el titular es el remate.

### Galería y visor

Rejilla de fotografías montadas, cada una con su pie y una lupa. Al pulsar, se
abre un visor a pantalla completa con la foto, su descripción y sus medidas
reales. El visor atrapa el foco, se recorre con las flechas del teclado y se
cierra con `Escape`. **Sin JavaScript, cada celda es simplemente un enlace a la
fotografía**: la galería sigue funcionando.

### Acordeón

Construido sobre `<details>` y `<summary>` de HTML, no sobre JavaScript. Se abre
y se cierra aunque el JavaScript falle. El signo gira 180° al abrir. En los
grupos marcados como únicos, abrir uno cierra el anterior.

### Tablas

Con `<th scope>`, dentro de un marco con su propio desplazamiento horizontal y
un ancho mínimo de 34 rem. Una tabla larga se desplaza dentro de su marco; nunca
empuja la página.

### Aviso (`.aviso`)

La pieza para decir la verdad: «este plano es el que publicaba el taller», «no
hay precios publicados». Aparece siempre que el sitio tiene que explicar una
ausencia en lugar de disimularla. Es un componente del sistema, no un parche.

---

## 6. Movimiento

**Un solo gesto en todo el sitio: un rótulo que se enciende.**

Al entrar en pantalla, un bloque sube 14 px hasta su sitio y aparece, con una
curva de salida exponencial de 620 ms. A la vez, el filete interior de su placa
**destella** —un golpe de brillo de 780 ms que se apaga— como el tubo de un
letrero al conectarse. El titular de la portada se descubre de abajo arriba con
una máscara, como una chapa que se destapa.

Nada gira. Nada rebota. Nada se repite en bucle. No hay carruseles automáticos.

**Sólo se ocultan de partida los elementos que empiezan por debajo del borde
inferior de la ventana**, y hay tres redes de seguridad (un repaso a los 1,5 s,
otro al volver a la pestaña y otro al restaurar la página desde el historial).
Ningún bloque puede quedarse invisible por un fallo del observador.

Sin la clase `js` en el `<html>` —es decir, sin JavaScript— todo se ve
directamente, sin animación.

`prefers-reduced-motion: reduce` desactiva las tres animaciones y reduce toda
transición del sitio a 0,01 ms.

---

## 7. Accesibilidad

Reglas del sistema, no revisiones a posteriori:

- **Foco visible de doble anillo**: uno claro y uno oscuro, para que se vea
  igual sobre esmalte azul que sobre papel blanco. Se usa `:focus-visible`, así
  que no aparece al hacer clic con el ratón.
- **Zona pulsable mínima de 44 px** en todo lo que se toca.
- **Contraste AA verificado por medición**, no por criterio: 852 textos, cero
  fallos.
- **Un `<h1>` por página**, comprobado por el generador.
- **Enlace de salto al contenido** como primer elemento enfocable.
- **`aria-expanded`, `aria-controls` y `aria-current`** en menús y acordeones.
- **Foco atrapado** en el cajón y en el visor mientras están abiertos; `Escape`
  cierra; el foco vuelve al elemento que abrió.
- **Textos alternativos escritos mirando cada fotografía**. Ninguno dice
  «imagen» ni repite el nombre del archivo.
- **Sin desbordamiento horizontal** en ninguna de las doce páginas, a 320, 375,
  768, 1024, 1440 y 1920 px.

## 8. Impresión

Hay una hoja de impresión: se quitan la cabecera pegada, la barra de móvil y el
cajón, y el texto pasa a tinta negra. Alguien va a imprimir la página de
contacto para llevarse la dirección en el coche.

---

## 9. Qué no hace este sistema

Anotado a propósito, para que nadie lo añada luego por costumbre:

- **No hay tres tarjetas con icono como recurso por defecto.** Cada página
  tiene la forma que le pide su contenido: comparativa a dos lados en
  convertidores, recorrido por la nave en instalaciones, tabla de marcas,
  numerales de planta.
- **No hay degradados de color de moda**, ni azul a violeta, ni superficies de
  cristal esmerilado.
- **No hay carruseles automáticos** ni contadores que suben solos.
- **No hay iconos de librería.** Los diecisiete iconos del sitio están dibujados
  a mano en SVG, con el mismo grosor de trazo, y cada uno representa lo que
  nombra: la caja de cambios tiene campana de acoplamiento y eje de salida; el
  convertidor tiene corona, buje y álabes.
- **No hay fotografía de banco de imágenes.** Ni una. Todo lo que se ve es del
  taller.

---

*Nota de método: la generación de este documento corresponde normalmente a un
subagente de la herramienta de diseño. En esta sesión los subagentes están
desactivados, así que está escrito directamente, leyendo el CSS construido en
vez de las intenciones de partida.*
