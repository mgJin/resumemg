import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";

const s3Client = new S3Client({
    region:"ap-northeast-2",
    credentials:{
        accessKeyId:process.env.AWS_KEY,
        secretAccessKey:process.env.AWS_SECRET
    }
})
//연결을 전달
//acl: bucket에 업로드 하는 파일들에게 부여해줄 권한
const s3AvatarStorage = multerS3({
    s3:s3Client,
    bucket:"resumemg-fly-2025-update",
    acl:"public-read",
    key: function (req, file, cb) {
        cb(null, `avatars/${req.session.user._id}/${Date.now().toString()}`)
    }
})
const s3VideoStorage = multerS3({
    s3:s3Client,
    bucket:"resumemg-fly-2025-update",
    acl:"public-read",
    key: function (req, file, cb) {
        cb(null, `videos/${req.session.user._id}/${Date.now().toString()}`)
    }
})

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
    
    limits:{
        fileSize:3000000
    },
    storage:s3AvatarStorage
})
export const videoUploadFiles = multer({
    
    limits:{
        fileSize:30000000
    },
    storage:s3VideoStorage
})

// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
        
//         const fileType = file.mimetype.split('/')[0];
//         const uploadPath = fileType ==='image'?`uploads/images`:`uploads/videos`;
//         console.log("input file:",file);
//         cb(null,uploadPath);
//     },
    
// })

// export const imageAndVideoUploadFiles = multer({storage:s3Storage});