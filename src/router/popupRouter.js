import express from "express";
import { careerPopup, getCareerPopupEdit, getProfilePopup, getProjectPopupEdit, good, projectPopup } from "../controller/popupController";
const popupRouter = express.Router();

popupRouter.route("/").get(good);
popupRouter.route("/profile").get(getProfilePopup);
popupRouter.route("/postcareer").get(careerPopup);
popupRouter.route("/editcareer/:companyid").get(getCareerPopupEdit)
popupRouter.route("/postproject").get(projectPopup);
popupRouter.route("/editProject/:projectid").get(getProjectPopupEdit)
export default popupRouter;