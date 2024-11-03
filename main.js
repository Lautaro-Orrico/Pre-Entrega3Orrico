// Seleccionar las cartas y el botón de jugar
const cartas = document.querySelectorAll(".cartas article");
const botonJugar = document.querySelector("#boton");
const partidasJugadasText = document.getElementById("partidas-jugadas");
const girasCartaText = document.getElementById("giras-carta");

// Variables de estado
let juegoIniciado = false;
let cartas_seleccionadas = [];
let intentos = 0;
let imagenes_pokemon = [];

// Cargar partidas jugadas desde localStorage
let partidasJugadas = parseInt(localStorage.getItem('partidasJugadas')) || 0;
partidasJugadasText.textContent = `Partidas jugadas: ${partidasJugadas}`;

// Función para mezclar las imágenes aleatoriamente
function mezclar_imagenes(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Función para obtener una imagen de Pokémon aleatoria
async function obtenerImagenPokemon(numeroAleatorio) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`);
    const data = await response.json();
    return data.sprites.front_default; // Retorna la URL de la imagen del Pokémon
}

// Función para cargar múltiples imágenes de Pokémon (sin duplicados)
async function cargarImagenes(cantidad) {
    const promesas = [];
    const numerosAleatorios = new Set(); // Para asegurarnos de que no hay duplicados

    // Generar números aleatorios únicos hasta llegar a la cantidad deseada
    while (numerosAleatorios.size < cantidad) {
        const numeroAleatorio = Math.floor(Math.random() * 100) + 1; // Genera un número aleatorio del 1 al 100
        numerosAleatorios.add(numeroAleatorio);
    }

    for (const numero of numerosAleatorios) {
        promesas.push(obtenerImagenPokemon(numero));
    }

    imagenes_pokemon = await Promise.all(promesas); // Espera a que todas las promesas se resuelvan
    imagenes_pokemon = imagenes_pokemon.flatMap(url => [url, url]); // Duplicar para tener pares
}

// Iniciar el juego
async function iniciar_juego() {
    await cargarImagenes(10); // Cargar 10 Pokémon únicos
    mezclar_imagenes(imagenes_pokemon);
    cartas.forEach((carta, index) => {
        const img = carta.querySelector(".pokemon img");
        img.src = imagenes_pokemon[index];
        img.classList.add("oculto");
        carta.classList.remove("matched", "opened");
        carta.style.pointerEvents = 'auto';
        carta.querySelector(".reverso").style.visibility = "visible";
        img.classList.remove("visible");
        carta.addEventListener("click", manejarClickCarta);
    });

    juegoIniciado = true;
    intentos = 0;
    girasCartaText.textContent = `Cartas giradas: ${intentos}`;
    botonJugar.disabled = true;
}

// Función para manejar el clic en una carta
function manejarClickCarta(event) {
    if (!juegoIniciado) return;

    const carta = event.currentTarget;
    const img = carta.querySelector(".pokemon img");
    const reverso = carta.querySelector(".reverso");

    if (img.classList.contains("visible") || carta.classList.contains("matched") || cartas_seleccionadas.length === 2) return;

    img.classList.remove("oculto");
    img.classList.add("visible");
    reverso.style.visibility = "hidden";
    carta.classList.add("opened");
    cartas_seleccionadas.push({ carta, img, reverso });
    intentos++;
    girasCartaText.textContent = `Cartas giradas: ${intentos}`;

    if (cartas_seleccionadas.length === 2) {
        const [primeraCarta, segundaCarta] = cartas_seleccionadas;

        if (primeraCarta.img.src === segundaCarta.img.src) {
            primeraCarta.carta.classList.add("matched");
            segundaCarta.carta.classList.add("matched");
            verificarVictoria();
        } else {
            setTimeout(() => {
                primeraCarta.img.classList.remove("visible");
                primeraCarta.img.classList.add("oculto");
                segundaCarta.img.classList.remove("visible");
                segundaCarta.img.classList.add("oculto");
                primeraCarta.reverso.style.visibility = "visible";
                segundaCarta.reverso.style.visibility = "visible";
                primeraCarta.carta.classList.remove("opened");
                segundaCarta.carta.classList.remove("opened");
            }, 1000);
        }
        cartas_seleccionadas = [];
    }
}

// Verificar victoria
function verificarVictoria() {
    const totalCartas = cartas.length;
    const cartasEmparejadas = document.querySelectorAll('.matched').length;

    if (cartasEmparejadas === totalCartas) {
        Swal.fire({
            title: '¡Felicidades!',
            text: 'Has descubierto todas las cartas. ¿Quieres jugar de nuevo?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                iniciar_juego();
            } else {
                reiniciarJuego();
                botonJugar.disabled = false;
            }
        });
    }
}

// Deshabilitar el clic en las cartas al cargar la página
cartas.forEach((carta) => {
    carta.style.pointerEvents = 'none';
    carta.classList.add('baja-opacidad');
});

// Llamar a la función de iniciar juego al hacer clic en el botón
botonJugar.addEventListener("click", () => {
    if (!juegoIniciado) {
        iniciar_juego();
    }

    partidasJugadas++;
    localStorage.setItem('partidasJugadas', partidasJugadas);
    partidasJugadasText.textContent = `Partidas jugadas: ${partidasJugadas}`;

    cartas.forEach((carta) => {
        carta.style.pointerEvents = 'auto';
        carta.classList.remove('baja-opacidad');
    });
});

// Reiniciar juego
function reiniciarJuego() {
    cartas.forEach((carta, index) => {
        const img = carta.querySelector(".pokemon img");
        img.src = imagenes_pokemon[index];
        img.classList.add("oculto");
        carta.classList.remove("matched", "opened");
        carta.querySelector(".reverso").style.visibility = "visible";
        img.classList.remove("visible");
        carta.style.pointerEvents = 'none';
        carta.classList.add('baja-opacidad');
    });

    juegoIniciado = false;
    intentos = 0;
    girasCartaText.textContent = `Cartas giradas: ${intentos}`;
    botonJugar.disabled = false;
}


































 


