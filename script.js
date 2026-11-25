// menu
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const menuOverlay = document.getElementById("menuOverlay");
const menuLinks = document.querySelectorAll(".nav-menu a");

function toggleMenu() {
  navMenu.classList.toggle("active");
  menuOverlay.classList.toggle("active");
}

function closeMenu() {
  navMenu.classList.remove("active");
  menuOverlay.classList.remove("active");
}

menuToggle.addEventListener("click", (event) => {
  toggleMenu();
  event.stopPropagation();
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

menuOverlay.addEventListener("click", () => {
  closeMenu();
});

// animacion
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    threshold: 0.3,
  };

  const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(
    revealCallback,
    observerOptions,
  );

  const elementsToAnimate = document.querySelectorAll(
    ".texto, .cont-pills, .continfo, .tema-contenido, .insta h2, .ubicacion h2, .faq h2, .sobre-nosotros h2, .sobre-nosotros p",
  );

  elementsToAnimate.forEach((el) => {
    el.classList.add("reveal-hidden");
    revealObserver.observe(el);
  });
});

// Sobre nosotos imagenes rotativass
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  const slides = carousel.querySelectorAll(".carousel__slide");
  const prevBtn = carousel.querySelector(".carousel__btn--prev");
  const nextBtn = carousel.querySelector(".carousel__btn--next");
  const INTERVALO = 3000; // milisegundos entre fotos

  let actual = 0;
  let timer;

  function mostrar(indice) {
    slides[actual].classList.remove("is-active");
    actual = (indice + slides.length) % slides.length;
    slides[actual].classList.add("is-active");
  }

  function iniciar() {
    detener();
    timer = setInterval(() => mostrar(actual + 1), INTERVALO);
  }

  function detener() {
    clearInterval(timer);
  }

  nextBtn.addEventListener("click", () => {
    mostrar(actual + 1);
    iniciar();
  });

  prevBtn.addEventListener("click", () => {
    mostrar(actual - 1);
    iniciar();
  });

  carousel.addEventListener("mouseenter", detener);
  carousel.addEventListener("mouseleave", iniciar);

  iniciar();
});

// Tarjetas de especialidades desplegables (solo mobile)
document.querySelectorAll(".tema").forEach((tema) => {
  const info = tema.querySelector(".tema-info");
  const contenido = tema.querySelector(".tema-contenido");
  if (!info || !contenido) return;

  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "tema-toggle";
  boton.setAttribute("aria-expanded", "false");
  boton.setAttribute("aria-label", "Ver más información");
  info.appendChild(boton);

  info.addEventListener("click", () => {
    const abierto = tema.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", abierto);
  });
});

//faq
function toggleFAQItem(id) {
  const content = document.getElementById(`faq-content-${id}`);
  const arrow = document.getElementById(`arrow-${id}`);
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

// popup formulario
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contacto form");
  const popup = document.getElementById("customPopup");
  const closePopupBtn = document.getElementById("closePopup");

  if (form && popup && closePopupBtn) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      popup.classList.add("show");

      const formData = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Formulario enviado con éxito");
            form.reset();
          } else {
            console.error("Hubo un problema con el envío");
          }
        })
        .catch((error) => {
          console.error("Error de red:", error);
        });
    });

    closePopupBtn.addEventListener("click", () => {
      window.location.href = "/";
    });
  }
});
