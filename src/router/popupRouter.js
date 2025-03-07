import express from "express";
import { careerPopup, careerPopupEdit, getCareerPopupEdit, good, projectPopup, putCareerPopupEdit } from "../controller/popupController";
const popupRouter = express.Router();

popupRouter.route("/").get(good);
popupRouter.route("/career").get(careerPopup);
popupRouter.route("/editCareer/:companyid").get(getCareerPopupEdit).put(putCareerPopupEdit);
popupRouter.route("/project").get(projectPopup);
export default popupRouter;