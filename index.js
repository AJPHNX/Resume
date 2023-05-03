
// -----DOM Elements-------//
// const modal = document.querySelector(".modal-fx");
const modal = document.getElementById("browser-modal");
const infoModal = document.getElementById("term-modal");
const triggers = document.querySelectorAll(".trigger");

const about_trigger = document.querySelector(".about-trigger");
const contact_trigger = document.querySelector(".contact-trigger");
const contact_close = document.querySelector(".contact-close");
const aboutDiv = document.querySelector(".about-div");
const aboutModal = document.querySelector(".about-modal");
const contactModal = document.querySelector(".contact-modal");

const browserInfoAlert = document.getElementById("browser-info-alert");
const infoButton = document.getElementById("infoButton");
const nav_left = document.getElementById("nav-left");
const nav_right = document.getElementById("nav-right");
const nav_refresh = document.getElementById("nav-refresh");
const emailButton = document.getElementById("email-link");
// const trigger2 = document.querySelectorAll(".trigger2");
const closeButton = document.querySelector(".browser-button-cls");
const termCloseButton = document.getElementById("term-button-cls");
// const termCloseButton = document.getElementById("x-btn-text");
// const infoCloseButton = document.querySelector(".infoClose-button");

// -----Project vars--------//
let projName = document.querySelector('.projName')
// let term_projName = document.querySelector('.term-projName')
let browser_url = document.getElementById('browser-url')
let browser_title = document.getElementById('browser-title')
let browser_infoBtn = document.getElementById('infoButton')

let projStatus = document.getElementById('status')
let projTech = document.getElementById('technologies')
let projDesc = document.getElementById('description')
let projRepo = document.getElementById('repo')
let projHost = document.getElementById('deployment')
let projFront = document.getElementById('frontend')
let projBack = document.getElementById('backend')
let inspText = document.getElementById('inspiration')
let impText = document.getElementById('implementation')
let lessText = document.getElementById('lessons')
let t_f_yearText = document.getElementById('term-footer-year')
let b_f_yearText = document.getElementById('browser-footer-year')

// -----Globals --------//
let impArray = []
let projects = []
let currentInfo = {}
let infoOpen = false
// const frameContent = document.querySelector("")


const SubEarthURL = 'https://ajphnx.github.io/SubEarth/'
const nVentoryURL = "https://nventory-frontend.herokuapp.com/"
const afterClassURL = "./assets/AfterClass_Mockup_05_alt_logo.png"

const navOrder = [10,11,7,8,9,0,1,2,3,4,5,6]
let navPos = 0//= navOrder.indexOf(currentInfo.id)
// let curNavPos = Number(0)
let nextNavId //= navOrder[navPos+1]
let prevNavId //= navOrder[navPos-1]

// const navOrder = ['10','7','8','9','0','1','2','3','4','5','6']
function clearModal (id){
    // currentInfo = {}
    //TODO---Add Loading.html instead to center it
    document.getElementById('projectFrame').src = './assets/loading-bar.gif';
}


function changeSrc(loc) {
    // if(projRepo){
        clearImps(projRepo)
    // }
    // clearModal('projectFrame')
    clearImps(impText)
    // clearImps(projRepo)
    if(loc){
        document.getElementById('projectFrame').src = loc;
        console.log(`source changed to: ${loc}`)
        browser_url.textContent = currentInfo.url
        // toggleModal();
    }
}

function toggleModal() {
    modal.classList.toggle("show-modal");
    if(modal.classList.contains("show-modal")){ toggleInfoModal()}

    
}
function toggleInfoModal() {
    // infoModal.classList.toggle("show-termModal");
    console.log("term modal?",infoModal)
    console.log("[toggleInfoModal]: infoModal.classList", infoModal.classList)
    if(modal.classList.contains("show-modal")){
        infoModal.classList.toggle("show-termModal");
        infoOpen = true
    }else{infoOpen = false
        infoModal.classList.toggle("show-termModal");
        // browserInfoAlert.classList.toggle("show-browser-info-alert");
        console.log("browserInfoAlert.classList",browserInfoAlert.classList)
    }
 
}
function toggleAbout() {
    aboutModal.classList.toggle("show-about-modal");
    about_trigger.classList.toggle("center");
    about_trigger.classList.toggle("about-move");
    about_trigger.classList.toggle("med_man_grow");
    aboutDiv.classList.toggle("show-about-div");
    console.log("Showing about?")
}
function toggleContact() {
    contactModal.classList.toggle("show-contact-modal");
    console.log("Showing contact modal?")
}

