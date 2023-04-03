import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { costumerSchema, medicSchema } from "../schemas/authSchemas.js";
import userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.post(
  "/sign-up/costumer",
  schemaValidation(costumerSchema),
  userController.signUp
);
userRouter.post("/sign-in/costumer", userController.signIn);

userRouter.post(
  "/sign-up/medic",
  schemaValidation(medicSchema),
  userController.signUpMedic
);
userRouter.post("/sign-in/medic", userController.signInMedic);

export default userRouter;
