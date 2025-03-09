import Career from "../models/Career";

export const good = (req,res)=>{
    return res.send("popup");
}

export const careerPopup = (req,res)=>{
    return res.render("careerpop");
}
export const getCareerPopupEdit = async(req,res)=>{
    const {companyid} = req.params;
    const company = await Career.findById(companyid);
    
    return res.render("careerpop",{company});
}


export const projectPopup = (req,res)=>{
    return res.render("projectpop");
}