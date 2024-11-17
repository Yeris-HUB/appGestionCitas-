import { citas } from "../Modelo/citasModel.js";
import { doctores } from '../../Modelo/doctorModel.js';

// Función para renderizar las citas
export function renderCitas(filtro = null) {
  const mainContent = document.getElementById("mainContent");
  const citasFiltradas = filtro
    ? citas.filter((cita) => cita.estado === filtro)
    : citas;

  mainContent.innerHTML = `
        <h1 class="text-3xl font-semibold mb-4">Mis Citas</h1>
        <div id="citasContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${citasFiltradas.map(cita => {
                // Buscar el doctor correspondiente
                const doctor = doctores.find(d => d.id === cita.idDoctor);
                const nombreDoctor = doctor ? doctor.nombre : "Doctor no encontrado";

                return `
                    <div id="cita-${cita.id}" class="bg-white shadow-lg rounded-lg p-6">
                        <h3 class="text-lg font-semibold">Cita ID: ${cita.id}</h3>
                        <p><strong>Doctor:</strong> ${nombreDoctor}</p>
                        <p><strong>especialidad:</strong> ${doctor.especialidad}</p>
                        <p><strong>Fecha:</strong> ${cita.fecha}</p>
                        <p><strong>Hora:</strong> ${cita.hora}</p>
                        <p><strong>Motivo:</strong> ${cita.motivo}</p>
                        <p><strong>Estado:</strong> ${cita.estado}</p>                 
                        <div class="mt-4 flex space-x-2">
                              <button class="confirmar-btn w-full bg-green-500 text-white font-semibold py-1 px-4 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transform hover:scale-105 transition duration-300" data-cita-id="${cita.id}">Confirmar Cita</button>
                            <button class="cancelar-btn w-full bg-red-500 text-white font-semibold py-1 px-4 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transform hover:scale-105 transition duration-300" data-cita-id="${cita.id}">Cancelar Cita</button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;

  // Asignar eventos a los botones después de renderizar las citas
//   document.querySelectorAll(".confirmar-btn").forEach((button) => {
//     button.addEventListener("click", () => confirmarCita(button.dataset.id));
//   });
//   document.querySelectorAll(".cancelar-btn").forEach((button) => {
//     button.addEventListener("click", () => cancelarCita(button.dataset.id));
//   });
// }
document.querySelectorAll(".confirmar-btn").forEach((button) => {
    button.addEventListener("click", () => confirmarCita(button.dataset.citaId));
  });
  document.querySelectorAll(".cancelar-btn").forEach((button) => {
    button.addEventListener("click", () => cancelarCita(button.dataset.citaId));
  });

}
// Función para confirmar una cita
export function confirmarCita(id) {
  // Encontrar la cita en el arreglo y cambiar su estado
  const cita = citas.find((c) => c.id === parseInt(id));
  if (cita && cita.estado === "Pendiente") {
    cita.estado = "Confirmada";

    // Actualizar el estado en el DOM
    const estadoElemento = document.getElementById(`estado-${id}`);
    if (estadoElemento) {
      estadoElemento.textContent = "Confirmada";
    }

    alert(`Cita ID: ${id} confirmada`);
  } else {
    alert(`Cita ID: ${id} ya está confirmada o no se encontró.`);
  }
}
// Función para activar el botón de la sección actual

// Función para cancelar una cita
export function cancelarCita(id) {
  const citaElement = document.getElementById(`cita-${id}`);
  if (citaElement) {
    citaElement.remove();
    alert(`Cita ID: ${id} cancelada`);
  }
}
// document.getElementById("btnInicio").addEventListener("click", () => {
//     window.location.href = "https://www.ejemplo.com";
// });
// Función para mostrar el submenú
export function mostrarSubmenuCitas() {
  const submenu = document.getElementById("submenuCitas");
  submenu.classList.toggle("hidden"); // Alterna la visibilidad del submenú
}


export function AgendarCita() {
    alert('redirigiendo para agendar cita')
    window.location.href='../View/pages/agendarCita.html'

  }

  document.addEventListener("DOMContentLoaded", function() {
    const bannerProximaCita = document.getElementById("bannerProximaCita");
    const detalleProximaCita = document.getElementById("detalleProximaCita");

    // Función para encontrar la cita más próxima
    function obtenerProximaCita(citas) {
        const ahora = new Date();
        let proximaCita = null;

        citas.forEach(cita => {
            const fechaHoraCita = new Date(`${cita.fecha}T${cita.hora}`);
            if (fechaHoraCita > ahora && (!proximaCita || fechaHoraCita < new Date(`${proximaCita.fecha}T${proximaCita.hora}`))) {
                proximaCita = cita;
            }
        });

        return proximaCita;
    }

    // Encontrar la cita más próxima y mostrarla
    const proximaCita = obtenerProximaCita(citas);
    if (proximaCita) {
        detalleProximaCita.textContent = `Fecha: ${proximaCita.fecha} - Hora: ${proximaCita.hora} - Motivo: ${proximaCita.motivo}`;
        bannerProximaCita.classList.remove("hidden"); // Mostrar el banner
    }
});


