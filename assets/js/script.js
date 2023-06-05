// Obtén una referencia a la tabla y al cuerpo de la tabla en tu página web
const tablaResultadosGuardias = document.getElementById('tabla-resultados-guardias');
const tbodyGuardias = tablaResultadosGuardias.querySelector('#tabla-body');

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
        agregarFilaEmpleado(data);
        // Aquí puedes mostrar un mensaje de éxito o realizar alguna acción adicional después de agregar el empleado
      })
      .catch(error => {
        console.error('Error al agregar el empleado:', error);
        // Aquí puedes mostrar un mensaje de error o realizar alguna acción en caso de que ocurra un error al agregar el empleado
      });
  });
});
