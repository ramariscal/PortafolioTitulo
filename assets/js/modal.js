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
        //MODAL PARA EDITAR
        const editButton = document.getElementById('editButton')
        const modaledit = document.getElementById('modaledit')

        editButton.addEventListener('click', () => {
            modaledit.style.display = 'block';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modaledit || event.target.classList.contains('clear-button')) {
                modaledit.style.display = 'none'
            }
        });



        // MODAL DE ELIMINAR
        const deleteVeh = document.getElementById('deleteButton')
        const modaldelete = document.getElementById('modaldelete')

        deleteButton.addEventListener('click', () => {
            modaldelete.style.display = 'block';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modaldelete || event.target.classList.contains('clear-button')) {
                modaldelete.style.display = 'none'
            }
        });