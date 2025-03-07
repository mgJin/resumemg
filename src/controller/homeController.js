import User from "../models/User";

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
        userId,
        password,
        name,
        age,
        address,
        email,
        phoneNumber} = req.body;
    const newUser=await User.create({
        userId,
        password,
        name,
        age,
        address,
        email,
        phoneNumber

    });
    console.log(newUser);

    return res.redirect("/");
}

export const getLogin = (req,res)=>{
    return res.render("login");
}
export const postLogin = async(req,res)=>{
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
    console.log("user : ",user);
    req.session.loggedIn = true,
    req.session.user = user;

    return res.redirect("/");
}