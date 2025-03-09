import Career from "../models/Career";
import Proejct from "../models/Project";
import User from "../models/User";

export const edit = async(req,res)=>{
    
    if(!req.session.loggedIn){
        return res.render("edit");
    }
    const {_id:userID} = req.session.user;
    const user = await User.findById(userID).populate("careers").populate("projects");
    
    return res.render("edit",{user});
}

export const profileEdit = async(req,res)=>{
    console.log(req.params);
    return res.send("dd");
}

export const postCareer = async(req,res)=>{
    const {companyName,period,role} = req.body;
    const owner  = req.params.id

    let user = await User.findById(owner);
    if(!user){
        return res.status(400).render("home");
    }
    const company = await Career.create({
        companyName,period,role,
        owner
    })
    user.careers.push(company._id);
    user= await user.save();

    return res.status(201).end();
}
export const putCareer = async(req,res)=>{
    const {
        body:{
            companyName,
            period,
            role,companyid
        },
        
    } = req;
    
    await Career.findByIdAndUpdate(companyid,{
        companyName,
        period,
        role
    })

    return res.status(201).end();
}

export const deleteCareer = async(req,res)=>{
    const {companyid} = req.body;

    const targetCompany = await Career.findById(companyid).populate("owner");
    
    if(req.session.user._id!=targetCompany.owner._id){
        return res.status(400).end();
    }

    const result = await Career.findByIdAndDelete(companyid);
    console.log("result:",result);

    return res.status(201).end();
}
