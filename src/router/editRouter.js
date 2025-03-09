import express from "express";
import { deleteCareer, edit, postCareer, profileEdit, putCareer, } from "../controller/editController";
const editRouter = express.Router();

editRouter.route("/").get(edit);
editRouter.route("/:id/profile").put(profileEdit)
editRouter.route("/:id/career").post(postCareer).put(putCareer).delete(deleteCareer);
export default editRouter;