let puntosUsuario = 0
let puntosIA = 0


function salirPrograma() {
    console.log("saliste del programa");
    return null;
}


function opcionUsuario() {
    let opcion = parseInt(prompt("Elegi una opcion entre : Piedra - Papel - Tijera ingresando un numero, o marca 0 para terminar el programa. \nMarca: \n1. Para piedra \n2. Para papel \n3. Para tijera \n0. Para terminar el programa"));

    if (opcion === 0) {
        return salirPrograma();
    }


    while (opcion !== 1 && opcion !== 2 && opcion !== 3) {
        alert("La opcion ingresada no es valida. Por favor vuelva a ingresar una opcion que se encuentre dentro de las posibilidades");

        opcion = parseInt(prompt("Vuelve a elegir una opcion entre : \n1.Piedra \n2.Papel \n3.Tijera \n0. Salir del programa"));

        if (opcion === 0) {
            return salirPrograma();
        }

    }

    return opcion;
}




function opcionIA() {

    return Math.floor(Math.random() * 3) + 1;

}

while (true) {


    while (puntosUsuario < 3 && puntosIA < 3) {
        let eleccionUsuario = opcionUsuario();
        let eleccionIA = opcionIA();

        if (eleccionUsuario === null) {
            break;
        }


        if (eleccionUsuario === eleccionIA) {
            console.log("Empate!")
        }
        else if
            ((eleccionUsuario === 1 && eleccionIA === 3) ||
            (eleccionUsuario === 2 && eleccionIA === 1) ||
            (eleccionUsuario === 3 && eleccionIA === 2)) {

            console.log("Ganaste. Sumas 1 punto!");
            puntosUsuario++


        }
        else {
            console.log("Perdiste. La IA suma 1 punto")
            puntosIA++


        }

        console.log("Puntos del usuario:", puntosUsuario, "Puntos de IA", puntosIA)

    }


    if (puntosUsuario > puntosIA) {
        console.log("Felicidades, ganaste!");
    }
    else {
        console.log("Perdiste, no te preocupes, puedes volver a intentarlo.");
    }


    if (!confirm("Quieres volver a jugar?")) {
        console.log("Gracias por jugar!")
        break;
    }
}

