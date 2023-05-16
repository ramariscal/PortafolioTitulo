// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBDaxdVYKxkgD9SXZyZx3Y4RWrhniYh39o",
  authDomain: "portafolio-a196a.firebaseapp.com",
  projectId: "portafolio-a196a",
  storageBucket: "portafolio-a196a.appspot.com",
  messagingSenderId: "1090173120549",
  appId: "1:1090173120549:web:e4b2bbb8c67e9828250fcc"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener una referencia al servicio de autenticación de Firebase
const auth = firebase.auth();

// Verificar el estado de autenticación del usuario
auth.onAuthStateChanged(user => {
  if (user) {
    // Si el usuario está conectado, redirigirlo a la página de inicio
    window.location.href = "/index.html";
  } else {
    // Si el usuario no está conectado, redirigirlo a la página de inicio de sesión
    window.location.href = "/pages/login.html";
  }
});

