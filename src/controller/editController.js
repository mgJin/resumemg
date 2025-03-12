import Career from "../models/Career";
import Project from "../models/Project";
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

export const putProfile = async(req,res)=>{

    const {
        params:{
            id},
        body:{
            name,age,address,email,phoneNumber,sex
        }
    } = req

    try{
        const user = await User.findByIdAndUpdate(id,{
            name,age,address,email,phoneNumber,sex
        })
    }catch(e){
        console.log("error occur :",error);
        return res.status(500).end();
    }
    
    return res.status(201).send("hod");
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


export const postProject = async(req,res) =>{
    const{
        body:{
            title,startDate,endDate,headCount,description
        },
        params :{
            id
        },
        files:{
            videofile,
            imagefile:imagefiles
        }
    }=req;
    
    let imagefilepaths =[];

    if(imagefiles){
        imagefilepaths = imagefiles.map((imagefile)=>{
            return imagefile.path
        });
    }
    const videofilepath = videofile[0].path;
    
    let user = await User.findById(id);
    if(!user){
        return res.status(400).render("home");
    }

    try{  
        const newProject = await Proejct.create({
            title,startDate,endDate,headCount,description,
            owner:id,
            videofileUrl:videofilepath,
            imagefileUrl:imagefilepaths
        })
        user.projects.push(newProject._id);
        user= await user.save();

    }catch(error){
        console.log("error : ",error);
    }

    return res.status(201).end();
}

export const putProject = async(req,res)=>{
    
    const{
        title,startDate,endDate,headCount,description,projectid
    } = req.body;

    const target = await Proejct.findById(projectid);
    if(!target){
        return res.status(400).end();
    }

    const newProject = await Project.findByIdAndUpdate(projectid,{
        title,startDate,endDate,headCount,description
    });

    return res.status(201).end();
}

export const deleteProject = async(req,res)=>{
    const {projectid} = req.body;
    const project =await Project.findById(projectid);
    if(!project){
        return res.status(400).end();
    }

    const result = await Project.findByIdAndDelete(projectid);
    

    return res.status(201).end();
}