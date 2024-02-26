import generateBingoCard from "./modules/generateBingoCard.js";
import generateTicketView from "./components/generateTicket.js";
import generateDrawer from "./modules/generateDrawer.js";
import updateNumberContainer from "./components/updateNumberContainer.js";

const game = {
   drawer: generateDrawer({ drawerRange: 10 }),
   totalCards: [],
   drawnNumbers: [],
   lastDrawnNumber: null
}
const bingoCardInfo = {
   maxRange: 10,
   cardLength: 5
}

const start = document.getElementById('start');
const buyTicket = document.getElementById('buyTicket');
const resetGame = document.getElementById('reset');

buyTicket.addEventListener('click', function () {

   const ticket = generateBingoCard(bingoCardInfo);
   game.totalCards.push(ticket);
   generateTicketView(ticket, game.drawer);

   if (game.totalCards.length < 2) {
      start.classList.add('disabled');
   } else {
      start.classList.remove('disabled');
   }

   if (game.totalCards.length > 3) {
      buyTicket.classList.add('disabled');
   }

});

start.addEventListener('click', function startGame() {
   buyTicket.classList.add('disabled');
   start.classList.add('disabled');

   game.drawer.draw();
   updateNumberContainer(game);

});

resetGame.addEventListener('click', () => {
   location.reload();
});



