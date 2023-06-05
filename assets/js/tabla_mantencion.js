// Obtén una referencia a la tabla de aseo y al cuerpo de la tabla
const tablaResultadosJardinero = document.getElementById('tabla-resultados-jardinero');
const tbodyJardinero = tablaResultadosJardinero.querySelector('#tabla-body');
// Función para agregar filas a la tabla
function agregarFilaEmpleado(empleado, tbody) {
  const fila = document.createElement('tr');
  
  // Orden y campos modificados
  const celdaRUT = document.createElement('td');
  celdaRUT.textContent = empleado.rut_dv;
  
  const celdaNombres = document.createElement('td');
  celdaNombres.textContent = empleado.nombres;
  
  const celdaApellidos = document.createElement('td');
  celdaApellidos.textContent = empleado.apellidos;
  
  const celdaDireccion = document.createElement('td');
  celdaDireccion.textContent = empleado.direccion;
  
  const celdaCorreo = document.createElement('td');
  celdaCorreo.textContent = empleado.mail;
  
  const celdaCargo = document.createElement('td');
  celdaCargo.textContent = empleado.cargo;
  
  const celdaComuna = document.createElement('td');
  celdaComuna.textContent = empleado.nombre_comuna;
  
  const celdaRegion = document.createElement('td');
  celdaRegion.textContent = empleado.nombre_region;

  // Agrega las celdas a la fila en el orden deseado
  fila.appendChild(celdaRUT);
  fila.appendChild(celdaNombres);
  fila.appendChild(celdaApellidos);
  fila.appendChild(celdaDireccion);
  fila.appendChild(celdaCorreo);
  fila.appendChild(celdaCargo);
  fila.appendChild(celdaComuna);
  fila.appendChild(celdaRegion);

  // Agrega la fila al cuerpo de la tabla
  tbody.appendChild(fila);
}

// Hacer una solicitud AJAX para obtener el personal de mantención
fetch('http://localhost:4000/TraerJardinero')
  .then(response => response.json())
  .then(data => {
    // Agregar las filas a la tabla de mantención
    data.forEach(empleado => {
      agregarFilaEmpleado(empleado, tbodyJardinero);
    });
  })
  .catch(error => console.error('Error:', error));

//Llamado de evento del boton filtrado
const filterButton = document.getElementById('filterButton');
filterButton.addEventListener('click', filterTable);

// Realizar la filtracion del llamado:
function filterTable() {
  const input = document.getElementById('searchInput');
  const filterValue = input.value.toLowerCase();
  const table = document.getElementById('tabla-resultados-jardinero');
  const rows = table.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    // Saltar la primera fila (fila de encabezado)
    if (i === 0) {
      continue;
    }

    const cells = row.getElementsByTagName('td');
    let shouldShowRow = false;

    for (let j = 0; j < cells.length; j++) {
      const cell = cells[j];
      const cellValue = cell.textContent || cell.innerText;

      if (cellValue.toLowerCase().indexOf(filterValue) > -1) {
        shouldShowRow = true;
        break;
      }
    }

    row.style.display = shouldShowRow ? '' : 'none';
  }
}