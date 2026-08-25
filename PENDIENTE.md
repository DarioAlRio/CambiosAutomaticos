# Pendiente antes de publicar

Todo lo que hay en el sitio salió del dominio antiguo. Lo que no estaba allí,
no se ha inventado: está en esta lista. Cada punto dice qué falta, dónde se
nota y qué hay que hacer.

---

## 1. Datos que el sitio antiguo nunca publicó

Ninguno de estos aparecía en las cuatro páginas de 2007-2008, ni en el código
fuente, ni en ninguna imagen. No hay PDF ni catálogo en el dominio del que
sacarlos. **No se han puesto en la web.**

| Dato | Dónde haría falta | Qué hacer |
|---|---|---|
| **Horario de apertura** | Contacto, y los datos estructurados de Google | Decirlo y lo añado en `_build/nav.js`. Es lo que más pesa: sin horario, la ficha de Google queda coja y el visitante no sabe si puede acercarse hoy |
| **Razón social y CIF** | Pie de página y aviso legal | Obligatorio por ley para el aviso legal (ver punto 5) |
| **Coordenadas exactas de la nave** | Datos estructurados y un posible mapa | Sin ellas no se puede poner `geo` en el JSON-LD ni un mapa fiable. Hoy la página de contacto lleva el plano dibujado a mano que publicaba el taller, que es lo que había |
| **Número de WhatsApp** | Barra de móvil y formulario | Si hay uno de empresa, la barra inferior del móvil puede llevar botón de WhatsApp y el formulario puede mandar el mensaje por ahí en vez de por correo |
| **Precios y plazos de reparación** | Cualquier página de servicio | El taller nunca publicó tarifas. La pregunta frecuente correspondiente lo dice tal cual: que no hay precios publicados y que hay que llamar. Si algún día hay tarifa pública, va en `_build/data.js` |
| **Certificaciones, diplomas o distribuciones oficiales** | La empresa | El sitio antiguo hablaba de formación pero no enseñaba ningún título ni número de registro. No se afirma ninguno |
| **Año exacto de fundación** | La empresa | El texto de 2007 decía que llevaba «12 años en el sector». De ahí sale el **1995** que aparece en la web, que es una resta, no un dato publicado. Si la fecha real es otra, se corrige `desde` en `_build/nav.js` |
| **Redes sociales** | Pie de página | No había ninguna. El pie no lleva iconos sociales |

---

## 2. El formulario de contacto

**Un sitio estático no puede enviar correo por sí mismo.** No hay servidor
detrás, así que no hay nada que reciba los datos.

Lo que hace hoy el formulario de `contacto.html`: valida los campos en el
navegador, y al pulsar el botón **abre el programa de correo del visitante con
el mensaje ya redactado y dirigido al taller**. El propio formulario lo avisa
antes de que se pulse nada, con estas palabras: «se abrirá su programa de correo
con el mensaje ya redactado y dirigido al taller. Usted solo tiene que darle a
enviar».

**No finge que ha enviado nada.** Nunca aparece un «gracias, hemos recibido su
mensaje» que sea mentira.

Tiene además una trampa antispam: un campo invisible que las personas no ven ni
pueden enfocar y que los robots rellenan por costumbre. Si llega relleno, no se
compone ningún correo.

### Las tres formas de convertirlo en un envío de verdad

**a) El PHP del propio hosting.** Es la mejor opción si el hosting actual sigue
admitiendo PHP, porque no mete a nadie más de por medio y el correo sale del
propio dominio. El sitio antiguo **no tenía ningún formulario**, así que no hay
ningún script que reaprovechar: habría que subir un `enviar.php` y cambiar en
`_build/pages/contacto.js` el `<form>` para que apunte a él con `method="post"`.

**b) Formspree** (`formspree.io`). Se crea una cuenta, dan una dirección, y esa
dirección se pone en el `action` del formulario. Funciona sin tocar el hosting.
Gratis hasta un número de mensajes al mes; los datos pasan por un tercero, lo
que hay que mencionar en la política de privacidad.

**c) Netlify Forms.** Sólo sirve si el sitio se aloja en Netlify. Se añade
`netlify` como atributo del `<form>` y ellos recogen los mensajes en un panel.
Cero configuración, pero ata el sitio a ese hosting.

Sea cual sea la elegida, hay que mantener el aviso honesto mientras no esté
activa.

---

## 3. Averías heredadas del sitio antiguo

Estas ya existían. Algunas se han arreglado al rehacer el sitio; otras dependen
del hosting y hay que resolverlas ahí.

