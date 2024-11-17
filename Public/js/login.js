
import { buscarUsuario } from "../../Controller/userController.js";

let btnIniciar = document.querySelector('#btnIniciar');
let intentos = 0;
let maxIntentos = 3;

if (btnIniciar) {
    btnIniciar.addEventListener('click', iniciarSesion);

    function iniciarSesion(event) {
        event.preventDefault(); 

        if (buscarUsuario()) {
            alert("Inicio de sesión exitoso.");
            window.location.href = '/View/pages/home.html'; 
        } else {
            intentos++;
            let intentosRestantes = maxIntentos - intentos;

            if (intentos < maxIntentos) {
                alert(`Error de credenciales. Te quedan ${intentosRestantes} intentos.`);
            } else {
                alert("Has alcanzado el máximo de intentos.\nReinicia la página.");
                btnIniciar.disabled = true;
            }
        }
    }
}