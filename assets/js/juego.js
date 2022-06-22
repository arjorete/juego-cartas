(()=>{
    'use strict'

    let deck = [],
        puntosJugadores = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];
    //let puntosJugador = 0,
     //   puntosComputadora = 0;

    ////**Referencias HTML */
    const btnNuevo = document.querySelector('#btnNuevo'),
          btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          marcas = document.querySelectorAll('small'),
          divJugadorCartas = document.querySelector('#jugador-cartas'),
          divComputadoraCartas = document.querySelector('#computadora-cartas');

    ////**Funciones */

    //Inicializar el juego

    const inicializaJuego = (jugadores = 1)=>{
        deck = crearDeck();
        for(let i=0; i <= jugadores; i++){
            puntosJugadores.push(0);
        }
    }

    //Esta función crea la varaja y la revuelve
    const crearDeck = ()=> {
        deck = [];

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
    
        return _.shuffle(deck);;
    }

   //Funcion para pedir una carta
    const pedirCarta = ()=>{

        if(deck.length === 0){
            throw 'No ay cartas en el DECK'
        }
        return deck.pop();
    }

    //Funcion para saber el valor de una carta
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

    //Acumular puntos
    const acumularPuntos = (turno, carta)=>{
        puntosJugadores[turno] =puntosJugadores[turno] + valorCarta(carta);
        marcas[1].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    //Turno de la computadora
    const turnoComputadora = (puntosMinimos)=>{
        do{

        const carta = pedirCarta();
        acumularPuntos(puntosJugadores.length - 1, carta);
        //puntosComputadora =puntosComputadora + valorCarta(carta);
        //marcas[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        divComputadoraCartas.append(imgCarta);

        if(puntosMinimos > 21){
            console.warn('Lo siento, perdiste');
            break;
        }

        } while(puntosComputadora < puntosMinimos && puntosMinimos <= 21);

        if(puntosComputadora === puntosMinimos){
            alert('Iguales, nadie gana');
        }
        else if(puntosComputadora > 21){
            alert('Felicidades, GANASTE');
        }
        else if(puntosMinimos > 21){
            alert('Upss, como lo siento, gano la PC');
        }
        else{
            alert('Upss, como lo siento, gano la PC');
        }
    }

    /////*Fin de funciones */

    ////**Eventos */

    btnPedir.addEventListener('click', ()=>{
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(0,carta);
        //puntosJugador =puntosJugador + valorCarta(carta);
        //marcas[0].innerText = puntosJugador;

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

    btnNuevo.addEventListener('click', ()=>{
        console.clear();
        inicializaJuego();
        //deck= [];
        //crearDeck();
        btnDetener.disabled = false;
        btnPedir.disabled = false;

        //puntosJugador =0;
        //puntosComputadora = 0;

        marcas[0].innerText = 0;
        marcas[1].innerText = 0;
        divComputadoraCartas.innerHTML = '';
        divJugadorCartas.innerHTML = '';
    });

    /////*Fin de eventos */
})();
