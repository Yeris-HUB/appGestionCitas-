import { renderCitas,mostrarSubmenuCitas } from '../../Controller/citasController.js';
import { pacientes } from '../../Modelo/userModel.js';
import { agendarCitaEspecialista } from '../../Controller/agendarCitaController.js'

document.addEventListener("DOMContentLoaded", () => {


     const userId = localStorage.getItem("userId");


     const usuario = pacientes.find(paciente => paciente.id === parseInt(userId));
 

     if (usuario) {
         document.getElementById("greeting").innerText = `Hola, ${usuario.nombre}`;
         document.getElementById("nombreUsuario").innerText = usuario.nombre;
     } else {
         document.getElementById("greeting").innerText = "Hola, invitado";
         document.getElementById("nombreUsuario").innerText = "Invitado";
     }
    document.getElementById("btnInicio").addEventListener("click", () => {
        window.location.href = '../../View/pages/home.html';
    });
    // Seleccionar elementos
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

// Alternar la visibilidad del sidebar
menuToggle.addEventListener('click', () => {
    const isHidden = sidebar.style.transform === 'translateX(0%)';
    sidebar.style.transform = isHidden ? 'translateX(-100%)' : 'translateX(0%)';
});
    document.getElementById("logo-sura").addEventListener("click", () => {
        window.location.href = '../../View/pages/home.html';
    }); 
    document.getElementById("btnMisCitas").addEventListener("click", () => {
        renderCitas();
        mostrarSubmenuCitas();
    });
    document.getElementById("btnMostrarConfirmadas").addEventListener("click", () => renderCitas("Confirmada"));
    document.getElementById("btnMostrarPendientes").addEventListener("click", () => renderCitas("Pendiente"));
     document.getElementById("btnCerrarSesion").addEventListener("click", () => {

        localStorage.removeItem("userId");
        window.location.href = "../../View/pages/login.html";
    });
})
document.getElementById("btnAgendarCitas").addEventListener("click", agendarCitaSpecialista);

export function agendarCitaSpecialista() {
    let mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
            <div class="content">
                <div id="cardEspecialista" class="bg-white shadow-lg rounded-lg p-10">
                    <h3>Por favor, indique el especialista</h3>
                    <select id="especialidadSelect">
                        <option value="" disabled selected>Seleccione</option>
                        <option value="Cardiología">Cardiología</option>
                        <option value="Dermatología">Dermatología</option>
                        <option value="Neurología">Neurología</option>
                        <option value="Ortopedia">Ortopedia</option>
                        <option value="Pediatría">Pediatría</option>
                    </select>
                    <div>
                        <button id="confirmarEspecilista">Confirmar</button>
                        <button id="cancelarEspecilista">Cancelar</button>
                    </div>
                </div>
            </div>
        `;
    document.getElementById('especialidadSelect').addEventListener('change', (event) => {
        const opcion = event.target.value;
        document.querySelector('#confirmarEspecilista').addEventListener('click', () => {
            agendarCitaEspecialista(opcion)
        });
    });
    document.querySelector('#cancelarEspecilista').addEventListener('click', () => {
            window.location.href = '../../View/pages/home.html';
    } )
    

}