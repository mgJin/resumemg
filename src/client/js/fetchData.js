

const careerForm = document.getElementById("careerForm");
const putCareerBtn = document.getElementById("putCareerBtn");

const postCareerBtn = document.getElementById("postCareerBtn ");

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
    const {baseURI} = e.target;
    try{
        result = await fetch(baseURI,{
            method:"PUT",
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
    const formData = new FormData(careerForm);
    for (const [name,value] of formData){
        fetchData[name] = value;
    }
    return fetchData;
}