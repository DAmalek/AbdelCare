import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { costumerSchema } from "../schemas/authSchemas.js";
import userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.post(
  "/sign-up/costumer",
  schemaValidation(costumerSchema),
  userController.signUp
);
userRouter.post("sign-in", userController.signIn);

export default userRouter;
