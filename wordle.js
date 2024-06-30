let intentos = 5;
let diccionario = ['TABLES', 'ILOVE', 'CHAIR', 'YOUNG', 'OWEN'];
const palabrasecreta = diccionario[Math.floor(Math.random() * diccionario.length)];
const BOTON = document.getElementById("guess-button");

BOTON.addEventListener('click', intentar);

const numintentos = document.getElementById('intentos');
const mainbody = document.body;
const imagenfondo = 'https://ih1.redbubble.net/image.2936602253.1232/st,small,507x507-pad,600x600,f8f8f8.jpg';
mainbody.style.backgroundImage = `url(${imagenfondo})`;
mainbody.style.backgroundSize = 'cover';
mainbody.style.backgroundRepeat = 'no-repeat';
mainbody.style.backgroundPosition = 'center';

const contenedorgrid = document.getElementById('contenedorgrid');
contenedorgrid.style.backgroundColor = '#eae6ca';
contenedorgrid.style.width = '50%'; // Ajusta el tamaño según tus necesidades
contenedorgrid.style.margin = 'auto';
contenedorgrid.style.padding = '20px';
contenedorgrid.style.borderRadius = '10px';
contenedorgrid.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';

function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    return intento.toUpperCase();
}

function noEscribioNada(mensaje) {
    let contenedor = document.getElementById("guesses");
    contenedor.innerHTML = mensaje;
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

function definirIntento(INTENTO, palabrasecreta, ROW, GRID) {
    if (!INTENTO) {
        noEscribioNada("<label>No escribiste nada! :O</label>");
    }

    if (INTENTO === palabrasecreta) {
        terminar("<h1>GANASTE! :D </h1>");
        return;
    }

    for (let i in palabrasecreta) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';

        if (INTENTO[i] === palabrasecreta[i]) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851';
            SPAN.style.borderRadius = '20px';
        } else if (palabrasecreta.includes(INTENTO[i])) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.borderRadius = '20px';
        } else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#a4aec4';
            SPAN.style.borderRadius = '20px';
        }

        if (INTENTO[i] === undefined) {
            SPAN.innerHTML = ' ';
        }

        ROW.appendChild(SPAN);
    }

    GRID.appendChild(ROW);
    intentos--;

    if (intentos === 0) {
        terminar("<h1>Perdiste! >:o </h1>");
        return;
    }
}

function intentar() {
    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    definirIntento(INTENTO, palabrasecreta, ROW, GRID);
    numintentos.innerHTML = 'Tienes ' + intentos + ' intentos restantes';
    numintentos.style.margin = 'auto';
}
