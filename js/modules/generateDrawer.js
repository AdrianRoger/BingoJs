/**
 * Generates a drawer for bingo numbers.
 * 
 * @param {Object} drawerSettings - drawerSettings for the drawer.
 * @param {number} drawerSettings.drawerRange - The range of numbers the drawer can draw from.
 * 
 * @returns {Object} An object representing the bingo number drawer.
 */
export default function generateDrawer(drawerSettings) {
   const { drawerRange = 75 } = drawerSettings || {};
   const ms = 4000;
   let drawnNumbers = [];
   let drawTimer;
   let lastNumber;

   const backSound = new Audio('../../audio/gameMusic.mp3');
   backSound.loop = true;
   backSound.volume = 0.5;

   /**
    * Draws a new bingo number at regular intervals.
    */
   function draw() {
      backSound.play();
      drawTimer = setInterval(function () {
         lastNumber = Math.floor(Math.random() * drawerRange) + 1;
         while (drawnNumbers.includes(lastNumber)) {
            lastNumber = Math.floor(Math.random() * drawerRange) + 1;
         }

         drawnNumbers.push(lastNumber);
         drawnNumbers.sort((a, b) => a - b);

         if (drawnNumbers.length === drawerRange) {
            stopDraw();
         }

         // console.log(drawnNumbers);
      }, ms);
   }

   /**
    * Stops the drawing of bingo numbers.
    */
   function stopDraw() {
      clearInterval(drawTimer);
   }

   function getDrawnNumbers() {
      return drawnNumbers;
   }

   function getLastNumber() {
      return lastNumber;
   }

   function stopMusic(){
      backSound.loop = false;
      backSound.pause();
   }

   /**
    * Check if number includes in drawnNubers
    */
   function includes(num) {
      return drawnNumbers.includes(num);
   }

   return {
      draw,
      stopDraw,
      getDrawnNumbers,
      getLastNumber,
      stopMusic,
      includes
   };
}
