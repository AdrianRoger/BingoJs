export default function generateWinnerModal(id){
   const main = document.querySelector('main');

   const backModal = document.createElement('div');
   backModal.classList.add('back-modal');

   const modal = document.createElement('div');
   modal.classList.add('modal');
   modal.innerHTML = 
   `<h1>Congratulations</h1>
   <h3>ID: ${id}</h3>
   <img src="/img/moneyBag.png" alt="Image of a money bag">`;   
   backModal.appendChild(modal);
   main.appendChild(backModal);

   //Event to leave modal and remove events click on others tickets
   backModal.addEventListener('click', function(){
      location.reload();
   });

   modal.addEventListener('click', (e)=>{
      e.stopPropagation();
   })
}