function sel_mod_content(e){
    switch(e.target){
        case about_trigger:
            console.log("about")
        break;
        case email_trigger:
            console.log("email")
        break;
    }
    e.target.classList.toggle("")
}
function windowOnClick(event) {
    if (event.target === modal) {
        console.log("modal click!")
        clearModal('projectFrame')
        toggleModal();
        // currentInfo = []
    }
}

// function modalCheck(){
    
// }
function fillFrame(id){
    // clearModal ('projectFrame');
    console.log("fillFrame id:", id)
    // console.log("fillFrame:", id)
    currentInfo = projects.find(project =>{
        // console.log("fillFrame project:", project.id === id)
        return (
            // project.id == 0
            project.id == id
            )
        })
        curNavPos = Number(navOrder.indexOf(Number(currentInfo.id)))
        changeSrc(currentInfo.url)
        browser_url.textContent = currentInfo.url
        browser_title.innerHTML = `<span><img src="${currentInfo.icon_url}" id="browser-favicon"> &nbsp;${currentInfo.name}</span>`
        fillInfo(currentInfo.id);
        console.log("fillFrame curNavPos:", curNavPos)
        console.log("fillFrame id:",currentInfo.id)
}
//Fetch info from Json file
async function fetchInfo(){
    const response = await fetch('./assets/Projects.json')
    // const response = await fetch('https://github.com/AJPHNX/Resume/blob/main/assets/Projects.json')
    const data = await response.json()
    projects = data.projects
    // clearImps(impText)
    // clearImps(projRepo)
}

function clearImps(tar){ 
     tar.innerHTML = '';
     tar.textContent = '';
    }

function repoCheck(){
    let i = 0;
    return( 
        !currentInfo.repo.title ? projRepo.textContent = "N/A" :currentInfo.repo.map(repo=>{
                projRepo.innerHTML += ` <a href="${currentInfo.repo[i].link}"target="_blank"> ${currentInfo.repo[i].title} </a> <br/>`;
                // console.log("projRRepo innerHTML:",projRepo.innerHTML)
                // console.log(currentInfo.repo[i])
                i++;
                // console.log(currentInfo.repo[repo].title)
            }))
    } 
 
function checkKey(e) {
    e = e || window.event;
    switch (e.key) {
        case "ArrowLeft":
            console.log("ArrowLeft")
            decNav()
            break;
            case "ArrowRight":
                console.log("ArrowRight")
                incNav()
            break;
        case "ArrowUp":
            // Up pressed
            break;
        case "ArrowDown":
            // Down pressed
            break;
    }

}
function incNav(){
    let info
    navPos = navOrder.indexOf(Number(currentInfo.id))
    if( navPos >= projects.length-1){
        info = projects.filter(project => {
        return project.id == navOrder[0]
      })
      currentInfo = info[0]
      nextNavId = navOrder[1]
    }
    else{        
        nextNavId = navOrder[(Number(navPos)+1)]
        info = projects.filter(project => {
        return project.id == nextNavId
      })
       currentInfo = info[0]
    }
    changeSrc(currentInfo.url)
    fillFrame(currentInfo.id);
    fillInfo(currentInfo.id);
}

function decNav(){
    navPos = navOrder.indexOf(Number(currentInfo.id))
    if(navPos < 1){
        info = projects.filter( project => {
            return project.id == navOrder[projects.length-1]
          })
        currentInfo = info[0]
        navPos = navOrder[projects.length-1]
        prevNavId = navOrder[projects.length-1]
    }
    else{ 
        navPos -= 1
        prevNavId = navOrder[navPos]
        info = projects.filter( project => {
            return project.id == Number(prevNavId)
          })
           currentInfo = info[0] 
    }
    changeSrc(currentInfo.url)
    fillFrame(currentInfo.id);
    fillInfo(currentInfo.id);
}
function refresh(){
    // changeSrc(currentInfo.url)
    clearModal();
    changeSrc(currentInfo.url)
    fillInfo(currentInfo.id);
}

