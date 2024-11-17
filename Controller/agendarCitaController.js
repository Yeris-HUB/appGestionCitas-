import { agendarCita } from "../Modelo/agendarCitaModel.js"
import {agendarCitaSpecialista } from "../Public/js/listarCitas.js"

  export function agendarCitaEspecialista(especialidadSeleccionada) {
    const mainContent = document.getElementById("mainContent");

    const doctoresFiltrados = agendarCita.filter(
      (agendarCita) => agendarCita.especialidad === especialidadSeleccionada
    );

    mainContent.innerHTML = `
      <h1 class="text-3xl font-semibold mb-4">Especialistas en ${especialidadSeleccionada}</h1>
      <div id="doctoresContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${
            doctoresFiltrados.length > 0
              ? doctoresFiltrados
                  .map(
                    (i) => `
                <div id="doctor-${i.id}" class="doctor-card bg-white shadow-lg rounded-lg p-6 cursor-pointer">
                    <p><strong>Nombre:</strong> ${i.nombre}</p>
                    <p><strong>Especialidad:</strong> ${i.especialidad}</p>
                    <p><strong>Telefono:</strong> ${i.telefono}</p>
                    <p><strong>Consultorio:</strong> ${i.consultorio}</p>
                    <p><strong>Fecha:</strong> ${i.fecha}</p>
                    <p><strong>Hora:</strong> ${i.hora}</p>
                </div>
            `
                  )
                  .join("")
              : "<p>No hay médicos disponibles para esta especialidad.</p>"
          }
      </div>
    `;
    const doctorCards = document.querySelectorAll(".doctor-card");
    doctorCards.forEach((card) => {
      card.addEventListener("click", () => {
 
        doctorCards.forEach((card) => card.classList.remove("selected"));
        card.classList.add("selected");

        const fecha = card.querySelector("p:nth-of-type(4)").innerText.split(": ")[1];
        const hora = card.querySelector("p:nth-of-type(5)").innerText.split(": ")[1];
        const nombre = card.querySelector("p:nth-of-type(1)").innerText.split(": ")[1];
        const especialidad = card.querySelector("p:nth-of-type(2)").innerText.split(": ")[1];

        mainContent.innerHTML = `
                <div class="content">
                <div id="cardEspecialista" class="bg-white shadow-lg rounded-lg p-10">
                    <h3>Por favor, Confirme que si es su cita</h3>
                    <p><strong>Nombre del doctor:</strong> ${nombre}</p>
                    <p><strong>Especialidad:</strong> ${especialidad}</p>
                    <p><strong>Fecha:</strong> ${fecha}</p>
                    <p><strong>Hora:</strong> ${hora}</p>
                    <div>
                        <button id="confirmar">Confirmar</button>
                        <button id="cancelar">Cancelar</button>
                    </div>
                </div>
            </div>
    `; 
    document.querySelector('#confirmar').addEventListener('click', () => {
      alert('Cita confirmada')
      agendarCitaSpecialista()
    })
    document.querySelector('#cancelar').addEventListener('click', () => {
      agendarCitaSpecialista()
    })
      });
    });
  }