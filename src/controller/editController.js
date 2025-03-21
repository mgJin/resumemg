
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
        },
        file
    } = req
    let user;
    try{
        user =  await User.findById(id);
        
    }catch(error){
        console.log("error occur :",error);
        return res.status(500).end();
    }
    if(!user){
        return res.status(400).end();
    }

    try{
        user = await User.findByIdAndUpdate(id,{
            name,age,address,email,phoneNumber,sex,
            avatarUrl:file?file.path:user.avatarUrl
        })
    }catch(error){
        console.log("error occur :",error);
        return res.status(500).end();
    }
    
    return res.status(201).send("hod");
}



export const postCareer = async(req,res)=>{
    const {companyName,period,role,description} = req.body;
    const owner  = req.params.id
    
    let user = await User.findById(owner);
    if(!user){
        return res.status(400).render("home");
    }
    const company = await Career.create({
        companyName,period,role,description,
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
            role,companyid,description
        },
        
    } = req;
    
    await Career.findByIdAndUpdate(companyid,{
        companyName,
        period,
        description,
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
            title,startDate,endDate,headCount,description,summary
        },
        params :{
            id
        },
        files:{
            videofile,
            
        }
    }=req;
    
    let formattedStarDate = formatDate(startDate);
    let formattedEndDate = formatDate(endDate);
    
    const videofilepath = videofile[0].path;
    
    let user = await User.findById(id);
    if(!user){
        return res.status(400).render("home");
    }

    try{  
        const newProject = await Proejct.create({
            title,
            startDate:formattedStarDate,
            endDate:formattedEndDate,
            headCount,description,
            owner:id,
            videofileUrl:videofilepath,
            summary
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
        body:{
            title,startDate,endDate,headCount,description,projectid,summary
        },
        files:{
            videofile
        }
    } = req;
    let project = null;
    try{
        project = await Project.findById(projectid);
        
    }catch(e){
        console.log("error:", e);
    }
    if(!project){
        return res.status(500).end();
    }
    
    
    const videofilepath = videofile?videofile[0].path:project.videofileUrl;

    
    const target = await Proejct.findById(projectid);
    if(!target){
        return res.status(400).end();
    }
    
    const newProject = await Project.findByIdAndUpdate(projectid,{
        title,startDate,endDate,headCount,description,summary,
        videofileUrl:videofilepath
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
/**
 * 
 * @param {*} date  String 으로 들어온 date
 */
const formatDate = (date)=>{
    let newDate = new Date(date);
    
    const strDate = `${newDate.getFullYear()}-${newDate.getMonth().toString().padStart(2,"0")}-${newDate.getDate().toString().padStart(2,"0")}`;

    return strDate;
    
}