import userServices from "../services/userServices.js";

async function signUp(req, res, next) {
  const { name, email, password, cpf } = req.body;

  try {
    await userServices.signUp({ email, name, password, cpf });
    return res.sendStatus(201);
  } catch (error) {
    console.log("aqui", error);
    next(error);
  }
}

async function signIn(req, res, next) {
  const { email, password } = req.body;

  try {
    const token = await userServices.signIn({ email, password });
    return res.send({ token });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export default {
  signUp,
  signIn,
};
