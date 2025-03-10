import Career from "../models/Career";
import Project from "../models/Project";

export const good = (req,res)=>{
    return res.send("popup");
}

export const careerPopup = (req,res)=>{
    return res.render("careerpop");
}
export const getCareerPopupEdit = async(req,res)=>{
    const {companyid} = req.params;
    const company = await Career.findById(companyid);
    if(!company){
        return res.status(404).end();
    }
    return res.render("careerpop",{company});
}


export const projectPopup = (req,res)=>{
    return res.render("projectpop");
}

export const getProjectPopupEdit = async(req,res)=>{
    const {projectid} = req.params;
    const project = await Project.findById(projectid);
    if(!project){
        return res.status(404).end();
    }
    
    return res.render("projectpop",{project});
}
