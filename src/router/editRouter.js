import express from "express";
import { deleteCareer, deleteProject, edit, postCareer, postProject, putCareer, putProfile, putProject, } from "../controller/editController";
import { imageAndVideoUploadFiles, imageUploadFiles, videoUploadFiles } from "../middleware/commonMiddleware";
const editRouter = express.Router();

editRouter.route("/").get(edit);
editRouter.route("/:id/profile").put(putProfile);
editRouter.route("/:id/project").post(imageAndVideoUploadFiles.fields([{name:"videofile",maxCount:1}]),postProject).put(imageAndVideoUploadFiles.fields([{name:"videofile",maxCount:1}]),putProject).delete(deleteProject);
editRouter.route("/:id/career").post(postCareer).put(putCareer).delete(deleteCareer);
export default editRouter;