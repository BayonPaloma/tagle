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
