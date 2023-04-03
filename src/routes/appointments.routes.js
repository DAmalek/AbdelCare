import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const appointmentRouter = Router();

appointmentRouter.post("/appointments", tokenValidation, schemaValidation());
