const path = require("path");

const careerPopBtn = document.getElementById("careerPopBtn");
const projectPopBtn = document.getElementById("projectPopBtn");
let careerEditBtns = document.getElementsByClassName("careerEditBtn");

const careerEditBtnHandler =(e)=>{
    const {companyid,url} = e.target.dataset;
    const baseURL = `/popup`;
    const fullURL = path.join(baseURL,url,companyid);
    popUp(fullURL);
}

for(let i=0;i<careerEditBtns.length;i++){

    careerEditBtns.item(i).addEventListener("click",careerEditBtnHandler
    )
}


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