// Fill json info based on selected project button
function fillInfo(id){
    
   currentInfo = projects.find(project =>{
        return (
            project.id == id
            )
        })
    navPos = navOrder.indexOf(currentInfo.id)
    // navPos = navOrder.indexOf(currentInfo.id)
    // console.log("fillInfo currentInfo:", currentInfo)
    console.log("fillInfo currentInfo.name:", currentInfo.name)

        
    projName.textContent = currentInfo.name? `"${currentInfo.name}"`:"n/a"
//    term_projName.textContent = currentInfo.name? `"${currentInfo.name}"`:"n/a"
    projStatus.textContent = currentInfo.status;
    projTech.textContent = currentInfo.technologies;

    projDesc.textContent = currentInfo.description;

    let front_link ='n/a'
    let back_link ='n/a'
    let db_link ='n/a'

    if(currentInfo.deployment.frontend){ front_link = `<a href="${currentInfo.url}"target ="_blank">${currentInfo.deployment.frontend}</a>`}
    if(currentInfo.deployment.backend){ back_link = `<a href="${currentInfo.url}"target ="_blank">${currentInfo.deployment.backend}</a>`}
    if(currentInfo.deployment.database){ db_link = `<a href="${currentInfo.url}"target ="_blank">${currentInfo.deployment.database}</a>`}
    console.log("Fillinfo host_link:",front_link)
    // projHost.innerHTML = front_link;
    let depl_HTML = `<blockquote>
        frontend
        <span id="frontend"> 
            ${front_link}
         </span>
        </br>
        backend
        <span id="backend">
            ${back_link}
         </span>
        </br>
        database<span id="database"> ${db_link}</span></blockquote>`
    
    // console.log("Fillinfo depl_HTML:",depl_HTML)

    projHost.innerHTML = depl_HTML

    inspText.innerHTML = currentInfo.info.inspiration
    
    if(!currentInfo.info.implementation){
        impText.textContent="n/a"
    }else{
        // console.log(currentInfo.info.implementation)
        // impText.textContent = currentInfo.info.implementation
        impText.textContent=""
        //! ----To Be Unbugged--------
        currentInfo.info.implementation.forEach((imp) => {
           impText.innerHTML += `<li>  ${imp}  </li>`;
        //    console.log('imp:',imp)
        })
        //! ----To Be Unbugged--------
    }

    let CRString = `© ${currentInfo.year} ${((Number(currentInfo.year)< 2023))? 'AJPHNX': 'RexEntropy LLC'}`
    lessText.textContent = currentInfo.info.lessons
    t_f_yearText.textContent = CRString
    b_f_yearText.textContent = CRString

    let i = 0;
    let comma = ``
    projRepo.innerHTML = `` 
    currentInfo.repo.forEach(repo=>{
        projRepo.innerHTML += ` <a href="${currentInfo.repo[i].link}"target="_blank"> ${currentInfo.repo[i].title} </a> ${comma}`;
        // console.log(projRepo.innerHTML)
        // console.log(currentInfo.repo[i],i)
        i++;
        comma = `,`
        // console.log(currentInfo.repo[repo].title)
    });
      
    // repoCheck()
}
triggers.forEach(trigger =>{    
    trigger.addEventListener("click",function(e){
        // preventDefault()
        let id = this.value
    console.log("triggering: "+ id);
    clearModal ('projectFrame');
    fillFrame(id);
    fillInfo(id);
    // navPos = navOrder.indexOf(id)
    toggleModal()
    });
});


// 
about_trigger.addEventListener("click", toggleAbout);
contact_trigger.addEventListener("click", toggleContact);
contact_close.addEventListener("click", toggleContact);
about_trigger.addEventListener("mouseover",()=>{
    //about_trigger.textContent = 
});
closeButton.addEventListener("click", toggleModal);
// termCloseButton.addEventListener("click", toggleModal);
termCloseButton.addEventListener("click", ()=>{toggleInfoModal()});
infoButton.addEventListener("click",()=>{
    fillInfo(currentInfo.id)  
    toggleInfoModal();
});
// browser_infoBtn.addEventListener("click",()=>{
//     fillInfo(currentInfo.id)  
//     toggleInfoModal();
// });
document.onkeydown = checkKey;
nav_left.addEventListener("click", decNav);
nav_right.addEventListener("click", incNav);
nav_refresh.addEventListener("click", refresh);
// browser_infoBtn.addEventListener("click", toggleInfoModal);

// window.addEventListener("load",fetchInfo)
window.addEventListener("click", windowOnClick);
window.addEventListener("click", fetchInfo);

// fetchInfo()