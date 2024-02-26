import generateWinnerModal from "./generateWinnerModal.js";

export default function generateTicketView(bingoCard, drawer) {

   const tickets = document.querySelector('.cards');

   const div = document.createElement('div');
   div.classList.add('ticket');

   const idTicket = document.createElement('p');
   idTicket.innerText = `ID: ${bingoCard.getId()}`;
   div.appendChild(idTicket);

   div.dataset.id = bingoCard.getId();

   for (const number of bingoCard.getNumbers()) {
      const numberElement = document.createElement('div');

      numberElement.classList.add('number');
      numberElement.innerText = number;
      
      numberElement.addEventListener('click', function(e){
         if (bingoCard.isMarked(number)) {
            return;
         }

         if(!drawer.includes(number)){ 
            return;
         }

         bingoCard.markNumber(number);

         e.target.classList.add('marked');
         
         //Check if card full Winner, and opem Winner modal
         if(bingoCard.isClosedFullCard()){
            drawer.stopDraw();
            drawer.stopMusic();
            const card = document.querySelector(`[data-id="${bingoCard.getId()}"]`);
            card.style.backgroundColor = 'green';
            generateWinnerModal(bingoCard.getId());

            document.getElementById('reset').classList.remove('disabled');
         }
      });

      div.appendChild(numberElement);
   }

   tickets.appendChild(div);
}
