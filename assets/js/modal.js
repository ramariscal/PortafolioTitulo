// Obtener elementos del DOM
const addButton = document.getElementById("addButton");
const modal = document.getElementById("modal");
const regionSelect = document.getElementById("region");
const comunaSelect = document.getElementById("comuna");
const cargoSelect = document.getElementById("cargo");

// Mostrar el modal al hacer clic en el botón "Agregar Empleado"
addButton.addEventListener("click", () => {
  modal.style.display = "block";
  cargarRegiones();
  cargarCargos();
});

//MODAL PARA EDITAR
const editButton = document.getElementById("editButton");
const modaledit = document.getElementById("modaledit");

editButton.addEventListener("click", () => {
  modaledit.style.display = "block";
});

window.addEventListener("click", (event) => {
  if (
    event.target === modaledit ||
    event.target.classList.contains("clear-button")
  ) {
    modaledit.style.display = "none";
  }
});

// MODAL DE ELIMINAR
const deleteVeh = document.getElementById("deleteButton");
const modaldelete = document.getElementById("modaldelete");

deleteButton.addEventListener("click", () => {
  modaldelete.style.display = "block";
});

window.addEventListener("click", (event) => {
  if (
    event.target === modaldelete ||
    event.target.classList.contains("clear-button")
  ) {
    modaldelete.style.display = "none";
  }
});

// Ocultar el modal al hacer clic fuera de él o en el botón "Limpiar"
window.addEventListener("click", (event) => {
  if (
    event.target === modal ||
    event.target.classList.contains("clear-button")
  ) {
    modal.style.display = "none";
  }
});

// Función para cargar las opciones de región en el combobox correspondiente
function cargarRegiones() {
  // Hacer la solicitud GET a la API para obtener las regiones
  fetch("http://localhost:3000/buscarRegiones")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Limpiar las opciones actuales del combobox de "Región"
      regionSelect.innerHTML = "";

      // Agregar la opción predeterminada al combobox de "Región"
      var defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.disabled = true;
      defaultOption.hidden = true;
      defaultOption.text = "Selecciona una región";
      regionSelect.appendChild(defaultOption);

      // Agregar las opciones de región correspondientes
      data.forEach(function (region) {
        var option = document.createElement("option");
        option.value = region.id_region;
        option.text = region.nombre_region;
        regionSelect.appendChild(option);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Función para cargar las opciones de cargo en el combobox correspondiente
function cargarCargos() {
  // Hacer la solicitud GET a la API para obtener los cargos
  fetch("http://localhost:3000/buscarCargos")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Limpiar las opciones actuales del combobox de "Cargo"
      cargoSelect.innerHTML = "";

      // Agregar la opción predeterminada al combobox de "Cargo"
      var defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.disabled = true;
      defaultOption.hidden = true;
      defaultOption.text = "Selecciona un cargo";
      cargoSelect.appendChild(defaultOption);

      // Agregar las opciones de cargo correspondientes
      data.forEach(function (cargo) {
        var option = document.createElement("option");
        option.value = cargo.id_cargo;
        option.text = cargo.cargo;
        cargoSelect.appendChild(option);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Event listener para el combobox de "Región" que carga las opciones de comuna correspondientes a la región seleccionada
regionSelect.addEventListener("change", () => {
  const selectedRegion = regionSelect.value;
  cargarComunas(selectedRegion);
});

// Función para cargar las opciones de comuna en el combobox correspondiente
function cargarComunas(regionId) {
  // Hacer la solicitud GET a la API para obtener las comunas de la región seleccionada
  fetch(`http://localhost:3000/buscarComunasPorRegion/${regionId}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Limpiar las opciones actuales del combobox de "Comuna"
      comunaSelect.innerHTML = "";

      // Agregar la opción predeterminada al combobox de "Comuna"
      var defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.disabled = true;
      defaultOption.hidden = true;
      defaultOption.text = "Selecciona una comuna";
      comunaSelect.appendChild(defaultOption);

      // Agregar las opciones de comuna correspondientes a la región seleccionada
      data.forEach(function (comuna) {
        var option = document.createElement("option");
        option.value = comuna.id_comuna;
        option.text = comuna.nombre_comuna;
        comunaSelect.appendChild(option);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Obtener el formulario
const addForm = document.getElementById("addForm");

// Escuchar el evento de envío del formulario
addForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Evitar el comportamiento de envío predeterminado

  // Obtener los valores del formulario
  const rut = document.getElementById("rut").value;
  const dv = document.getElementById("dv").value;
  const primerNombre = document.getElementById("primerNombre").value;
  const segundoNombre = document.getElementById("segundoNombre").value;
  const primerApellido = document.getElementById("primerApellido").value;
  const segundoApellido = document.getElementById("segundoApellido").value;
  const correo = document.getElementById("correo").value;
  const idCargo = cargoSelect.value;
  const direccion = document.getElementById("direccion").value;
  const idRegion = regionSelect.value;
  const idComuna = comunaSelect.value;

  // Crear un objeto JSON con los datos del formulario
  const empleado = {
    rut: rut,
    dv: dv,
    primer_nombre: primerNombre,
    segundo_nombre: segundoNombre,
    primer_apellido: primerApellido,
    segundo_apellido: segundoApellido,
    mail: correo,
    estatus: 1,
    id_cargo: idCargo,
    id_conjunto: 1,
    direccion: direccion,
    id_region: idRegion,
    id_comuna: idComuna,
  };

  // Hacer la solicitud POST a la API para agregar el empleado
  fetch("http://localhost:3000/agregarEmpleado", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(empleado),
  })
    .then(function (response) {
      // Verificar el estado de la respuesta
      if (response.ok) {
        // El empleado se agregó correctamente
        console.log("Empleado agregado correctamente");
        // Realizar cualquier acción adicional requerida después de agregar el empleado
      } else {
        // Hubo un error al agregar el empleado
        console.log("Error al agregar el empleado");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});
