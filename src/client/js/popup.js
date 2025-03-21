const path = require("path");

const careerPopBtn = document.getElementById("careerPopBtn");
const projectPopBtn = document.getElementById("projectPopBtn");
const profilePopBtn = document.getElementById("profilePopBtn");
const projectUl = document.getElementById("project__ul");
let careerEditBtns = document.getElementsByClassName("careerEditBtn");

const profilePopBtnHandler = (e)=>{
    const baseurl = `/popup`;
    const target = 'profile';
    const fullURL = path.join(baseurl,target);

    popUp(fullURL);
}

profilePopBtn.addEventListener("click",profilePopBtnHandler);



/**
 * 경력 수정 팝업 띄우기 버튼
 */
const careerEditPopBtnHandler =(e)=>{
    const {
        dataset:{
            url
        },
        parentElement: {
            dataset:{
                companyid
            }
        }
    } = e.target;
    
    const baseURL = `/popup`;
    const fullURL = path.join(baseURL,url,companyid);
    
    popUp(fullURL);
    
}

for(let i=0;i<careerEditBtns.length;i++){

    careerEditBtns.item(i).addEventListener("click",careerEditPopBtnHandler
    )
}

const handleEachPopup = (e) =>{
    
    if(e.target&&e.target.classList.contains("projectEditBtn")){
        const baseURL = '/popup';
        const {
            dataset:{
                url
            },
            parentElement: {
                dataset:{
                    projectid
                }
            }
        } = e.target;
        
        const fullURL = path.join(baseURL,url,projectid);
        
        popUp(fullURL);
    }
}

projectUl.addEventListener("click",handleEachPopup)


careerPopBtn.addEventListener("click",()=>{
    const baseURL = `/popup`;

    const target = careerPopBtn.dataset.url;
    const fullURL =path.join(baseURL,target);
    
    popUp(fullURL);
    
})

projectPopBtn.addEventListener("click",()=>{
    const baseURL = `/popup`;
    const target = projectPopBtn.dataset.url;
    const fullURL =path.join(baseURL,target);

    popUp(fullURL);
})

const popUp = (fullURL)=>{
    window.open(`${fullURL}`,"",{
        popup:true
    });
}

