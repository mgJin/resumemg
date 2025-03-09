const path = require("path");

const careerPopBtn = document.getElementById("careerPopBtn");
const projectPopBtn = document.getElementById("projectPopBtn");
let careerEditBtns = document.getElementsByClassName("careerEditBtn");

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

