// @file diceGame.js
// @author Manyi Cheng & Jonas Schmedtmann
// @brief A simple web game implemented in JavaScript, two players roll 
//          dice untill a player wins, with a score exceeding 50.
// @date 25/02/2020

var scores, roundScore, activePlayer, gamePlaying;
initializeStates();
//. to select class, # to select id

//style method, display property

//read0
var read = document.querySelector('#current-0').textContent;

// function btn(){
// }
//document.querySelector('.btn-roll').addEventListener('click', btn); 
//function passed to another function as an argument : callback function

//anonymous function: no name, cannot be reused
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(!gamePlaying){
        return;
    }
    //1. random number
    var dice = Math.floor(Math.random()*6)+1;

    //2. display result dice
    //document.querySelector('#current-' + activePlayer).textContent = dice;
    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = '../graphics/dice-' + dice + '.png';

    //3. update the round score if the rolled number was not a 1
    if (dice !== 1){ //!== and === does not do type coercion
        //add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + roundScore + '</em>';
    }else{
        switchPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(!gamePlaying){
        return;
    }
    //add current score to global score
    scores[activePlayer] += roundScore;


    //update the ui
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

    //check if the player won the game
    if (scores[activePlayer] >= 50){ //!== and === does not do type coercion
        //add score
        document.querySelector('#name-'+activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        gamePlaying = false;
    }
    //switch player
    else{
        switchPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', initializeStates);
//omit the brackes to pass in the function as argument, this way it will not run the function

function switchPlayer(){
    roundScore = 0;
    (activePlayer === 0) ? activePlayer = 1 : activePlayer = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    // document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function initializeStates(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    //set by id
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}