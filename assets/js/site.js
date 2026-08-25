/*
 * site.js — el único JavaScript del sitio.
 *
 * Sin librerías y sin módulos: una función anónima que se ejecuta sola.
 * Todo lo que hay aquí es mejora, no requisito. Con JavaScript desactivado
 * el sitio sigue siendo legible y navegable: el menú se sustituye por sus
 * enlaces, los acordeones son <details> nativos, la galería son enlaces a
 * las imágenes y el formulario avisa de que hace falta el navegador.
 */

(function () {
  'use strict';

  var d = document;

  function $(sel, raiz) {
    return (raiz || d).querySelector(sel);
  }

  function $$(sel, raiz) {
    return Array.prototype.slice.call((raiz || d).querySelectorAll(sel));
  }

  /* Elementos que pueden recibir el foco dentro de un contenedor. */
  var ENFOCABLES =
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]),' +
    ' select:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

  function enfocables(raiz) {
    return $$(ENFOCABLES, raiz).filter(function (el) {
      return el.offsetWidth > 0 || el.offsetHeight > 0 || el === d.activeElement;
    });
  }

  /*
   * Atrapa el foco dentro de un contenedor: al llegar al último elemento con
   * el tabulador vuelve al primero, y al revés. Se usa en el cajón lateral y
   * en el visor de imágenes.
   */
  function atraparFoco(contenedor, evento) {
    if (evento.key !== 'Tab') return;
    var lista = enfocables(contenedor);
    if (!lista.length) return;
    var primero = lista[0];
    var ultimo = lista[lista.length - 1];
    if (evento.shiftKey && d.activeElement === primero) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && d.activeElement === ultimo) {
      evento.preventDefault();
      primero.focus();
    }
  }

  /* ------------------------------------------------------------- correos */

  /*
   * La dirección de correo no está escrita en el HTML: viene partida en dos
   * en data-correo="cuenta|dominio". Aquí se une y se convierte en un
   * mailto: normal. Los robots que rascan HTML no encuentran nada; el
   * enlace resultante es real y accesible.
   */
  function montarCorreos() {
    $$('[data-correo]').forEach(function (enlace) {
      var partes = enlace.getAttribute('data-correo').split('|');
      if (partes.length !== 2) return;
      var direccion = partes[0] + '@' + partes[1];
      var asunto = enlace.getAttribute('data-asunto');
      enlace.href = 'mailto:' + direccion + (asunto ? '?subject=' + encodeURIComponent(asunto) : '');
      var texto = $('[data-correo-texto]', enlace);
      if (texto && texto.textContent.trim() === 'Escríbanos') {
        texto.textContent = direccion;
      }
      enlace.removeAttribute('data-correo');
    });
  }

  /* ---------------------------------------------------------- mega-menú */

  function iniciarMega() {
    var items = $$('[data-mega]');
    if (!items.length) return;

    var abierto = null;
    var temporizador = null;

    function cerrar(item) {
      if (!item) return;
      var boton = $('.nav__enlace--boton', item);
      var panel = $('.mega', item);
      boton.setAttribute('aria-expanded', 'false');
      panel.hidden = true;
      if (abierto === item) abierto = null;
    }

    function abrir(item) {
      if (abierto && abierto !== item) cerrar(abierto);
      var boton = $('.nav__enlace--boton', item);
      var panel = $('.mega', item);
      boton.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
      abierto = item;
    }

    items.forEach(function (item) {
      var boton = $('.nav__enlace--boton', item);

      boton.addEventListener('click', function () {
        if (boton.getAttribute('aria-expanded') === 'true') cerrar(item);
        else abrir(item);
      });

      /* En escritorio también se abre al pasar el ratón, con un pequeño
         retardo al salir para que no se cierre al cruzar el hueco. */
      item.addEventListener('mouseenter', function () {
        if (!window.matchMedia('(hover: hover) and (min-width: 64rem)').matches) return;
        window.clearTimeout(temporizador);
        abrir(item);
      });

      item.addEventListener('mouseleave', function () {
        if (!window.matchMedia('(hover: hover) and (min-width: 64rem)').matches) return;
        temporizador = window.setTimeout(function () {
          cerrar(item);
        }, 220);
      });

      /* Si el foco sale del bloque entero con el tabulador, se cierra. */
      item.addEventListener('focusout', function (e) {
        if (!item.contains(e.relatedTarget)) cerrar(item);
      });
    });

    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && abierto) {
        var boton = $('.nav__enlace--boton', abierto);
        cerrar(abierto);
        boton.focus();
      }
    });

    d.addEventListener('click', function (e) {
      if (abierto && !abierto.contains(e.target)) cerrar(abierto);
    });
  }

  /* --------------------------------------------------- cajón de móvil */

  function iniciarCajon() {
    var cajon = $('#cajon');
    var velo = $('[data-velo]');
    var abrirBoton = $('[data-abrir-cajon]');
    var cerrarBoton = $('[data-cerrar-cajon]');
    if (!cajon || !abrirBoton) return;

    var previo = null;

    function abrir() {
      previo = d.activeElement;
      cajon.hidden = false;
      if (velo) velo.hidden = false;
      abrirBoton.setAttribute('aria-expanded', 'true');
      d.documentElement.style.overflow = 'hidden';
      var primero = enfocables(cajon)[0];
      if (primero) primero.focus();
    }

    function cerrar() {
      cajon.hidden = true;
      if (velo) velo.hidden = true;
      abrirBoton.setAttribute('aria-expanded', 'false');
      d.documentElement.style.overflow = '';
      /* El foco vuelve de donde salió. Si de donde salió no puede recibirlo
         (por ejemplo el propio <body>), vuelve al botón que abrió el cajón:
         nunca se queda perdido al principio del documento. */
      var destino = previo && previo.focus && previo !== d.body ? previo : abrirBoton;
      destino.focus();
    }

    abrirBoton.addEventListener('click', abrir);
    if (cerrarBoton) cerrarBoton.addEventListener('click', cerrar);
    if (velo) velo.addEventListener('click', cerrar);

    cajon.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        cerrar();
        return;
      }
      atraparFoco(cajon, e);
    });

    /* Al pasar a escritorio, el cajón deja de tener sentido. */
    var anchoEscritorio = window.matchMedia('(min-width: 64rem)');
    var alCambiar = function (e) {
      if (e.matches && !cajon.hidden) cerrar();
    };
    if (anchoEscritorio.addEventListener) anchoEscritorio.addEventListener('change', alCambiar);
    else if (anchoEscritorio.addListener) anchoEscritorio.addListener(alCambiar);
  }

  /* ------------------------------------------------------------ acordeón */

  /*
   * Los <details> ya funcionan solos. Esto solo añade el comportamiento de
   * «uno abierto cada vez» donde se ha pedido, y el aria-expanded que
   * <summary> no expone por sí mismo en todos los navegadores.
   */
  function iniciarAcordeones() {
    $$('.acordeon__item').forEach(function (item) {
      var cabeza = $('.acordeon__cabeza', item);
      if (!cabeza) return;
      cabeza.setAttribute('aria-expanded', item.open ? 'true' : 'false');
      item.addEventListener('toggle', function () {
        cabeza.setAttribute('aria-expanded', item.open ? 'true' : 'false');
      });
    });

    $$('[data-acordeon-unico]').forEach(function (grupo) {
      var items = $$('.acordeon__item', grupo);
      items.forEach(function (item) {
        item.addEventListener('toggle', function () {
          if (!item.open) return;
          items.forEach(function (otro) {
            if (otro !== item) otro.open = false;
          });
        });
      });
    });
  }

  /* -------------------------------------------------------------- visor */

  function iniciarVisor() {
    var galerias = $$('[data-galeria]');
    if (!galerias.length) return;

    var visor = d.createElement('div');
    visor.className = 'visor';
    visor.hidden = true;
    visor.setAttribute('role', 'dialog');
    visor.setAttribute('aria-modal', 'true');
    visor.setAttribute('aria-label', 'Visor de fotografías');
    visor.innerHTML =
      '<button type="button" class="visor__boton visor__cerrar" data-visor-cerrar>' +
      '<svg class="ico" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"' +
      ' stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19"/></svg>' +
      '<span>Cerrar</span></button>' +
      '<div class="visor__marco" data-visor-marco></div>' +
      '<p class="visor__pie"><span data-visor-pie></span>' +
      '<span class="visor__contador" data-visor-contador></span></p>' +
      '<div class="visor__mandos">' +
      '<button type="button" class="visor__boton visor__boton--anterior" data-visor-anterior>' +
      '<svg class="ico" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"' +
      ' stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/></svg><span>Anterior</span></button>' +
      '<button type="button" class="visor__boton" data-visor-siguiente><span>Siguiente</span>' +
      '<svg class="ico" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"' +
      ' stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/></svg></button>' +
      '</div>';
    d.body.appendChild(visor);

    /* La imagen se crea aquí y su src solo se rellena al abrir el visor:
       así no queda nunca en el documento una imagen sin origen. */
    var img = d.createElement('img');
    img.alt = '';
    $('[data-visor-marco]', visor).appendChild(img);
    var pie = $('[data-visor-pie]', visor);
    var contador = $('[data-visor-contador]', visor);
    var lista = [];
    var indice = 0;
    var previo = null;

    function pintar() {
      var item = lista[indice];
      img.src = item.href;
      img.alt = item.getAttribute('data-alt') || '';
      pie.textContent = item.getAttribute('data-pie') || '';
      contador.textContent = indice + 1 + ' de ' + lista.length;
    }

    function abrir(enlaces, i) {
      lista = enlaces;
      indice = i;
      previo = d.activeElement;
      visor.hidden = false;
      d.documentElement.style.overflow = 'hidden';
      pintar();
      $('[data-visor-cerrar]', visor).focus();
    }

    function cerrar() {
      visor.hidden = true;
      d.documentElement.style.overflow = '';
      if (previo) previo.focus();
    }

    function mover(paso) {
      indice = (indice + paso + lista.length) % lista.length;
      pintar();
    }

    galerias.forEach(function (galeria) {
      var enlaces = $$('.galeria__enlace', galeria);
      enlaces.forEach(function (enlace, i) {
        enlace.addEventListener('click', function (e) {
          e.preventDefault();
          abrir(enlaces, i);
        });
      });
    });

    $('[data-visor-cerrar]', visor).addEventListener('click', cerrar);
    $('[data-visor-anterior]', visor).addEventListener('click', function () {
      mover(-1);
    });
    $('[data-visor-siguiente]', visor).addEventListener('click', function () {
      mover(1);
    });
    visor.addEventListener('click', function (e) {
      if (e.target === visor) cerrar();
    });

    d.addEventListener('keydown', function (e) {
      if (visor.hidden) return;
      if (e.key === 'Escape') cerrar();
      else if (e.key === 'ArrowLeft') mover(-1);
      else if (e.key === 'ArrowRight') mover(1);
      else atraparFoco(visor, e);
    });
  }

  /* --------------------------------------------------------- formulario */

  function iniciarFormulario() {
    var form = $('[data-formulario]');
    if (!form) return;

    var estado = $('[data-formulario-estado]', form);

    function error(campo, texto) {
      var aviso = $('[data-error]', campo);
      campo.setAttribute('data-invalido', '');
      aviso.textContent = texto;
      aviso.hidden = false;
      var control = $('.campo__control', campo);
      control.setAttribute('aria-invalid', 'true');
    }

    function limpiar(campo) {
      var aviso = $('[data-error]', campo);
      campo.removeAttribute('data-invalido');
      aviso.textContent = '';
      aviso.hidden = true;
      $('.campo__control', campo).removeAttribute('aria-invalid');
    }

    /* Se valida al salir del campo, no mientras se escribe. */
    $$('[data-campo]', form).forEach(function (campo) {
      var control = $('.campo__control', campo);
      control.addEventListener('blur', function () {
        if (control.required && !control.value.trim()) {
          error(campo, 'Este dato hace falta para poder escribir el correo.');
        } else {
          limpiar(campo);
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Trampa antispam: si viene relleno, es un robot. No se compone nada
         y tampoco se le dice por qué. */
      var trampa = form.elements.empresa_web;
      if (trampa && trampa.value) {
        estado.textContent = 'No se ha podido preparar el mensaje. Llámenos al 91 723 18 43.';
        return;
      }

      var invalidos = 0;
      var primero = null;

      $$('[data-campo]', form).forEach(function (campo) {
        var control = $('.campo__control', campo);
        if (control.required && !control.value.trim()) {
          error(campo, 'Este dato hace falta para poder escribir el correo.');
          invalidos++;
          if (!primero) primero = control;
        } else {
          limpiar(campo);
        }
      });

      if (invalidos) {
        estado.textContent =
          'Faltan ' + invalidos + (invalidos === 1 ? ' dato' : ' datos') + ' por rellenar.';
        if (primero) primero.focus();
        return;
      }

      var v = function (nombre) {
        return (form.elements[nombre].value || '').trim();
      };

      var cuerpo =
        'Nombre: ' + v('nombre') + '\n' +
        'Teléfono: ' + v('telefono') + '\n' +
        'Vehículo: ' + (v('vehiculo') || '(no indicado)') + '\n\n' +
        'Consulta:\n' + v('mensaje') + '\n\n' +
        '— Enviado desde el formulario de cambios-automaticos.com\n';

      var asunto = 'Consulta sobre cambio automático' + (v('vehiculo') ? ' — ' + v('vehiculo') : '');

      /* La dirección se arma aquí, nunca está escrita en el HTML. */
      var destino = 'info' + '@' + 'cambios-automaticos.com';

      estado.textContent =
        'Se está abriendo su programa de correo con el mensaje ya escrito. Recuerde pulsar «enviar» allí: esta página no lo envía por usted.';

      /*
       * Se abre pulsando un enlace de verdad en lugar de cambiar
       * window.location: es lo que el navegador espera de un mailto:, no
       * deja la página a medio descargar y funciona igual en Safari.
       */
      var enlace = d.createElement('a');
      enlace.href =
        'mailto:' + destino +
        '?subject=' + encodeURIComponent(asunto) +
        '&body=' + encodeURIComponent(cuerpo);
      enlace.setAttribute('data-correo-compuesto', '');
      enlace.style.display = 'none';
      d.body.appendChild(enlace);
      enlace.click();
      d.body.removeChild(enlace);
    });
  }

  /* --------------------------------------------------------- movimiento */

  /*
   * La animación de entrada solo se monta si el navegador tiene
   * IntersectionObserver. Si no lo tiene, no se añade la clase y todo se ve
   * de golpe, que es exactamente lo que debe pasar.
   */
  function iniciarEntradas() {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var tablero = $('.tablero');
    if (tablero) {
      window.requestAnimationFrame(function () {
        tablero.classList.add('encendido');
      });
    }

    var candidatos = $$(
      '.seccion > .contenedor > *, .rejilla-servicios > .placa, .cifras > .cifra,' +
        ' .recorrido__paso, .medios__item, .plantas__ficha, .galeria__item'
    );
    if (!candidatos.length) return;

    /*
     * Regla de oro: solo se esconde lo que HOY no se ve. Lo que ya está en
     * pantalla al cargar no se toca nunca, así que ningún fallo del
     * observador puede dejar en blanco lo primero que mira el visitante.
     * Esto también cubre el caso de abrir la página en una pestaña de fondo,
     * donde el navegador no ejecuta ni el observador ni las animaciones.
     */
    var alto = window.innerHeight;
    var objetivos = candidatos.filter(function (el) {
      return el.getBoundingClientRect().top > alto * 0.95;
    });
    if (!objetivos.length) return;

    objetivos.forEach(function (el) {
      el.classList.add('entra');
    });

    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add('encendido');
          observador.unobserve(entrada.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    objetivos.forEach(function (el) {
      observador.observe(el);
    });

    /* Segunda red: si algo quedara escondido y ya está a la vista (vuelta
       atrás en el historial, cambio de orientación), se enciende igual. */
    function repasar() {
      $$('.entra:not(.encendido)').forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('encendido');
        }
      });
    }

    window.setTimeout(repasar, 1500);
    window.addEventListener('pageshow', repasar);
    d.addEventListener('visibilitychange', function () {
      if (d.visibilityState === 'visible') window.setTimeout(repasar, 60);
    });
  }

  /* ------------------------------------------------------------ arranque */

  function iniciar() {
    montarCorreos();
    iniciarMega();
    iniciarCajon();
    iniciarAcordeones();
    iniciarVisor();
    iniciarFormulario();
    iniciarEntradas();
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
