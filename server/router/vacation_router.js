import { Router } from "express";
import vacationController from "../controller/vacation_controller.js";

const vacationRouter = Router();
vacationRouter.post(`/`, vacationController.createVacation);
vacationRouter.use(`/:id`, vacationController.checkIfVacationExists);
vacationRouter.get(`/`, vacationController.getAllVacations);
vacationRouter.get(`/:id`, vacationController.getVacationById);
vacationRouter.put(`/:id`, vacationController.updateVacation);
vacationRouter.delete(`/:id`, vacationController.deleteVacation);

export { vacationRouter };