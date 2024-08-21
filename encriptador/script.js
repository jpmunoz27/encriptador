// Selección de elementos en el DOM
const textArea = document.querySelector(".caja_texto");
const mensaje = document.querySelector(".mensaje");
const botonEncriptar = document.getElementById("boton_encriptador");
const botonDesencriptar = document.getElementById("boton_desencriptar");
const botonCopiar = document.getElementById("boton_copiar");
const placeholders = document.querySelectorAll(".mensaje-placeholder");

// Eventos para botones y áreas de texto
botonEncriptar.addEventListener("click", boton_encriptador);
botonDesencriptar.addEventListener("click", boton_desencriptador);
botonCopiar.addEventListener("click", copiarTexto);

textArea.addEventListener("input", actualizarVisibilidad);
mensaje.addEventListener("input", actualizarVisibilidad);

// Nueva función de validación de texto
function validarTexto() {
    let txtTexto = textArea.value.trim();
    txtTexto = txtTexto.toLowerCase();

    if (txtTexto === "") {
        alert("No se encontró texto");
        return false;
    } else {
        let caracteresAcentos = /[áéíóúÁÉÍÓÚñÑüÜ]/;
        let caracteresEspeciales = /[!@#\$%\^&\*\(\)_\+\-\=\{\}\[\]\|\\:;'",<>\.\?\/¿?]/;
        let caracteresPermitidos = /^[a-z\s]+$/;
        let caracteresNumeros = /\d/;
        let caracteresEmojis = /[\u{1F600}-\u{1F64F}]/u;
        let contieneVocal = /[aeiou]/;

        if (caracteresAcentos.test(txtTexto)) {
            alert("No se permiten acentos");
            return false;
        } else if (caracteresEspeciales.test(txtTexto)) {
            alert("No se permiten caracteres especiales");
            return false;
        } else if (caracteresNumeros.test(txtTexto)) {
            alert("No se permiten números");
            return false;
        } else if (caracteresEmojis.test(txtTexto)) {
            alert("No se permiten emojis");
            return false;
        } else if (!contieneVocal.test(txtTexto)) {
            alert("El texto ingresado no es válido");
            return false;
        }
        return true;
    }
}

// Función para encriptar el texto
function boton_encriptador() {
    const texto = textArea.value;
    if (validarTexto(texto)) {
        const textoEncriptado = encriptar(texto);
        mensaje.value = textoEncriptado;
        actualizarVisibilidad();
    } else {
        alert("El texto contiene caracteres no permitidos");
    }
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    
    for(let i = 0; i < matrizCodigo.length; i++) {
        if(stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    } 

    return stringEncriptada;
}

// Función para desencriptar el texto
function boton_desencriptador() {
    const textoDesencriptado = desencriptar(textArea.value);
    mensaje.value = textoDesencriptado;
    actualizarVisibilidad();
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["enter", "e"], ["imes", "i"], ["ai", "a"], ["ober", "o"], ["ufat", "u"]];
    
    for(let i = 0; i < matrizCodigo.length; i++) {
        if(stringDesencriptada.includes(matrizCodigo[i][0])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    } 

    return stringDesencriptada;
}

// Función para copiar texto al portapapeles
function copiarTexto() {
    mensaje.select();
    document.execCommand("copy");
}

// Función para actualizar la visibilidad de los elementos
function actualizarVisibilidad() {
    const mensajeTieneTexto = mensaje.value.trim().length > 0;

    if (mensajeTieneTexto) {
        botonCopiar.style.display = "block";
        mensaje.classList.add("ocultar-muneco"); // Ocultar la imagen solo cuando haya texto
        placeholders.forEach(placeholder => placeholder.style.display = "none");
    } else {
        botonCopiar.style.display = "none";
        mensaje.classList.remove("ocultar-muneco"); // Mostrar la imagen si el mensaje está vacío
        placeholders.forEach(placeholder => placeholder.style.display = "block");
    }
}

// Mostrar la imagen al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    mensaje.classList.remove("ocultar-muneco"); 
});
