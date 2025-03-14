

const path = require("path");


const careerForm = document.getElementById("careerForm");
const postCareerBtn = document.getElementById("postCareerBtn");
const putCareerBtn = document.getElementById("putCareerBtn");
const careerUl = document.getElementById("career__ul");

const projectForm= document.getElementById("projectForm");
const postProjectBtn = document.getElementById("postProjectBtn");
const putProjectBtn = document.getElementById("putProjectBtn")
const projectUl = document.getElementById("project__ul");


const putProfileBtn = document.getElementById("putProfileBtn");


const baseURL = `/edit`;
const headers = {
    "Content-Type":"application/json"
};

const methodBtnhandle = async(e)=>{
    if(e.target&&e.target.classList.contains("careerDeleteBtn")){

        const {companyid,userid} = e.target.parentElement.dataset
        const {url,method} = e.target.dataset;
        
        
        const fullURL = path.join(baseURL,userid,url);
        const fetchData = {
            "companyid":companyid
        }
        const result = await fetch(fullURL,{
            method,
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(fetchData)
        })

        if(result.status===201){
            window.location.reload();
        }

    }
}


if(careerUl){
    careerUl.addEventListener("click",methodBtnhandle);
}



//

if(postCareerBtn){
    postCareerBtn.addEventListener("click",async(e)=>{
        e.preventDefault();
        const userID = careerForm.dataset.userid;
        
        let fetchData = {};
        let result;
        const formData =new FormData(careerForm);
        
        for (const [name,value] of formData){
            fetchData[name] = value;
        }
    
        try{
            result = await fetch(`/edit/${userID}/career`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(fetchData)
            
            
            });
            popUpClose(result.status);
            
        }catch(error){
            console.log("error occur : ",error);
        }
        
    })
}
    

const handlePutCareer = async(e)=>{
    e.preventDefault();
    
    const userID = careerForm.dataset.userid;
    let result;
    
    const fetchData = transFormData(careerForm);
    
    const targetURL = `${userID}`;

    const fullURL  = path.join(baseURL,targetURL,"career");

    const method = e.target.dataset.method;
    //companyid 를 fetchdata에 추가(더 나은 방안 생각해보기)
    const companyid = e.target.dataset.companyid;
    fetchData["companyid"] = companyid;
    
    
  
    try{
        result = await fetch(fullURL,{
            method,
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(fetchData)
        })
        console.log(result);
        popUpClose(result.status);
        
    }catch(e){
        console.log("error occur : ",e);
    }
}

if(putCareerBtn){
    
    putCareerBtn.addEventListener("click",handlePutCareer)
}

const handlePostProject = async(e)=>{
    
    const fetchData =new FormData(projectForm);
    

    const userid  = projectForm.dataset.userid;
    const target = `project`
    const {method} = e.target.dataset
    
    const fullURL = path.join(baseURL,userid,target);
    console.log(fetchData);
    result = await fetch(fullURL,{
        method,
       
        body:fetchData
    })
    popUpClose(result.status);
}

if(postProjectBtn){
    postProjectBtn.addEventListener("click",handlePostProject)
}

const handlePutProject = async(e)=> {
    e.preventDefault();
    const {projectid} = e.target.dataset

    const fetchData = new FormData(projectForm);
    const userid  = projectForm.dataset.userid;
    const target = `project`
    const {method} = e.target.dataset
    const fullURL = path.join(baseURL,userid,target);

    
    fetchData.append("projectid",projectid);
    result = await fetch(fullURL,{
        method,
        
        body:fetchData
    })
    popUpClose(result.status);
    
}
if(putProjectBtn){
    putProjectBtn.addEventListener("click",handlePutProject);
}

const handleDeleteProject = async(e)=>{
    if(e.target&&e.target.classList.contains("projectDeleteBtn")){
        const {projectid,userid} = e.target.parentElement.dataset
        const {url,method} = e.target.dataset;
        
        
        const fullURL = path.join(baseURL,userid,url);
        const fetchData = {
            "projectid":projectid
        }
        const result = await fetch(fullURL,{
            method,
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(fetchData)
        })

        if(result.status===201){
            window.location.reload();
        }

    }
}

if(projectUl){
    projectUl.addEventListener("click",handleDeleteProject)
}

const handlePutProfile = async(e)=>{
    e.preventDefault();
    
    const profileForm = document.getElementById("profileForm");
    const {userid} = profileForm.dataset;
    const fetchData = new FormData(profileForm);
    const target = 'profile';
    // console.log("hisd");
    const {method} = e.target.dataset
    if(!fetchData){
        return;
    }

    const fullURL = path.join(baseURL,userid,target);
    
    const result = await fetch(fullURL,{
        method,
        
        body:fetchData
    });

    popUpClose(result.status);

}

if(putProfileBtn){
    putProfileBtn.addEventListener("click",handlePutProfile);
}




/**
 * fetch 의 코드가 201 이면
 * 팝업을 닫으면서 본 창을 reload 하는 함수
 * @param {HttpStatus} status 
 */
const popUpClose = (status)=>{
    if(status ===201){
        window.opener.location.reload();
        window.close();
    }
}
/**
 * 
 * @param {} form 폼 element
 * @returns form 에 있던 정보들을 object에 넣어서 반환
 */
const transFormData = (form)=>{
    let fetchData = {};
    const formData = new FormData(form);
    for (const [name,value] of formData){
        fetchData[name] = value;
    }
    return fetchData;
}