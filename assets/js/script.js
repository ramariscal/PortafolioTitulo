// Obtén una referencia a la tabla y al cuerpo de la tabla en tu página web
const tablaResultadosGuardias = document.getElementById('tabla-resultados-guardias');
const tbodyGuardias = tablaResultadosGuardias.querySelector('#tabla-body');

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


// Hacer una solicitud AJAX para obtener el personal de guardias
fetch('http://localhost:4000/TraerEmpleado')
  .then(response => response.json())
  .then(data => {
    // Agregar las filas a la tabla de guardias
    data.forEach(empleado => {
      agregarFilaEmpleado(empleado, tbodyGuardias);
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
  const table = document.getElementById('tabla-resultados-guardias');
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

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('addForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const rut = document.getElementById('rut').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const direccion = document.getElementById('direccion').value;
    const correo = document.getElementById('correo').value;
    const cargo = document.getElementById('cargo').value;
    const comuna = document.getElementById('comuna').value;

    // Crear un objeto con los datos del empleado
    const empleado = {
      rut: rut,
      nombre: nombre,
      apellido: apellido,
      direccion: direccion,
      correo: correo,
      cargo: cargo,
      comuna: comuna
    };

    // Enviar la solicitud POST al servidor
    fetch('/AgregarEmpleado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(empleado)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Agregar la nueva fila a la tabla
        agregarFilaEmpleado(data, tbodyGuardias);
        // Aquí puedes mostrar un mensaje de éxito o realizar alguna acción adicional después de agregar el empleado
      })
      .catch(error => {
        console.error('Error al agregar el empleado:', error);
        // Aquí puedes mostrar un mensaje de error o realizar alguna acción en caso de que ocurra un error al agregar el empleado
      });
  });
});

// Obtener referencia al botón de eliminar
const deleteButton = document.getElementById('deleteButton');

// Agregar evento de clic al botón de eliminar
deleteButton.addEventListener('click', () => {
  // Mostrar el modal de eliminar
  const modalDelete = document.getElementById('modaldelete');
  modalDelete.style.display = 'block';
});

// Obtener referencia a los elementos del modal
const modalDelete = document.getElementById('modaldelete');
const yesDeleteButton = document.querySelector('.yesdelete');
const clearButton = document.querySelector('.clear-button');

// Agregar evento al botón "Sí" para realizar la eliminación
yesDeleteButton.addEventListener('click', () => {
  const rutInput = document.getElementById('rutInput').value;
  const dvInput = document.getElementById('dvInput').value;

fetch(`/EliminarEmpleado/${rutInput}/${dvInput}`, {
  method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al eliminar el empleado');
    }
    return response.json();
  })
  .then(data => {
    // Mostrar mensaje de éxito o error de eliminación
    console.log(data);
    
    // Cerrar el modal
    modalDelete.style.display = 'none';
    
    // Eliminar la fila correspondiente en la tabla
    const rows = tbodyGuardias.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rutCell = row.querySelector('td:first-child');
      if (rutCell.textContent === rutInput) {
        tbodyGuardias.removeChild(row);
        break;
      }
    }
  })
  .catch(error => {
    // Mostrar mensaje de error de solicitud
    console.error('Error al eliminar el empleado:', error);
    
    // Cerrar el modal
    modalDelete.style.display = 'none';
  });
});