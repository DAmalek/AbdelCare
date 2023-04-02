import userRepositories from "../repositories/userRepositories.js";
import bcrypt from "bcrypt";

async function signUp({ email, name, password, cpf }) {
  const { rowCount } = await userRepositories.findByEmail(email);

  if (rowCount) return res.status(409).send("email in use");

  const hashPassword = await bcrypt.hash(password, 10);

  await userRepositories.createCostumerAccount({
    email,
    name,
    password: hashPassword,
    cpf,
  });
}
