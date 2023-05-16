// Realizar la solicitud a la API
fetch('http://localhost:3000/TraerPatente')
  .then(response => response.json())
  .then(data => {
    // Manipular los datos recibidos
    const tablaResultados = document.getElementById('tabla-resultados');
    const tbody = tablaResultados.querySelector('tbody');

    // Iterar sobre los resultados y agregar filas a la tabla
    data.forEach(item => {
      const fila = document.createElement('tr');
      const celdaPatente = document.createElement('td');
      celdaPatente.textContent = item.patente;
      const celdaTipoVehiculo = document.createElement('td');
      celdaTipoVehiculo.textContent = item.id_tipoveh;
      const celdaColor = document.createElement('td');
      celdaColor.textContent = item.id_color;

      fila.appendChild(celdaPatente);
      fila.appendChild(celdaTipoVehiculo);
      fila.appendChild(celdaColor);

      tbody.appendChild(fila);
    });
  })
  .catch(error => {
    console.error('Error al obtener los datos de la API:', error);
  });

  fetch('http://localhost:4000/TraerEmpleado')
  .then(response => response.json())
  .then(data => {
    // Manipular los datos recibidos
    const tablaResultados = document.getElementById('tabla-resultados');
    const tbody = tablaResultados.querySelector('tbody');

    // Iterar sobre los resultados y agregar filas a la tabla
    data.forEach(item => {
        const fila = document.createElement('tr');
        const celdaRUT = document.createElement('td');
        celdaRUT.textContent = item.rut + '-' + item.dv;
        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = item.primer_nombre + ' ' + item.segundo_nombre;
        const celdaApellido = document.createElement('td');
        celdaApellido.textContent = item.primer_apellido + ' ' + item.segundo_apellido;
        const celdaDireccion = document.createElement('td');
        celdaDireccion.textContent = item.direccion;
        const celdaCorreo = document.createElement('td');
        celdaCorreo.textContent = item.mail;
        const celdaEstado = document.createElement('td');
        celdaEstado.textContent = item.estatus;
        const celdaCargo = document.createElement('td');
        celdaCargo.textContent = item.id_cargo;
      
        fila.appendChild(celdaRUT);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaApellido);
        fila.appendChild(celdaDireccion);
        fila.appendChild(celdaCorreo);
        fila.appendChild(celdaEstado);
        fila.appendChild(celdaCargo);
      
        tbody.appendChild(fila);
      });
  })
  .catch(error => {
    console.error('Error al obtener los datos de la API:', error);
  });
