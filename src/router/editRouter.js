import express from "express";
import { edit, postCareer, profileEdit } from "../controller/editController";
const editRouter = express.Router();

editRouter.route("/").get(edit);
editRouter.route("/:id/profile").put(profileEdit)
editRouter.route("/:id/career").post(postCareer);
export default editRouter;