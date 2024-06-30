let intentos = 5;
let palabrasecreta = '';

const BOTON = document.getElementById("guess-button");
const numintentos = document.getElementById('intentos');
const mainbody = document.body;
const contenedorgrid = document.getElementById('contenedorgrid');
const imagenfondo = 'https://ih1.redbubble.net/image.2936602253.1232/st,small,507x507-pad,600x600,f8f8f8.jpg';

// Establece el estilo de fondo del body
mainbody.style.backgroundImage = `url(${imagenfondo})`;
mainbody.style.backgroundSize = 'cover';
mainbody.style.backgroundRepeat = 'no-repeat';
mainbody.style.backgroundPosition = 'center';

// Establece el estilo del contenedor principal
contenedorgrid.style.backgroundColor = '#eae6ca';
contenedorgrid.style.width = '50%'; // Ajusta el tamaño según tus necesidades
contenedorgrid.style.margin = 'auto';
contenedorgrid.style.padding = '20px';
contenedorgrid.style.borderRadius = '10px';
contenedorgrid.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';

// Escucha el evento click del botón de intento
BOTON.addEventListener('click', intentar);

// Función para obtener una palabra aleatoria de la API
async function obtenerPalabraSecreta() {
    try {
        const response = await fetch('5bda75a318msh06f6ded4908ec71p1c7a73jsnd22b2f794268');
        if (!response.ok) {
            throw new Error('Error al obtener la palabra secreta');
        }
        const data = await response.json();
        return data.word.toUpperCase(); // Devuelve la palabra en mayúsculas
    } catch (error) {
        console.error('Error:', error);
        // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
        return null;
    }
}

// Función para leer el intento del usuario
function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    return intento.toUpperCase();
}

// Función para manejar el intento cuando el usuario presiona el botón
function intentar() {
    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    definirIntento(INTENTO, palabrasecreta, ROW, GRID);
    numintentos.innerHTML = 'Tienes ' + intentos + ' intentos restantes';
    numintentos.style.margin = 'auto';
}

// Función para definir el intento del usuario
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

// Llamada inicial para obtener la palabra secreta cuando se carga la página
obtenerPalabraSecreta()
    .then(palabra => {
        if (palabra) {
            // Usa la palabra obtenida de la API como la palabra secreta
            palabrasecreta = palabra;
            console.log('Palabra secreta:', palabrasecreta);
            // Ahora puedes iniciar el juego con la palabra secreta obtenida
        } else {
            console.error('No se pudo obtener la palabra secreta');
            // Maneja el caso en el que no se pueda obtener la palabra secreta
        }
    })
    .catch(error => {
        console.error('Error al obtener la palabra secreta:', error);
        // Maneja cualquier error durante la obtención de la palabra secreta
    });

// Función para mostrar un mensaje si el usuario no escribió nada
function noEscribioNada(mensaje) {
    let contenedor = document.getElementById("guesses");
    contenedor.innerHTML = mensaje;
}

// Función para deshabilitar los controles cuando se termina el juego
function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}
