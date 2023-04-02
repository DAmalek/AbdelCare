import userServices from "../services/userServices.js";

async function signUp(req, res) {
  const { name, email, password, cpf } = req.body;

  try {
    await userServices.signUp({ email, name, password, cpf });
    return res.sendStatus(201);
  } catch (error) {
    console.log("aqui", error);
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const token = await userServices.signIn({ email, password });
  } catch (error) {
    console.log(error);
  }
}

export default {
  signUp,
  signIn,
};
