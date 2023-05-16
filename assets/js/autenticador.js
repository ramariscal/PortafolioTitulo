console.log("El archivo JS se ha cargado correctamente");

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

// Obtener una referencia a la base de datos de Firestore de Firebase
const db = firebase.firestore();

// Obtener una referencia al formulario de inicio de sesión
const form = document.querySelector('#login-form');

// Manejar el evento de inicio de sesión
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtener el correo electrónico y la contraseña del formulario
  const email = form['username'].value;
  const password = form['password'].value;

  // Iniciar sesión en Firebase con el correo electrónico y la contraseña proporcionados
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Redirigir al usuario a la página de inicio si el inicio de sesión es exitoso
      window.location.href = "/index.html";
    })
    .catch((error) => {
      // Mostrar mensaje de error en caso de que el inicio de sesión falle
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
