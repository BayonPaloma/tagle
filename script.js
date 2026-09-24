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
    ".texto, .cont-pills, .continfo, .tema-contenido, .insta h2, .ubicacion h2, .faq h2",
  );

  elementsToAnimate.forEach((el) => {
    el.classList.add("reveal-hidden");
    revealObserver.observe(el);
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
