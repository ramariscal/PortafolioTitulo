// Obtén una referencia a la tabla de aseo y al cuerpo de la tabla
const tablaResultadosAseo = document.getElementById('tabla-resultados-aseo');
const tbodyAseo = tablaResultadosAseo.querySelector('#tabla-body');
// Función para agregar filas a la tabla
function agregarFilaEmpleado(empleado, tbody) {
  const fila = document.createElement('tr');

  const rutCell = document.createElement('td');
  rutCell.textContent = empleado.rut_dv;
  fila.appendChild(rutCell);

  const nombresCell = document.createElement('td');
  nombresCell.textContent = empleado.nombres;
  fila.appendChild(nombresCell);

  const apellidosCell = document.createElement('td');
  apellidosCell.textContent = empleado.apellidos;
  fila.appendChild(apellidosCell);

  const direccionCell = document.createElement('td');
  direccionCell.textContent = empleado.direccion;
  fila.appendChild(direccionCell);

  const correoCell = document.createElement('td');
  correoCell.textContent = empleado.mail;
  fila.appendChild(correoCell);

  const estatusCell = document.createElement('td');
  estatusCell.textContent = empleado.estatus;
  fila.appendChild(estatusCell);

  const cargoCell = document.createElement('td');
  cargoCell.textContent = empleado.cargo;
  fila.appendChild(cargoCell);

  const comunaCell = document.createElement('td');
  comunaCell.textContent = empleado.nombre_comuna;
  fila.appendChild(comunaCell);

  const regionCell = document.createElement('td');
  regionCell.textContent = empleado.nombre_region;
  fila.appendChild(regionCell);

  tbody.appendChild(fila);
}


// Hacer una solicitud AJAX para obtener el personal de aseo
fetch('http://localhost:4000/TraerAseo')
  .then(response => response.json())
  .then(data => {
    // Agregar las filas a la tabla de aseo
    data.forEach(empleado => {
      agregarFilaEmpleado(empleado, tbodyAseo);
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
  const table = document.getElementById('tabla-resultados-aseo');
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
