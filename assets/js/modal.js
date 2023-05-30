        // Obtener elementos del DOM
        const addButton = document.getElementById('addButton');
        const modal = document.getElementById('modal');
        
        // Mostrar el modal al hacer clic en el botón "Agregar Vehículo"
        addButton.addEventListener('click', () => {
          modal.style.display = 'block';
        });
        
        // Ocultar el modal al hacer clic fuera de él o en el botón "Limpiar"
        window.addEventListener('click', (event) => {
          if (event.target === modal || event.target.classList.contains('clear-button')) {
            modal.style.display = 'none';
          }
        });
        

        const deleteVeh = document.getElementById('deleteVeh')
        const modaldelete = document.getElementById('modaldelete')

        deleteVeh.addEventListener('click', () => {
            modaldelete.style.display = 'block';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modaldelete || event.target.classList.contains('clear-button')) {
                modaldelete.style.display = 'none'
            }
        });