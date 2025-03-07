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
export const putCareerPopupEdit = async(req,res)=>{
    const {
        body:{
            companyName,
            period,
            role
        },
        params:{
            companyid
        }
    } = req;
    
    await Career.findByIdAndUpdate(companyid,{
        companyName,
        period,
        role
    })

    return res.status(201).end();
}

export const projectPopup = (req,res)=>{
    return res.render("projectpop");
}