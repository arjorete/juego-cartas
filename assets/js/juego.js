

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

////**Funciones */
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
/////*Fin de funciones */

crearDeck();
pedirCarta(); 
