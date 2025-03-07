export const urlMiddleware = (req,res,next)=>{
    
    console.log("요청 URL: ",req.url);
    next();
}

export const localsMiddleware = (req,res,next)=>{
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "resumeMg";
    res.locals.loggedInUser = req.session.user||{};
    next();
}