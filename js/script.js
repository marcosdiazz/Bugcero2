document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu");
  const navigation = document.querySelector("nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      navigation.classList.toggle("open");
    });
  }

  const themeButton = document.querySelector(".theme-toggle");
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("bugcero-theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const startingTheme =
    savedTheme || (systemPrefersDark ? "dark" : "light");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    const nextTheme = theme === "dark" ? "claro" : "oscuro";
    themeButton.textContent = theme === "dark" ? "☀" : "☾";
    themeButton.setAttribute(
      "aria-label",
      "Cambiar a modo " + nextTheme
    );
    themeButton.setAttribute("title", "Cambiar a modo " + nextTheme);
    themeButton.setAttribute(
      "aria-pressed",
      String(theme === "dark")
    );
  }

  if (themeButton) {
    applyTheme(startingTheme);

    themeButton.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme");
      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      localStorage.setItem("bugcero-theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  const yearElements = document.querySelectorAll("[data-year]");

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const recipient = "bugcero.st@gmail.com";
      const subject = encodeURIComponent(
        "Consulta desde el sitio BugCero: " + formData.get("asunto")
      );
      const body = encodeURIComponent(
        "Nombre: " + formData.get("nombre") +
        "\nCorreo: " + formData.get("email") +
        "\nTema: " + formData.get("asunto") +
        "\n\nMensaje:\n" + formData.get("mensaje")
      );

      const formNote = document.querySelector("#form-note");
      formNote.textContent =
        "Se abrirá tu aplicación de correo para que confirmes el envío.";

      window.location.href =
        "mailto:" + recipient + "?subject=" + subject + "&body=" + body;
    });
  }
});