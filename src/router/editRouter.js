import express from "express";
import { deleteCareer, deleteProject, edit, postCareer, postProject, putCareer, putProfile, putProject, } from "../controller/editController";
import { imageAndVideoUploadFiles, imageUploadFiles, videoUploadFiles } from "../middleware/commonMiddleware";
const editRouter = express.Router();

editRouter.route("/").get(edit);
editRouter.route("/:id/profile").put(imageUploadFiles.single("avatar"),putProfile);
editRouter.route("/:id/project").post(videoUploadFiles.single("videofile"),postProject).put(videoUploadFiles.single("videofile"),putProject).delete(deleteProject);
editRouter.route("/:id/career").post(postCareer).put(putCareer).delete(deleteCareer);
export default editRouter;