import express from "express";
import { careerPopup, getCareerPopupEdit, good, projectPopup } from "../controller/popupController";
const popupRouter = express.Router();

popupRouter.route("/").get(good);
popupRouter.route("/postcareer").get(careerPopup);
popupRouter.route("/editcareer/:companyid").get(getCareerPopupEdit)
popupRouter.route("/project").get(projectPopup);
export default popupRouter;