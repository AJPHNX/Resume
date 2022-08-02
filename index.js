
const modal = document.querySelector(".modal");
const triggers = document.querySelectorAll(".trigger");
// const trigger2 = document.querySelectorAll(".trigger2");
const closeButton = document.querySelector(".close-button");
// const frameContent = document.querySelector("")

const SubEarthURL =  "https://ajphnx.github.io/SubEarth/"
const nVentoryURL = "https://nventory-frontend.herokuapp.com/"
const afterClassURL = "./assets/AfterClass_Mockup_05_alt_logo.png"

function clearModal (){
    document.getElementById('projectFrame').src = '';
}

function changeSrc(loc) {
    document.getElementById('projectFrame').src = loc;
    console.log(`source changed to: ${loc}`)
    // var div = document.getElementById("frameWrapp");
    // div.onload = function() {
    //     div.style.height =
    //     div.contentWindow.document.body.scrollHeight + 'px';
    // }
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
        case "afterClass":
            changeSrc(afterClassURL)
          break;
    }
}

triggers.forEach(trigger =>{
    trigger.addEventListener("click",function(e){
    console.log(trigger.id);
    clearModal ();
    fillFrame(trigger.id);
    // fillFrame(e.target.id);
    });
});

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);