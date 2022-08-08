

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
    clearModal ('projectFrame');
    switch(name) {
        case "subEarth":
            changeSrc(currentInfo.url)
          break;
        case "nVentory":
            changeSrc(currentInfo.url)
            break;
        case "afterClass":
            changeSrc(currentInfo.url)
          break;
    }
    fillInfo(name);
}
//Fetch info from Json file
async function fetchInfo(){
    const response = await fetch('./assets/Projects.json')
    const data = await response.json()
    projects = data.projects 
}
// Fill json info based on selected project button
function fillInfo(name){
    currentInfo = projects.find(project =>{
        return (
            project.name === name
        )
    })
    let inspText = document.getElementById('inspiration')
    let impText= document.getElementById('implementation')
    let lessText= document.getElementById('lessons')

    inspText.innerHTML=currentInfo.info.inspiration
    impText.innerHTML=currentInfo.info.implementation
    lessText.innerHTML=currentInfo.info.lessons

    // console.log(currentInfo)
    // infoBox.innerHTML=`<p>${currentInfo}</p> `
}
triggers.forEach(trigger =>{    
    trigger.addEventListener("click",function(e){
    console.log(trigger.id);
    clearModal ('projectFrame');
    fillFrame(trigger.id);
    });
});
// infoTriggers.addEventListener("click",toggleInfoModal)
closeButton.addEventListener("click", toggleModal);
// infoCloseButton.addEventListener("click", toggleInfoModal);
window.addEventListener("load",fetchInfo)
window.addEventListener("click", windowOnClick);
