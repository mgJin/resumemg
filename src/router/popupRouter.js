import express from "express";
import { careerPopup, getCareerPopupEdit, getProjectPopupEdit, good, projectPopup } from "../controller/popupController";
const popupRouter = express.Router();

popupRouter.route("/").get(good);
popupRouter.route("/postcareer").get(careerPopup);
popupRouter.route("/editcareer/:companyid").get(getCareerPopupEdit)
popupRouter.route("/postproject").get(projectPopup);
popupRouter.route("/editProject/:projectid").get(getProjectPopupEdit)
export default popupRouter;