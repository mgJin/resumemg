import express from "express";
import session from "express-session";
import rootRouter from "../router/rootRouter";
import popupRouter from "../router/popupRouter";
import editRouter from "../router/editRouter";
import morgan from "morgan";
import { localsMiddleware } from "../middleware/commonMiddleware";
import { autoLogin } from "../controller/homeController";

const path = require("path");
const app = express();

app.set("views",process.cwd()+"/src/views");
app.set("view engine","pug");




//log 남겨주는 미들웨어
const logger = morgan("dev");
app.use(logger);

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))

app.use((req,res,next)=>{
    req.sessionStore.all((error,sessions)=>{
        
        next();
    })
})

// app.use((req,res,next)=>{
//     // if(!req.session.loggeIn){
//     //     autoLogin();
//     // }
//     console.log("미들웨어:",req.session);
//     next();
// })


app.use(localsMiddleware);

app.use("/uploads",express.static("uploads"));
app.use("/assets",express.static("assets"));
app.use("/",rootRouter);
app.use("/edit",editRouter);
app.use("/popup",popupRouter);

export default app;

