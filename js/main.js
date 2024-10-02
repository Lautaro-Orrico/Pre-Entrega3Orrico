const palabraClave = `JAVASCRIPT`

let palabraOculta = [`J`, `_`, `V`, `_`, `_`, `C`, `_`, `_`, `_`, `T`];

let numIntentos = 6;

function adivinarPalabra() {
    let letraIngresada = prompt(`Ingrese una letra, tiene ${numIntentos} intentos:
        Palabra Oculta: ${palabraOculta.join(` `)}`).toUpperCase();

    if (letraIngresada === null) {
        console.log(`Decidiste terminar el juego. No te preocupes! Puedes volver a jugar cuando quieras!`)
        return null;
    }

    while ([`J`, `V`, `C`, `T`].includes(letraIngresada) || (letraIngresada === ``)) {
        letraIngresada = prompt(`Por favor, vuelva a ingresar otra letra, tiene 6 intentos:
            Palabra Oculta: ${palabraOculta.join(` `)}`).toUpperCase();

        if (letraIngresada===null){
            return null;
        }
    }

    return letraIngresada;

}

function reiniciarJuego() {
    numIntentos = 6;
    palabraOculta = [`J`, `_`, `V`, `_`, `_`, `C`, `_`, `_`, `_`, `T`];
}

while (true) {
    while (numIntentos > 0 && palabraOculta.includes(`_`)) {
        let letraIngresada = adivinarPalabra();
    
    
        if (letraIngresada === null) {
            break;
        }
    
    
        if (palabraClave.includes(letraIngresada)) {
            console.log(`Felicidades, acertaste una letra! Te quedan ${numIntentos} intentos!`);
    
    
    
            for (let i = 0; i < palabraClave.length; i++) {
                if (palabraClave[i] === letraIngresada) {
                    palabraOculta[i] = letraIngresada;
                }
            }
        }
    
    
        else {
            numIntentos--
            console.log(`Incorrecto, no te precoupes, te quedan ${numIntentos} intentos`)
        }
    
    
    }
    
    
    if (!palabraOculta.includes(`_`)) {
        alert(`Felicidades, adivinaste la palabra. ${palabraClave}`);
    }
    
    else {
        console.log(`Te quedaste sin intentos! La palabra clave era ${palabraClave}`);
    }


    if (!confirm("Quieres volver a jugar?")) {
        console.log("Gracias por jugar!")
        break;
    }
    else {
        reiniciarJuego();
    }
}
