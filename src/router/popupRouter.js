import express from "express";
import { careerPopup, getCareerPopupEdit, getProfilePopup, getProjectPopupEdit, good, projectPopup,projectFormPopup, getProjectPopup } from "../controller/popupController";
const popupRouter = express.Router();

popupRouter.route("/").get(good);
popupRouter.route("/profile").get(getProfilePopup);
popupRouter.route("/postcareer").get(careerPopup);
popupRouter.route("/editcareer/:companyid").get(getCareerPopupEdit)
popupRouter.route("/project/:projectid").get(getProjectPopup)
popupRouter.route("/postproject").get(projectFormPopup);
popupRouter.route("/editProject/:projectid").get(getProjectPopupEdit)
export default popupRouter;