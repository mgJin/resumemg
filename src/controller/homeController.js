import User from "../models/User";
import axios from "axios";
export const Home = async(req,res)=>{
    //세션에 로그인이 안되어있다면
    
    if(!req.session.loggedIn){
        return res.render("home");
    }
    const {_id:userID} = req.session.user;
    const user = await User.findById(userID).populate("careers").populate("projects");
    
    return res.render("home",{user});
}

export const getSignup = (req,res)=>{
    return res.render("signup");
}

export const postSignup = async(req,res)=>{
    const {
        body:{
            userId,
            password,
            name,
            age,
            address,
            email,
            sex,
            phoneNumber
        },
        file
        }= req;
    
    
    const ageYear = age.split("-")[0];
    const now = new Date();
    const realAge = now.getFullYear() - Number(ageYear)-1
    

    const newUser=await User.create({
        userId,
        password,
        name,
        age:realAge,
        address,
        email,
        phoneNumber,
        sex,
        avatarUrl:file?file.location:null
    });
    console.log(newUser);

    return res.redirect("/");
}

export const getLogin = (req,res)=>{
    return res.render("login");
}
export const postLogin = async(req,res)=>{
    console.log("reqbody:",req.body);
    const {userId,password} = req.body;
    
    const user = await User.findOne({userId}).populate("careers").populate("projects");
    //user 존재하는지 검사
    if(!user){
        return res.status(400).render("login",{
            error:"check input"
        });
    }
    //password 일치하는지
    if(password !==user.password){
        return res.status(400).render("login",{
            error:"check input"
        });
    }
    
    req.session.loggedIn = true,
    req.session.user = user;
    
    

    return res.redirect("/");
}

// export const autoLogin = async()=>{
//     try{
//         const response = await axios.post('http://localhost:8000/login',{
//             userId:'admin',
//             password:'1111'
//         })
//         console.log("response:",response.data)
//     }catch(e){
//         console.log("error:",e);
//     }
// }