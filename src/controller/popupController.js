import Career from "../models/Career";
import Project from "../models/Project";

export const good = (req,res)=>{
    return res.send("popup");
}

export const getProfilePopup = (req,res) =>{
    
    
    return res.render("popup/profilepop");
}

export const careerPopup = (req,res)=>{
    return res.render("popup/careerpop");
}
export const getCareerPopupEdit = async(req,res)=>{
    const {companyid} = req.params;
    const company = await Career.findById(companyid);
    if(!company){
        return res.status(404).end();
    }
    return res.render("popup/careerpop",{company});
}


export const getProjectPopup = async(req,res)=>{
    const {projectid} = req.params;

    const project = await Project.findById(projectid);
    console.log("project:",project);
    if(!project){
        return res.status(400).end();
    }
    return res.render("popup/projectpop",{project});
}

export const projectFormPopup = (req,res)=>{
    return res.render("popup/projectformpop");
}

export const getProjectPopupEdit = async(req,res)=>{
    const {projectid} = req.params;
    const project = await Project.findById(projectid);
    if(!project){
        return res.status(404).end();
    }
    
    return res.render("popup/projectformpop",{project});
}
