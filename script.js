// Challenge :- Your age in days
 function ageindays() {
    var birthyear = prompt("Enter your birth year");
    var days = (2020 - birthyear) * 365;
    var h1 = document.createElement('h1');
    var textans = document.createTextNode('You are' + ' '+ days + ' ' + 'days old');
    h1.setAttribute('id','days');
    h1.appendChild(textans);
    document.getElementById('flex-box-result').appendChild(h1);
    console.log(days);
}
function reset() {
    document.getElementById('flex-box-result').remove();
}
//Function :- How to get high on cats
function cat() {
    var Image = document.createElement('img');
    var div = document.getElementById('flex-Cat-gen');
    Image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(Image);
}
function reset2() {
    document.getElementById('flex-Cat-gen').remove();
} 
//Challenge 3 :- Rock Paper scissors
function rpsgame(yourChoice) {
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    
    botChoice = numberToChoice(randToRpsInt());
    console.log('Computer Choice =', botChoice);
    
    results = decidewinner(humanChoice, botChoice);
    console.log(results);
   
    message = finalMessage(results); // ('message':'You won', 'color :'red');
    console.log(message);
   
    rpsfrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissor'] [number];
}
function decidewinner(yourChoice, computerChoice) {
    var rpsDatabase = {
    'rock': {'scissor': 1, 'rock': 0.5, 'paper': 0},
    'paper': {'rock': 1, 'paper': 0.5, 'scissor': 0},
    'scissor': {'paper': 1, 'scissor': 0.5, 'rock': 0}
    };
    
    
    var yourscore = rpsDatabase[yourChoice][computerChoice];
    var computerscore = rpsDatabase[computerChoice][yourChoice]; 
    
    return [yourscore, computerscore];
}

function finalMessage([yourscore, computerscore]) {
    if (yourscore === 0) { 
        return {'message':'you lost', 'color':'red'};  
    }else if (yourscore === 0.5) {
        return {'message':'you tied', 'color':'yellow'};
    }else {
        return {'message':'you won', 'color':'green'};
    }
}


function rpsfrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    }
    
    //lets remove all images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'> "
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML =  "<img src='" + imageDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'> "
    
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv); 
    document.getElementById('flex-box-rps-div').appendChild(botDiv); 
}


//Challenge 4 :- Change the color of all buttons

var all_buttons = document.getElementsByTagName('button');

var copyallbuttons = [];
for (let i=0; i < all_buttons.length; i++) {
    copyallbuttons.push(all_buttons[i].classList[1]);
}
console.log(copyallbuttons);
function buttoncolorchange(buttonthingy) {
    if (buttonthingy.value === 'Red'){
        buttonRed();
    }else if (buttonthingy.value === 'Green'){
        buttonGreen();
    }else if (buttonthingy.value === 'Reset'){
        buttoncolorReset();
    }else if (buttonthingy.value ===  'Random'){
        buttoncolorRandom();
    }
        
}

function buttonRed() {
    for (let i=0; i < all_buttons.length; i++) {
        console.log('color is red');
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonGreen() {
    for (let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}


function buttoncolorReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyallbuttons[i]);
    }
}

function buttoncolorRandom() {
    var choices = ['btn-primary', 'btn-danger', 'btn-warning', 'btn-success'];
    for (let i = 0; i < all_buttons.length; i++) {
        
        random_number = Math.floor(Math.random() * 4);
        
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[random_number]);
    }

}


//https://ie2-gfebf.cdnppb.net/mexchangeblackjack/turbo/17/assets/gameView/tableBackground.png?v17


//Challenge 5 Blackjack
let blackjackgame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Q', 'J', 'K', 'A'],
    'cardsmap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9' : 9, '10': 10, 'Q': 10,'J': 10,'K': 10,'A': [1, 11]},
    'wins': 0,
    'loss': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackgame['you']
const DEALER = blackjackgame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if (blackjackgame['isStand'] === false){
        let card = randomCard();
        console.log(card);
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
        console.log(YOU['score']);
    }
}

  
function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackgame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer['score'] <= 21) {
      let cardImage = document.createElement('img');
      cardImage.src = `static/images/${card}.png`
      document.querySelector(activePlayer['div']).appendChild(cardImage);
      hitSound.play()
  }
}

function blackjackDeal() {
    if (blackjackgame['turnsOver'] === true) {
       
        blackjackgame['isStand'] = false; 
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealersImages = document.querySelector('#dealer-box').querySelectorAll('img');
        
        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for (i = 0; i < dealersImages.length; i++) {
            dealersImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

        document.querySelector('#blackjack-result').textContent = "One more game ?";
        document.querySelector('#blackjack-result').style.color = 'black';
    
        blackjackgame['turnsOver'] = true;
    }
}


function updateScore(card, activePlayer) {
    if  (card === 'A') {
        if (activePlayer['score'] + blackjackgame['cardsmap'][card][1] <= 21) {
            activePlayer['score'] += blackjackgame['cardsmap'][card][1];
        }else {
            activePlayer['score'] += blackjackgame['cardsmap'][card][0];
        }
 
    }else {
    activePlayer['score'] += blackjackgame['cardsmap'][card];
    }
}


function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!!!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackgame['isStand'] = true; 

    while (DEALER['score'] < 16 && blackjackgame['isStand'] === true){
        let card = randomCard();
        console.log(card);
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    
    blackjackgame['turnsOver'] = true;
    let winner = computewinner();
    showResult(winner);
}


function computewinner() {
    let winner;

    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackgame['wins']++;
            winner = YOU;

        }else if (YOU['score'] < DEALER['score']) {
            blackjackgame['loss']++;
            winner = DEALER;

        }else if (YOU['score'] === DEALER['score']) {
            blackjackgame['draws']++;
        }
    
        else if (YOU['score'] > 21 && DEALER['score'] <= 21){
            blackjackgame['loss']++;
            winner = DEALER;

        }else if (YOU['score'] > 21 && DEALER['score'] > 21){
            blackjackgame['draws']++;
        }
    }
    
    console.log(blackjackgame);
    return winner;

}


function showResult(winner) {
    let message, messagecolor;

    if (blackjackgame['turnsOver'] === true){

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackgame['wins'];
            message = 'YOU WON!!!';
            messagecolor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackgame['loss'];
            message = 'You Lost my friend!!!';
            messagecolor = 'red';
            lossSound.play();
        }else {
            document.querySelector('#draws').textContent = blackjackgame['draws'];
            message = 'You Drew!';
            messagecolor = 'black';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messagecolor; 
    }
}