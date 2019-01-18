/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,roundScores,activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function()  {
    
    if(gamePlaying){
        
        //Randome number generation                                             
      dice = Math.floor(Math.random() * 6) +1;
                        
//2. Display the result
var diceDom = document.querySelector('.dice');
diceDom.style.display = 'block';
diceDom.src ='dice-' + dice + '.png';

   // Update the round score if the rolled number was not a 1
    
    if(dice !== 1){
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        //Add score
    } else {
      nextPlayer();
    }
        }
    
});


//Setting up event Listener for the hold button 

document.querySelector('.btn-hold').addEventListener('click' ,function() {
    
    if(gamePlaying){
        
    //Add Current score to global score
    score[activePlayer] += roundScore;
    
    //Update the UI
    //Basically updating the global score to the players and toggle
    document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];    
    
     //Check if the player wins the game
     if (score[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
         document.querySelector('.dice').style.display = 'none';
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
        
        document.querySelector('.dice').style.display = 'none';
        
        
    }


document.querySelector('.btn-new').addEventListener('click', init);


function init(){ 

score=[0,0];
 roundScore =0;
activePlayer=0;
gamePlaying =true;

document.querySelector('.dice').style.display ='none';

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



//Coding challenge




    
//Object that gives access to the DOM is Document object, so we need to put the dice values in score of the curent player

//to use html styling 
//document.querySelector('#current-' +activePlayer).innerHTML = '<em>' + dice + '</em>';


  //Getter and reading the element
//To get the element from the html content
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

//Queryselector to returnt some CSS
//Not to show the dice in the beginning of the game or before the dice is rolled.


//Setting up an event handler


//document.querySelector('.btn-roll').addEventListener('click',btn);
//callback passing a function to another function which is btn

//Anonymous function that is a function that doesnt have a name or isnt declared anywhere but in a function
//document.querySelector('.btn-roll').addEventListener('click',function btn());


   
        //Show the status of the active player which is associated with the active class in the active panel.
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
    
//Setter
//document.querySelector('#current-' + activePlayer).textContent =dice;
