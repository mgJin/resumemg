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

