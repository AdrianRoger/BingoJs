export default function updateNumberContainer(game){
   
   const updateView = setInterval(function () {
      if(game.lastDrawnNumber !== game.drawer.getLastNumber()){
         game.lastDrawnNumber = null;
         game.lastDrawnNumber =  game.drawer.getLastNumber();
         
         if(game.lastDrawnNumber){
            callNewBall(game);
         }
      }

      if (game.drawer.getDrawnNumbers().length === 75) {
         game.drawer.stopDraw();
         clearInterval(updateView);
      }

      if (game.drawer.getDrawnNumbers().length !== game.drawnNumbers.length) {
         setTimeout(function(){
            game.drawnNumbers = [...game.drawer.getDrawnNumbers()];
            
            const dNumbers = document.querySelector('.drawn-numbers');
            dNumbers.innerHTML = '';
            for(const number of game.drawnNumbers){
               const div = document.createElement('div');
               div.classList.add('number');
               div.innerText = `${number}`;
               
               dNumbers.appendChild(div);
            }
         }, 500);    
      }

      //Loop to Check if the have have some Winner
      for(const card of game.totalCards){
         if(card.isClosedFullCard()){
            clearInterval(updateView);
         }
      }
   }, 500);
}

function callNewBall(game){
   const ballContainer = document.querySelector('.new-number');
   const oldBall = ballContainer.querySelector('.ball');

   const newball = document.createElement('div');
   
   ballContainer.appendChild(newball);
   setTimeout(() => {
      newball.classList.add('ball');
      newball.innerText = game.lastDrawnNumber;
   }, 10);

   if(oldBall){
      oldBall.classList.add('go-out');
      setTimeout(()=>{
         ballContainer.removeChild(oldBall);
      }, 500);
   }
}

