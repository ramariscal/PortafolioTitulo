// Obtén una referencia a la tabla y al cuerpo de la tabla en tu página web
const tablaResultados = document.getElementById('tabla-resultados');
const tbody = tablaResultados.querySelector('#tabla-body');

// Realiza la solicitud HTTP a la API
fetch('http://localhost:4000/TraerEmpleado')
  .then(response => response.json())
  .then(data => {
    // Itera sobre los resultados y agrega filas a la tabla
    data.forEach(item => {
      const fila = document.createElement('tr');
      const celdaRUT = document.createElement('td');
      celdaRUT.textContent = item.rut_dv;
      const celdaNombre = document.createElement('td');
      celdaNombre.textContent = item.nombres;
      const celdaApellido = document.createElement('td');
      celdaApellido.textContent = item.apellidos;
      const celdaCorreo = document.createElement('td');
      celdaCorreo.textContent = item.correo;
      const celdaCargo = document.createElement('td');
      celdaCargo.textContent = item.cargo;
      const celdaDireccion = document.createElement('td');
      celdaDireccion.textContent = item.direccion;
      const celdaComuna = document.createElement('td');
      celdaComuna.textContent = item.nombre_comuna;

      fila.appendChild(celdaRUT);
      fila.appendChild(celdaNombre);
      fila.appendChild(celdaApellido);
      fila.appendChild(celdaCorreo);
      fila.appendChild(celdaCargo);
      fila.appendChild(celdaDireccion);
      fila.appendChild(celdaComuna);

      tbody.appendChild(fila);
    });
  })
  .catch(error => {
    console.error('Error al obtener los datos de la API:', error);
  });

  //Llamado de evento del boton filtrado
  const filterButton = document.getElementById('filterButton');
  filterButton.addEventListener('click', filterTable);
  // Realizar la filtracion del llamado:
  function filterTable() {
    const input = document.getElementById('searchInput');
    const filterValue = input.value.toLowerCase();
    const table = document.getElementById('tabla-resultados');
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
  
  // Agregar evento de submit al formulario
addForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar el envío del formulario por defecto

  // Obtener los valores de los campos del formulario
  const rut = document.getElementById('rut').value;
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const direccion = document.getElementById('direccion').value;
  const correo = document.getElementById('correo').value;
  const cargo = document.getElementById('cargo').value;
  const comuna = document.getElementById('comuna').value;

  // Crear un objeto con los datos del empleado
  const empleado = {
    rut,
    nombre,
    apellido,
    direccion,
    correo,
    cargo,
    comuna
  };

  // Enviar los datos del empleado a la API para su almacenamiento
  fetch('http://localhost:4000/AgregarEmpleado', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(empleado)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Empleado agregado:', data);
    // Aquí puedes actualizar la tabla con los nuevos datos del empleado agregado
    // Por ejemplo, puedes llamar a la función que realiza la consulta a la API y actualiza la tabla
  })
  .catch(error => {
    console.error('Error al agregar el empleado:', error);
  });

  // Cerrar el modal
  modal.style.display = 'none';
});
