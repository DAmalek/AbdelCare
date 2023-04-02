import userRepositories from "../repositories/userRepositories.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

async function signIn({ email, password }) {
  const {
    rowCount,
    rows: [costumers],
  } = await userRepositories.findByEmail(email);

  if (!rowCount) return res.status(401).send("do not have account");

  const checkPassword = await bcrypt.compare(password, costumers.password);
  if (!checkPassword) return res.status(401).send("try again u dumb mofo");

  token = jwt.sign({ user_id: costumers.id }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 24 * 2,
  });

  await userRepositories.insertCostumerSession(costumers.id, token);

  return token;
}

export default {
  signUp,
};
