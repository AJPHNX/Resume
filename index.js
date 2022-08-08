

const modal = document.querySelector(".modal");
const infoModal = document.querySelector(".infoModal");
const triggers = document.querySelectorAll(".trigger");
const infoTriggers = document.querySelectorAll(".infoTrigger");
// const trigger2 = document.querySelectorAll(".trigger2");
const closeButton = document.querySelector(".close-button");
const infoCloseButton = document.querySelector(".infoClose-button");
let projects = []
let currentInfo = {}
// const frameContent = document.querySelector("")


const SubEarthURL = 'https://ajphnx.github.io/SubEarth/'
const nVentoryURL = "https://nventory-frontend.herokuapp.com/"
const afterClassURL = "./assets/AfterClass_Mockup_05_alt_logo.png"


function clearModal (id){
    document.getElementById(id).src = '';
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
function toggleInfoModal() {
    modal.classList.toggle("show-InfoModal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

function fillFrame(name){
    switch(name) {
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
    fillInfo(name);
}
//Fetch info from Json file
async function fetchInfo(){
    const response = await fetch('./assets/Projects.json')
    const data = await response.json()
    projects = data.projects
    // projects.forEach(project => {
        
    //     console.log(project.name,': ', project.description)
    // })
    // document.getElementById('infoWrap').textContent = name;
}
// Fill json info based on selected project button
function fillInfo(name){
    currentInfo = projects.find(project =>{
        return (
            project.name === name
        )
    })
    console.log(currentInfo)
}
triggers.forEach(trigger =>{    
    trigger.addEventListener("click",function(e){
    console.log(trigger.id);
    clearModal ('projectFrame');
    fillFrame(trigger.id);
    // fillFrame(e.target.id);
    });
});
// infoTriggers.addEventListener("click",toggleInfoModal)
closeButton.addEventListener("click", toggleModal);
// infoCloseButton.addEventListener("click", toggleInfoModal);
window.addEventListener("load",fetchInfo)
window.addEventListener("click", windowOnClick);
