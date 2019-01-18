//Coding challenges

var scores,roundScores,activePlayer, gamePlaying;

init();
var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function()  {
    
if(gamePlaying){
        
//Randome number generation                                             
var dice1 = Math.floor(Math.random() * 6) +1;
  var dice2 = Math.floor(Math.random() * 6) +1;   
    
//2. Display the result
//var diceDom = document.querySelector('.dice');
document.getElementById('dice-1').style.display ="block";
document.getElementById('dice-2').style.display ="block";
document.getElementById('dice-1').src ='dice-' + dice1 + '.png';
    document.getElementById('dice-2').src ='dice-' + dice2 + '.png';

//3. Update the round score if the rolled number was not a 1 and two players canr roll 6

       if(dice1 !== 1 && dice2 !== 1 ){
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        //Add score
    } else {
      nextPlayer();
    }
        }
    
    
    
 /*   
if(dice === 6 && lastDice === 6){
    //Player loses
    score[activePlayer] =0;
    document.querySelector('#current-' + activePlayer).textContent = '0';
    nextPlayer();
}    
    
else if(dice !== 1){
roundScore += dice;
document.querySelector('#current-' + activePlayer).textContent = roundScore;
//Add score
} else {
nextPlayer();
 }
    lastDice =dice;
}

*/
    
});


//Setting up event Listener for the hold button 

document.querySelector('.btn-hold').addEventListener('click' ,function() {
    
    if(gamePlaying){
        
    //Add Current score to global score
    score[activePlayer] += roundScore;
    
    //Update the UI
    //Basically updating the global score to the players and toggle
    document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];   
        
        input = document.querySelector('.final-score').value;
        var winningScore;
        //If the users dont input the value in the text field?
        //undefined, 0, null , " " to false
        //Everything is true
        if(input){
            winningScore = input;
        }
        else {
            winningScore = 100; // default value
        }
    
     //Check if the player wins the game
     if (score[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
           document.getElementById('dice-1').style.display = 'block';
           document.getElementById('dice-2').style.display = 'block';
         document.querySelector('player-' + activePlayer + '-panel').classList.add('winner');
         document.querySelector('player-' + activePlayer + '-panel').classList.remove('winner');
    }
   
    
    //Using DRY principles and you switch to another player
    nextPlayer();
        }
           
});



    function nextPlayer(){
        //next player
         activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
        roundScore =0;
        
         document.getElementById('current-0').textContent = '0';
          document.getElementById('current-1').textContent = '0';
        
         document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    
        //when the 1 player rolls the dice and when hes over with his turn , we need to hide the dice image and let the the 2 player start his game.
        
      document.getElementById('dice-1').style.display = 'block';
      document.getElementById('dice-2').style.display = 'block';
        
        
    }


document.querySelector('.btn-new').addEventListener('click', init);


function init(){ 

score=[0,0];
 roundScore =0;
activePlayer=0;
gamePlaying =true;

  document.getElementById('dice-1').style.display = 'block';
           document.getElementById('dice-2').style.display = 'block';

 //Set the current scores to 0 by selecting fields by ID
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}



