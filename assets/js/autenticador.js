// Obtén el formulario y agrega un evento de escucha para el envío
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", loginUser);
}

// Función para validar y autenticar al usuario
function loginUser(event) {
  event.preventDefault(); // Evita que se envíe el formulario de forma predeterminada

  // Obtén los valores de usuario y clave del formulario
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Realiza una solicitud al servidor para autenticar al usuario
  fetch(
    "http://localhost:3000/buscarEmpleados?criterios=" +
      JSON.stringify({ usuario: username, clave: password })
  )
    .then((response) => response.json())
    .then((data) => {
      const authenticatedUser = data.find(
        (user) => user.usuario === username && user.clave === password
      );
      if (authenticatedUser) {
        // Autenticación exitosa
        // Guarda la sesión del usuario y el nombre en el almacenamiento local
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("username", authenticatedUser.usuario);
        redirectToDashboard(); // Redirecciona al dashboard o página de inicio de sesión exitosa
      } else {
        // Autenticación fallida
        alert("Usuario o contraseña incorrectos");
      }
    })
    .catch((error) => {
      console.error("Error al autenticar al usuario:", error);
      alert("Ocurrió un error al autenticar al usuario");
    });
}

// Función para redireccionar al dashboard
function redirectToDashboard() {
  // Aquí puedes agregar la lógica para redireccionar al dashboard
  // Por ejemplo:
  window.location.href = "/pages/panel.html";
}

// Función para limpiar las variables locales
function clearLocalStorage() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("username");
}

// Obtén el enlace de "Cerrar sesión" y agrega un evento de escucha
const logoutLink = document.getElementById("logout-link");
if (logoutLink) {
  logoutLink.addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción predeterminada del enlace
    clearLocalStorage(); // Limpia las variables locales
    window.location.href = "/index.html"; // Redirecciona a la página de inicio de sesión
  });
}

// Validar si el usuario ha iniciado sesión al cargar la página
window.addEventListener("DOMContentLoaded", function () {
  const loggedIn = localStorage.getItem("loggedIn");
  const username = localStorage.getItem("username");

  if (loggedIn === "true" && username) {
    // El usuario ha iniciado sesión correctamente
    // Redirigir a la página del panel
    if (window.location.pathname === "/index.html") {
      window.location.href = "/pages/panel.html";
    }
  } else {
    // El usuario no ha iniciado sesión o las variables no están presentes
    // Redirigir al usuario a la página de inicio de sesión
    if (window.location.pathname !== "/index.html") {
      window.location.href = "/index.html";
    }
  }
});
