/**
 * Generates numbers for a new bingo card.
 * 
 * @typedef {Object} BingoCard
 * @property {number} id - The ID of the bingo card.
 * @property {number[]} numbers - The numbers on the bingo card.
 * @property {function} markNumber - Marks a number on the bingo card.
 * @property {function} getId - Gets the ID of the bingo card.
 * @property {function} getNumbers - Gets the numbers of the bingo card.
 * 
 * @param {Object} options - Customizable options for genarating the bingo card.
 * @param {number} options.maxRange - The maximum number allowed on the bingo card.
 * @param {number} options.cardLength - The size of the bingo card (number of numbers).
 * 
 * @returns {BingoCard} An object representing the bingo card.
 */
export default function generateBingoCard(options) {
   const { maxRange = 75, cardLength = 10} = options || {};
   let id;
   let numbers = [];
   let numbersMarked = [];
   let winner = new Audio('../../audio/youWin.mp3');

   function initializeNumbers() {
      id = new Date().getTime();

      while (numbers.length < cardLength) {
         let number = Math.floor(Math.random() * maxRange) + 1; //max and min inclusive

         if (!numbers.includes(number)) {
            numbers.push(number);
            numbers.sort((a, b) => a - b);
         }
      }
   }
   initializeNumbers();

   function isClosedFullCard() {
      if (numbersMarked.length === numbers.length) {
         winner.play();
         return true;
      }

      return false;
   }

   //This function is to protect attribute id from direct modifications, 
   //now after (it's?) create it's been read only.
   function getId() {
      return id;
   }

   //This function works same the function before, the array of numbers now is read only.
   function getNumbers() {
      return numbers;
   }

   //This function works same the function before, the array of numbers now is read only.
   function getNumbersMarked() {
      return numbersMarked;
   }
   
   function markNumber(num) {
      if (numbersMarked.includes(num)) {
         return
      }

      numbersMarked.push(num);
      numbersMarked.sort((a, b) => a - b);
      // isCloseFullCard();
   }

   function isMarked(num) {
      return numbersMarked.includes(num);
   }

   return {
      getId,
      getNumbers,
      isClosedFullCard,
      getNumbersMarked,
      markNumber,
      isMarked
   }
}
