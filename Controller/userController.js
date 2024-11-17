import { usuarios } from "../Modelo/userModel.js"
export function buscarUsuario() {
    let auth = usuarios.some((index) => {
        let usuario = document.querySelector('#usuario').value
        let contrasena = document.querySelector('#contrasena').value
        if (usuario == index.usuario && contrasena == index.contrasena) {
            return true
        } else {
            return false
        }
    })
    return auth
}
