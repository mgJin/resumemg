import express from "express";
import { deleteCareer, deleteProject, edit, postCareer, postProject, putCareer, putProject, } from "../controller/editController";
const editRouter = express.Router();

editRouter.route("/").get(edit);
editRouter.route("/:id/project").post(postProject).put(putProject).delete(deleteProject);
editRouter.route("/:id/career").post(postCareer).put(putCareer).delete(deleteCareer);
export default editRouter;