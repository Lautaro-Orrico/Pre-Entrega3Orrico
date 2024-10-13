let palabra_oculta
let errores = 0
let aciertos = 0
let contador_derrotas = parseInt(localStorage.getItem('contador_derrotas')) || 0;
let contador_aciertos = parseInt(localStorage.getItem('contador_aciertos')) || 0;
let winrate = parseFloat(localStorage.getItem('winrate')) || 0;
let partidas_jugadas = parseInt(localStorage.getItem('partidas_jugadas')) || 0;



const palabras = [`javascript`, `python`, `java`]
const boton = document.getElementById(`jugar`)
const imagen = document.getElementById(`imagen`)
boton.addEventListener(`click`, inicio);

function palabra_random() {
    const cantidad_palabras = palabras.length
    var random = Math.floor(Math.random() * cantidad_palabras)
    return random
}

function fin_del_juego() {
    const boton_letras = document.querySelectorAll(`#letras button`);
    for (let i = 0; i < boton_letras.length; i++) {
        boton_letras[i].disabled = true
    }
    boton.disabled = false
}

function inicio(event) {
    document.getElementById(`resultado`).innerHTML = ``
    imagen.src = `/img/0.png`
    errores = 0
    aciertos = 0
    boton.disabled = true
    const parrafo = document.getElementById(`palabra_a_adivinar`)
    parrafo.innerHTML = ``
    const random = palabra_random()

    palabra_oculta = palabras[random];
    console.log(palabra_oculta)
    const cantidad_letras_ocultas = palabra_oculta.length
    for (let i = 0; i < boton_letras.length; i++) {
        boton_letras[i].disabled = false
    }

    for (let i = 0; i < cantidad_letras_ocultas; i++) {
        const span = document.createElement(`span`)
        parrafo.appendChild(span);
    }


}

const boton_letras = document.querySelectorAll(`#letras button`);
for (let i = 0; i < boton_letras.length; i++)
    boton_letras[i].addEventListener(`click`, click_letras)

function click_letras(event) {
    const spans = document.querySelectorAll(`#palabra_a_adivinar span`)
    const boton = event.target;
    boton.disabled = true
    const letra = boton.innerHTML
    const palabra = palabra_oculta

    let acerto = false
    for (let i = 0; i < palabra.length; i++) {
        if (letra == palabra[i]) {
            spans[i].innerHTML = letra
            aciertos++
            acerto = true
        }
    }
    if (acerto == false) {
        errores++
        const source = `/img/${errores}.png`
        const imagen = document.getElementById(`imagen`)
        imagen.src = source
    }

    if (errores == 6) {
        document.getElementById(`resultado`).innerHTML = `Perdiste! La palabra era ${palabra_oculta}`  // Actualiza el resultado cada vez que el juego termina
        contador_derrotas++;
        actualizarEstadisticas()
        fin_del_juego()
    }
    else if (aciertos == palabra_oculta.length)  {
        document.getElementById(`resultado`).innerHTML = `Felicitaciones, acertaste.`  // Actualiza el resultado cada vez que el juego termina
        contador_aciertos++
        actualizarEstadisticas()
        fin_del_juego()
    }

}

function actualizarEstadisticas() {
    partidas_jugadas = contador_derrotas + contador_aciertos;
    winrate = (contador_aciertos * 100) / partidas_jugadas;

    // Actualizar los valores en el HTML
    document.getElementById('contador_derrotas').innerHTML = `Contador de Derrotas=${contador_derrotas}`;
    document.getElementById('contador_aciertos').innerHTML = `Contador de Aciertos=${contador_aciertos}`;
    document.getElementById('partidas_jugadas').innerHTML = `Partidas Jugadas=${partidas_jugadas}`;
    document.getElementById('winrate').innerHTML = `Winrate=%${Math.floor(winrate)}`;

    // Guardar las estadísticas en localStorage
    localStorage.setItem('contador_derrotas', contador_derrotas);
    localStorage.setItem('contador_aciertos', contador_aciertos);
    localStorage.setItem('partidas_jugadas', partidas_jugadas);
    localStorage.setItem('winrate', winrate);
}

document.getElementById('contador_derrotas').innerHTML = `Contador de Derrotas=${contador_derrotas}`;
document.getElementById('contador_aciertos').innerHTML = `Contador de Aciertos=${contador_aciertos}`;
document.getElementById('partidas_jugadas').innerHTML = `Partidas Jugadas=${partidas_jugadas}`;
document.getElementById('winrate').innerHTML = `Winrate=%${Math.floor(winrate)}`;

fin_del_juego()