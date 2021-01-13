//---------------------------------------//
//---------VARIABLES AND CLASSES---------//

const minorSize = 52;       //deck size for minor arcana
const majorSize = 22;       //deck size for major arcana

let minorDeck = [];
let majorDeck = [];

let majorNames = ['Il Matto', 'Il Bagatto', 'La Papessa', 'L\'Imperatrice', 'L\'Imperatore', 'Il Papa', 'Gli Amanti', 'Il Carro', 'La Giustizia', 'L\'Eremita', 'La Ruota della Fortuna', 'La Forza', 'L\'Appeso', 'La Morte', 'La Temperanza', 'Il Diavolo', 'La Torre', 'Le Stelle', 'La Luna', 'Il Sole', 'Il Giudizio', 'Il Mondo'];

class arcaneMinor {             //arcane minor card
    constructor(index, suit) {
        this.index = index;     //storage index in sorted deck
        this.suit = suit;
        this.value = index-suit+1;      //actual card value
    }
}
    
class arcaneMajor {             //arcane major card
    constructor(index, name) {
        this.index = index;         //storage index in sorted deck. Value is same as index 
        this.name = name;
    }
}    

//--------------------------------//
//---------INITIALIZATION---------//


function createMajorDeck(){
    for(i=0; i<majorSize; i++){
        let newCard = new arcaneMajor(i, majorNames[i]);
        majorDeck.push(newCard);
    }
}

function createSuit(suit){
    for(i=suit; i<13+suit; i++) {
        let newCard = new arcaneMinor(i, suit);
        switch (suit) {
                case 0:
                    newCard.suitString = 'Hearts';
                    newCard.name = valueTranslator(newCard) + " of " + newCard.suitString;
                    break;
                case 13:
                    newCard.suitString = 'Diamonds';
                    newCard.name = valueTranslator(newCard) + " of " + newCard.suitString;
                    break;
                case 26:
                    newCard.suitString = 'Clubs';
                    newCard.name = valueTranslator(newCard) + " of " + newCard.suitString;
                    break;
                case 39:
                    newCard.suitString = 'Spades';
                    newCard.name = valueTranslator(newCard) + " of " + newCard.suitString;
                    break;
        }
        minorDeck.push(newCard);
    }
}

//suits code for minor arcana
//0=hearts, 14 diamonds, 28 clubs, 42 spades  
function createMinorDeck(){             //create minor arcana deck suit by suit
    createSuit(0);              
    createSuit(13);
    createSuit(26);
    createSuit(39);
}

createMinorDeck();
createMajorDeck();


//-------------------------//
//---------SHUFFLE---------//

let majorCurrent = majorDeck.slice();
let minorCurrent = minorDeck.slice();

//Fisher Yates Method to shuffle chosen deck
function shuffleDeck(deckToShuffle){
    for(i=deckToShuffle.length-1; i>0; i--) {
        j = Math.floor(Math.random()*i);
        k = deckToShuffle[i];
        deckToShuffle[i] = deckToShuffle[j];
        deckToShuffle[j] = k;
    }
}

function init() {
    shuffleDeck(majorCurrent);
    shuffleDeck(minorCurrent);
}

init();

//----------------------//
//---------DRAW---------//

let minorCardIndex = 0;
let majorCardIndex = 0;

//draw a card when button is pressed
function drawCard(currentDeck, deckType) {
    
    if(deckType === 'major'){
        document.getElementById('major_deck').src = "img/major/"+majorCurrent[majorCardIndex].index+".jpg";
        document.getElementById('name_major').innerHTML= "<p>"+majorCurrent[majorCardIndex].name+"</p>";
        if (majorCardIndex > majorSize-2) {      //shuffle if empty
            shuffleDeck(majorCurrent);
            majorCardIndex = 0;
        }    
        if (majorCurrent[majorCardIndex].index === 0) {      //shuffle button if 'Il Matto'
            showBtn('shuffle_major');
        } else {
            hideBtn('shuffle_major');
        }
        majorCardIndex++;
        
    } else if(deckType === 'minor'){  
        document.getElementById('minor_deck').src = "img/minor/"+imgTranslator(minorCurrent[minorCardIndex]);
        document.getElementById('name_minor').innerHTML= "<p>"+minorCurrent[minorCardIndex].name+"</p>";
        if (minorCardIndex > minorSize-2) {      //shuffle if empty
            shuffleDeck(minorCurrent);
            minorCardIndex = 0;
        }    
        if (minorCurrent[minorCardIndex].index === 39) {      //shuffle if ace of spades
            showBtn('shuffle_minor');
        } else {
            hideBtn('shuffle_minor');
        }
        minorCardIndex++;
    }
}

document.getElementById('draw_minor').addEventListener('click', function(){
   drawCard(minorCurrent, 'minor');
});

document.getElementById('draw_major').addEventListener('click', function(){
    drawCard(majorCurrent, 'major');
});


//-------------------------//
//---------BUTTONS---------//

function showBtn(buttonID) {
    document.getElementById(buttonID).style.display = 'block';
}

function hideBtn(buttonID) {
    document.getElementById(buttonID).style.display = 'none';
}

document.getElementById('shuffle_minor').addEventListener('click', function() {
    shuffleDeck(minorCurrent);
    minorCardIndex = 0;
    hideBtn('shuffle_minor');
    document.getElementById('minor_deck').src = "img/back.jpg";
    document.getElementById('name_minor').innerHTML= "<p></p>";
});

document.getElementById('shuffle_major').addEventListener('click', function() {
    shuffleDeck(majorCurrent);
    majorCardIndex = 0;
    hideBtn('shuffle_major');
    document.getElementById('major_deck').src = "img/back.jpg";
    document.getElementById('name_major').innerHTML= "<p></p>";
});

//-------------------------//
//---------IMAGES----------//

function imgTranslator(card){
    let numeric, literal;
    switch (card.value){
            case 1:
                numeric = 'A';
                break;
            case 11:
                numeric = 'J';
                break;
            /*case 12:                
                numeric = 'H';
                break;*/
            case 12:
                numeric = 'Q';
                break;
            case 13:
                numeric = 'K';
                break;
            default:
                numeric = card.value;
    }
    switch (card.suitString){
            case 'Hearts':
                literal = 'H';
                break;
            case 'Diamonds':
                literal = 'D';
                break;
            case 'Clubs':
                literal = 'C';
                break;
            case 'Spades':
                literal = 'S';
                break;
    }
    return numeric + literal + '.png';
}

function valueTranslator(card) {
    let literal;
    switch (card.value){
            case 1:
                literal = 'Ace';
                break;
            case 11:
                literal = 'Jack';
                break;
            /*case 12:                
                literal = 'Knight';
                break;*/
            case 12:
                literal = 'Queen';
                break;
            case 13:
                literal = 'King';
                break;
            default:
                literal = card.value;
    }
    return literal;
}


//console.log(majorDeck);
//console.log(majorCurrent);
//console.log(gameStarting);
