
const modal = document.querySelector(".modal");
const triggers = document.querySelectorAll(".trigger");
// const trigger2 = document.querySelectorAll(".trigger2");
const closeButton = document.querySelector(".close-button");
// const frameContent = document.querySelector("")

const SubEarthURL =  "https://ajphnx.github.io/SubEarth/"
const nVentoryURL = "https://nventory-frontend.herokuapp.com/"

function changeSrc(loc) {
    document.getElementById('projectFrame').src = loc;
    console.log(`source changed to: ${loc}`)
    toggleModal();
}

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

function fillFrame(id){
    switch(id) {
        case "subEarth":
            changeSrc(SubEarthURL)
          break;
        case "nVentory":
            changeSrc(nVentoryURL)
          break;
    }
}

triggers.forEach(trigger =>{
    trigger.addEventListener("click",function(e){
    console.log(trigger.id)
    fillFrame(trigger.id)
   
    // fillFrame(e.target.id);

    
    });
});

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);