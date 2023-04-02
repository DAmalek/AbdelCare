async function signUp(req, res) {
  const { email, name, password, cpf } = req.body;

  try {
    await userServices.signUp({ email, name, password, cpf });
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
}

export default {
  signUp,
};
