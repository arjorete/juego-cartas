

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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

const pedirCarta = ()=>{

    if(deck.length === 0){
        throw 'No ay cartas en el DECK'
    }
    const carta =  deck.pop();
    console.log(carta);
    return(carta);
}

const valorCarta = (carta)=>{
    
    const valor = carta.substring(0, carta.length - 1);
    let puntos = 0;
    console.log(valor);

    if( isNaN(valor)){
        puntos = (valor === 'A') ? 11 : 10;
    }
    else{
        puntos = valor * 1;
    }
    console.log(puntos);
}
/////*Fin de funciones */

crearDeck();
const carta = valorCarta(pedirCarta());
