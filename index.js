

const modal = document.querySelector(".modal");
const infoModal = document.querySelector(".infoModal");
const triggers = document.querySelectorAll(".trigger");
const infoButton = document.getElementById("infoButton");
// const trigger2 = document.querySelectorAll(".trigger2");
const closeButton = document.querySelector(".close-button");
const infoCloseButton = document.querySelector(".infoClose-button");

let infoName = document.getElementById('infoName')
let inspText = document.getElementById('inspiration')
let impText = document.getElementById('implementation')
let lessText = document.getElementById('lessons')
let impArray = []
let projects = []
let currentInfo = {}
// const frameContent = document.querySelector("")


const SubEarthURL = 'https://ajphnx.github.io/SubEarth/'
const nVentoryURL = "https://nventory-frontend.herokuapp.com/"
const afterClassURL = "./assets/AfterClass_Mockup_05_alt_logo.png"


function clearModal (id){
    // currentInfo = {}
    document.getElementById(id).src = './assets/Blue_loading_cirlce.gif';

}

function changeSrc(loc) {
    clearModal('projectFrame')
    clearImps(impText)
    if(loc){
        document.getElementById('projectFrame').src = loc;
        console.log(`source changed to: ${loc}`)
        toggleModal();
    }
}

function toggleModal() {
    modal.classList.toggle("show-modal");
    infoButton.classList.toggle('show-infoButton')
}
function toggleInfoModal() {
    infoModal.classList.toggle("show-infoModal");
    console.log("window modal???")
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
        currentInfo = []
        // toggleInfoModal();
    }
}

function modalCheck(){
    
}

function fillFrame(name){
    // clearModal ('projectFrame');
    currentInfo = projects.find(project =>{
        return (
            project.name === name
        )
    })
    console.log('Changing Sources Name To: '+ name)
    switch(name) {
        case "subEarth":
            console.log('Changing URL To: '+ currentInfo.url)
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
    clearImps(impText)
}
function clearImps(tar){  
   return tar.innerHTML = "";
}
// Fill json info based on selected project button
function fillInfo(name){
    currentInfo = projects.find(project =>{
        return (
            project.name === name
        )
    })
    

    infoName.textContent = `"${currentInfo.name}"`
    inspText.innerHTML = currentInfo.info.inspiration

    currentInfo.info.implementation.map(imp=>{
        impText.innerHTML += `<li>  ${imp}  </li>`;
    })
    lessText.textContent = currentInfo.info.lessons
}
triggers.forEach(trigger =>{    
    trigger.addEventListener("click",function(e){
    console.log("triggering: "+this.id);
    // clearModal ('projectFrame');
    fillFrame(this.id);
    });
});

// 
closeButton.addEventListener("click", toggleModal);
infoCloseButton.addEventListener("click", toggleInfoModal);
infoButton.addEventListener("click",()=>{
    toggleInfoModal();
});
window.addEventListener("load",fetchInfo)
window.addEventListener("click", windowOnClick);
