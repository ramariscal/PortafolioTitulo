// Función para obtener los datos de los jardineros desde tu API
function obtenerDatosJardineros() {
  return fetch("http://localhost:3000/empleadosAseo") // Reemplaza '/empleadosAseo' con la ruta correcta de tu API
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error al obtener los datos de los jardineros:", error);
      return [];
    });
}

// Función para rellenar la tabla con los datos de los jardineros
function llenarTablaJardineros() {
  const tablaJardineros = document.getElementById("tabla-resultados-aseo"); // Corregir el ID de la tabla
  const tbodyJardineros = tablaJardineros.querySelector("#tabla-body"); // Corregir el ID del tbody
  obtenerDatosJardineros().then((data) => {
    data.forEach((jardinero) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${jardinero.rut}-${jardinero.dv}</td>
              <td>${jardinero.primer_nombre} ${jardinero.segundo_nombre}</td>
              <td>${jardinero.primer_apellido} ${jardinero.segundo_apellido}</td>
              <td>${jardinero.direccion}</td>
              <td>${jardinero.mail}</td>
              <td>${jardinero.estatus}</td>
              <td>${jardinero.cargo}</td>
              <td>${jardinero.nombre_comuna}</td>
              <td>${jardinero.nombre_region}</td>
            `;
      tbodyJardineros.appendChild(row);
    });
  });
}

// Ejecutar la función para llenar la tabla al cargar la página
document.addEventListener("DOMContentLoaded", llenarTablaJardineros);

// Filtrar los datos de la tabla
const filterButton = document.getElementById("filterButton");
filterButton.addEventListener("click", () => {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const tablaJardineros = document.getElementById("tabla-resultados-aseo"); // Corregir el ID de la tabla
  const rows = tablaJardineros.getElementsByTagName("tr");

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
