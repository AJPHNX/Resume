

const modal = document.querySelector(".modal");
const infoModal = document.querySelector(".infoModal");
const triggers = document.querySelectorAll(".trigger");
const infoButton = document.getElementById("infoButton");
// const trigger2 = document.querySelectorAll(".trigger2");
const closeButton = document.querySelector(".close-button");
const infoCloseButton = document.querySelector(".infoClose-button");

let projName = document.getElementById('projName')
let projStatus = document.getElementById('status')
let projDesc = document.getElementById('description')
let projRepo = document.getElementById('repo')
let projHost = document.getElementById('host')

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
    clearImps(projRepo)
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
        clearModal('projectFrame')
        toggleModal();
        currentInfo = []
        // toggleInfoModal();
    }
}

// function modalCheck(){
    
// }
function fillFrame(name){
    // clearModal ('projectFrame');
    currentInfo = projects.find(project =>{
        return (
            project.name === name
        )
    })
    changeSrc(currentInfo.url)
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
function repoCheck(){
    let i = 0;
    return( !currentInfo.repo.title ? projRepo.textContent = "N/A" :currentInfo.repo.map(repo=>{
                projRepo.innerHTML += ` <a href="${currentInfo.repo[i].link}"target="_blank"> ${currentInfo.repo[i].title} </a> <br>`;
                console.log(projRepo.innerHTML)
                console.log(currentInfo.repo[i])
                i++;
                // console.log(currentInfo.repo[repo].title)
            }))
    } 
// Fill json info based on selected project button
function fillInfo(name){
    currentInfo = projects.find(project =>{
        return (
            project.name === name
        )
    })
    
    projName.textContent = `"${currentInfo.name}"`
    projStatus.textContent = currentInfo.status;
    projDesc.textContent = currentInfo.description;
    let host_link=`<a href="${currentInfo.url}">${currentInfo.host}</a>`
    console.log(host_link)
    projHost.innerHTML = host_link;
    inspText.innerHTML = currentInfo.info.inspiration

    currentInfo.info.implementation.map(imp=>{
        impText.innerHTML += `<li>  ${imp}  </li>`;
    })
    lessText.textContent = currentInfo.info.lessons
    let i = 0;
    currentInfo.repo.map(repo=>{
        projRepo.innerHTML = ` <a href="${currentInfo.repo[i].link}"target="_blank"> ${currentInfo.repo[i].title} </a> <br>`;
        console.log(projRepo.innerHTML)
        console.log(currentInfo.repo[i])
        i++;
        // console.log(currentInfo.repo[repo].title)
    });
      
    // repoCheck()
}
triggers.forEach(trigger =>{    
    trigger.addEventListener("click",function(e){
    console.log("triggering: " + this.id);
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
