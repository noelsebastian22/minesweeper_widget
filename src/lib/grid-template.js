export const gridTemplate = () => {
  return `
  <div class = "container">
  <div class="modal-close cancel-booking">
        <div class="mine-timer"> Timer <span class = "timer"></span> </div>
        <div class="close-icon">
            <span class="bar1"></span>
            <span class="bar2"></span>
            <span class="bar3"></span>
        </div>
    </div>
    <div class="mine-grid" id="mine-grid">
        
     </div>
     <div class = "mine-grid-footer"> 
      <div class = "refresh-mine-grid"> Reset Game <img src="https://img.icons8.com/metro/26/000000/refresh.png"/> </div>
      <div class="spacer"> </div>
      <div class= "flag-count-display">Flags remaining: </div>
     <div>
   </div>
    `;
};
