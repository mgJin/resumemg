import multer from "multer";

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

export const imageUploadFiles = multer({
    dest:"uploads/images/",
    limits:{
        fileSize:3000000
    }
})
export const videoUploadFiles = multer({
    dest:"uploads/videos/",
    limits:{
        fileSize:30000000
    }
})

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        
        const fileType = file.mimetype.split('/')[0];
        const uploadPath = fileType ==='image'?`uploads/images`:`uploads/videos`;
        console.log("input file:",file);
        cb(null,uploadPath);
    }
})

export const imageAndVideoUploadFiles = multer({storage:storage});