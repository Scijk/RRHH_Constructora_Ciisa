document.addEventListener("DOMContentLoaded", ()=>{
    function correoExiste(correo) {
        const existe = [...document.getElementsByClassName("card-body")].map(a=>a.children[1].textContent);
        return !existe.includes(correo)
    }

    function validaMayorEdad(nacimiento, ingreso) {
        const fecNac = new Date(nacimiento); 
        const fecIng = new Date(ingreso);
        const edad = fecIng.getFullYear() - fecNac.getFullYear();
        return 18 <= edad
    }

    function validaCampo(campo) {
        if(campo==null || campo == undefined || campo == '')
            return true;
        return false;
    }
    
    // Script para eliminar usuario (simulado)
    $(document).on('click', '.eliminar-usuario', function() {
        $('#modal-eliminar').modal('show'); // Mostrar modal de confirmación
        var cardAEliminar = $(this).closest('.col-md-6'); // Obtener la tarjeta de usuario a eliminar
    
        $('#btn-confirmar-eliminar').on('click', function() {
            cardAEliminar.remove(); // Eliminar la tarjeta de usuario
            $('#modal-eliminar').modal('hide'); // Ocultar modal de confirmación
        });
    });

    // Script para agregar usuario
    $('#form-agregar-usuario').submit(function(event) {
        event.preventDefault();

        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        var email = $('#email').val();
        var cargo = $('#cargo').val();
        var fechaIngreso = $('#fecha-ingreso').val();
        var fechaNacimiento = $('#fecha-nacimiento').val();
        if(validaCampo(nombre) || validaCampo(apellido) || validaCampo(email) || validaCampo(cargo) || 
            validaCampo(fechaIngreso) || validaCampo(fechaNacimiento)) {
                return void alert('Debe completar todos los campos del formulario');
        }

        if(!correoExiste(email)){
            return void alert('Correo electrónico ya existe');
        }
        if(!validaMayorEdad(fechaNacimiento, fechaIngreso)){
            return void alert('Fecha de ingreso no puede ser antes de los 18 años');
        }

        $('#modal-confirmar').modal('show'); // Mostrar modal de confirmación

        $('#btn-confirmar-agregar').on('click', function() {
            // Crear la nueva user-card con los datos del formulario
            var nuevaCard = `
                <div class="col-md-6 col-lg-3">
                <div class="card user-card card-wrapper">
                    <div class="card-body">
                    <h5 class="card-title">${nombre} ${apellido}</h5>
                    <p class="card-text">${email}</p>
                    <p class="card-text"><strong>Cargo:</strong> ${cargo}</p>
                    <p class="card-text"><strong>Ingreso:</strong> ${fechaIngreso}</p>
                    <button class="btn btn-danger eliminar-usuario">Eliminar</button>
                    </div>
                </div>
                </div>
            `;
            
            // Agregar la nueva card al contenedor
            $('#usuarios-lista').append(nuevaCard);
            
            // Limpiar el formulario
            $('#form-agregar-usuario')[0].reset();
            
            $('#modal-confirmar').modal('hide'); // Ocultar modal de confirmación
        });
    });
});
