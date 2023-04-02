import joi from "joi";

export const costumerSchema = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  cpf: joi.number().min(10).max(11).required(),
});
