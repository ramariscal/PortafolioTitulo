// Función para obtener los datos de los guardias desde tu API
function obtenerDatosGuardias() {
  return fetch("http://localhost:3000/empleados") // Reemplaza '/api/guardias' con la ruta correcta de tu API
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error al obtener los datos de los guardias:", error);
      return [];
    });
}

// Función para rellenar la tabla con los datos de los guardias
function llenarTablaGuardias() {
  const tablaGuardias = document.getElementById("tabla-body");
  obtenerDatosGuardias().then((data) => {
    data.forEach((guardia) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${guardia.rut}-${guardia.dv}</td>
              <td>${guardia.primer_nombre} ${guardia.segundo_nombre}</td>
              <td>${guardia.primer_apellido} ${guardia.segundo_apellido}</td>
              <td>${guardia.direccion}</td>
              <td>${guardia.mail}</td>
              <td>${guardia.estatus}</td>
              <td>${guardia.cargo}</td>
              <td>${guardia.nombre_comuna}</td>
              <td>${guardia.nombre_region}</td>
            `;
      tablaGuardias.appendChild(row);
    });
  });
}

// Ejecutar la función para llenar la tabla al cargar la página
document.addEventListener("DOMContentLoaded", llenarTablaGuardias);

// Filtrar los datos de la tabla
const filterButton = document.getElementById("filterButton");
filterButton.addEventListener("click", () => {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const tablaGuardias = document.getElementById("tabla-body");
  const rows = tablaGuardias.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const columns = row.getElementsByTagName("td");
    let found = false;

    for (let j = 0; j < columns.length; j++) {
      const columnText = columns[j].textContent.toLowerCase();
      if (columnText.includes(searchInput)) {
        found = true;
        break;
      }
    }

    if (found) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});
