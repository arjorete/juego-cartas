

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0,
    puntosComputadora = 0;

////**Referencias HTML */
const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const marcas = document.querySelectorAll('small');
const divJugadorCartas = document.querySelector('#jugador-cartas');
const divComputadoraCartas = document.querySelector('#computadora-cartas');
////**Funciones */

//Esta función crea la varaja y la revuelve
const crearDeck = ()=> {
    for(let i=2; i <= 10; i++){
        for(let tipo of tipos) {
            deck.push(i + tipo); 
        }
    }

    for(let esp of especiales){
        for(let tipo of tipos){
            deck.push(esp + tipo);
        }
    }
    deck = _.shuffle(deck);
    return deck;
}

crearDeck();

const pedirCarta = ()=>{

    if(deck.length === 0){
        throw 'No ay cartas en el DECK'
    }
    const carta =  deck.pop();
    return(carta);
}

const valorCarta = (carta)=>{
    
    const valor = carta.substring(0, carta.length - 1);
    let puntos = 0;

    if( isNaN(valor)){
        puntos = (valor === 'A') ? 11 : 10;
    }
    else{
        puntos = valor * 1;
    }
    return puntos;
}

//Turno de la computadora
const turnoComputadora = (puntosMinimos)=>{
    do{

    const carta = pedirCarta();
    puntosComputadora =puntosComputadora + valorCarta(carta);
    marcas[1].innerText = puntosComputadora;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divComputadoraCartas.append(imgCarta);

    if(puntosMinimos > 21){
        console.warn('Lo siento, perdiste');
        break;
    }

    } while(puntosComputadora < puntosMinimos && puntosMinimos <= 21);
}

/////*Fin de funciones */

////**Eventos */

btnPedir.addEventListener('click', ()=>{
    const carta = pedirCarta();
    puntosJugador =puntosJugador + valorCarta(carta);
    marcas[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divJugadorCartas.append(imgCarta);

    if(puntosJugador > 21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
    else if (puntosJugador === 21){
        console.warn('Excelente, llegaste a 21');
    }
});

btnDetener.addEventListener('click', ()=>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

/////*Fin de eventos */


