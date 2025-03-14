import express from "express";
import {getLogin, Home, postLogin,getSignup,postSignup} from "../controller/homeController"
import { imageUploadFiles } from "../middleware/commonMiddleware";

const rootRouter = express.Router();

rootRouter.route("/").get(Home);
rootRouter.route("/signup").get(getSignup).post(imageUploadFiles.single("avatar"),postSignup);
rootRouter.route("/login").get(getLogin).post(postLogin);
export default rootRouter;