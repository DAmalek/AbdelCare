import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { costumerSchema } from "../schemas/authSchemas.js";

const userRouter = Router();

userRouter.post(
  "/sign-up/costumer",
  schemaValidation(costumerSchema),
  signUp.signUp
);
userRouter.post("sign-in", logAccount);

export default userRouter;
