import userRepositories from "../repositories/userRepositories.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import errors from "../errors/index.js";
import "dotenv/config";

async function signUp({ email, name, password, cpf }) {
  const { rowCount } = await userRepositories.findByEmail(email);

  if (rowCount) throw errors.duplicatedEmailError(email);

  const hashPassword = await bcrypt.hash(password, 10);

  await userRepositories.createCostumerAccount({
    email,
    name,
    password: hashPassword,
    cpf,
  });
}

async function signUpMedic({ email, name, password, crm, speciality }) {
  const { rowCount } = await userRepositories.findByEmail(email);

  if (rowCount) throw errors.duplicatedEmailError(email);

  const hashPassword = await bcrypt.hash(password, 10);

  await userRepositories.createMedicAccount({
    email,
    name,
    password: hashPassword,
    crm,
    speciality,
  });
}

async function signIn({ email, password }) {
  const {
    rowCount,
    rows: [costumers],
  } = await userRepositories.findByEmail(email);

  if (!rowCount) throw errors.invalidCredentialsError();

  const checkPassword = await bcrypt.compare(password, costumers.password);
  if (!checkPassword) throw errors.invalidCredentialsError();

  const token = jwt.sign(
    { costumer_id: costumers.id },
    process.env.SECRET_KEY,
    {
      expiresIn: 60 * 60 * 24 * 2,
    }
  );

  // console.log(token);
  // await userRepositories.insertCostumerSession(costumers.id, token);

  return token;
}

async function signInMedic({ email, password }) {
  const {
    rowCount,
    rows: [medics],
  } = await userRepositories.findMedicByEmail(email);

  if (!rowCount) throw errors.invalidCredentialsError();

  const checkPassword = await bcrypt.compare(password, medics.password);
  if (!checkPassword) throw errors.invalidCredentialsError();

  const token = jwt.sign({ medic_id: medics.id }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 24 * 2,
  });

  // console.log(token);
  // await userRepositories.insertCostumerSession(costumers.id, token);

  return token;
}

export default {
  signUp,
  signIn,
  signUpMedic,
  signInMedic,
};