| Avería | Estado |
|---|---|
| **El certificado HTTPS no coincide con el dominio.** Al entrar por `https://` el navegador da un aviso de seguridad | **Sin resolver: depende del hosting.** Hay que pedir un certificado válido para `cambios-automaticos.com` y `www.cambios-automaticos.com` (Let's Encrypt es gratuito y lo ofrecen casi todos). Mientras tanto: no descomentar el bloque `https` del `.htaccess`, y poner `base: 'http://…'` en `_build/nav.js` para que las direcciones canónicas no apunten a una URL que da error |
| **No había `robots.txt`** | Resuelto: lo genera `build.js` |
| **No había `sitemap.xml`** | Resuelto: lo genera `build.js` |
| **No había página de error propia.** Una dirección inexistente daba la página gris de Apache y, encima, un segundo error | Resuelto en el sitio (`404.html` y `ErrorDocument` en el `.htaccess`). **Confirmar que el hosting lee el `.htaccess`** |
| **Las dos galerías Flash de instalaciones no se veían desde 2020** | Resuelto: las siete fotografías se han extraído de los archivos `.swf` y hoy se ven como fotos normales |
| **Google Analytics muerto.** El sitio cargaba `urchin.js`, el sistema antiguo de Google (cuenta `UA-2057588-2`), retirado hace años: no medía nada y sólo hacía más lenta la página | **Retirado.** El sitio nuevo no lleva ninguna analítica, ni ningún píxel, ni Cookiebot, ni gestor de etiquetas. Si se quiere medir visitas, hay que decidirlo: con Google Analytics 4 haría falta banner de cookies; con una analítica sin cookies (Plausible, Fathom, Umami) no |
| **HTML inválido** (`<p><h1>` anidados, tablas de maquetación) | Resuelto: el HTML nuevo es válido |
| **No había favicon** | Resuelto: se ha dibujado uno con la placa esmaltada de la marca |
| **El logotipo sólo existe como GIF de 195×56 sobre fondo blanco opaco.** No hay vectorial ni versión con fondo transparente | **Sin resolver.** Si aparece el original del rotulista o del diseñador, se sustituye y gana nitidez en pantallas buenas. Mientras tanto el logotipo va siempre sobre una placa blanca, que es donde ese GIF se ve bien |

---

## 4. Las fotografías

Ninguna imagen del sitio antiguo pasa de **466 píxeles de ancho**, y la mayoría
son de 164×123. Son de 2007 y están muy comprimidas. El diseño está hecho para
que eso no se note —cada foto va montada como una placa a su tamaño real o
menor, nunca estirada— pero es un techo real.

**Lo que más mejoraría el sitio, con diferencia, son fotografías nuevas del
taller**: la nave, las estanterías de cajas, los bancos de trabajo, los
elevadores con un coche encima. Con el móvil de hoy y buena luz basta. Si
llegan, se sustituyen siguiendo el punto 7 del `README.md`; el diseño las
acepta sin tocar el CSS.

No se ha metido **ninguna** foto de banco de imágenes. Todo lo que se ve es del
taller.

---

## 5. Páginas legales: no existen y la ley las exige

El sitio antiguo no tenía aviso legal, ni política de privacidad, ni política de
cookies, ni cláusula de protección de datos en el formulario. El nuevo tampoco,
porque **no se pueden inventar**: un aviso legal lleva la razón social, el CIF,
el domicilio y los datos de registro mercantil, y una política de privacidad
lleva quién trata los datos, para qué y durante cuánto tiempo.

Lo que exige la normativa española a una web de empresa:

- **Aviso legal** (LSSI-CE, art. 10): razón social, CIF, domicilio, correo de
  contacto y datos registrales.
- **Política de privacidad** (RGPD y LOPDGDD): necesaria en cuanto el
  formulario recoja un nombre y un teléfono, con una casilla de aceptación
  junto al botón de envío.
- **Política de cookies**: **hoy no hace falta**, porque el sitio no pone
  ninguna cookie ni carga ningún rastreador. Si se añade Google Analytics,
  pasa a ser obligatoria junto con un banner de consentimiento.

En cuanto haya razón social y CIF, se redactan las páginas y se enlazan desde el
pie. Es media hora de trabajo; lo que falta es el dato.

---

## 6. Cosas que se decidieron así a propósito

Para que nadie las tome por olvidos:

- **No hay mapa interactivo.** El dominio antiguo no tenía ninguno y no se han
  publicado nunca las coordenadas. En su lugar está el plano de acceso dibujado
  a mano que publicaba el taller, y la página lo dice.
- **No hay testimonios ni logotipos de clientes.** No había ninguno.
- **No hay precios.** No había ninguno.
- **No hay blog ni noticias.** No había nada que llevar allí, y una sección de
  noticias vacía envejece peor que no tenerla.
- **No hay versión en otros idiomas.** El sitio antiguo estaba sólo en español.
