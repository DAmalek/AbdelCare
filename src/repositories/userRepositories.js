import { db } from "../config/database.js";

async function findByEmail(email) {
  return await db.query(
    `
    SELECT * FROM costumers WHERE email=$1
    `,
    [email]
  );
}

async function createCostumerAccount({ email, name, password, cpf }) {
  await db.query(
    `
    INSERT INTO costumers (email, name , password, cpf) VALUES ($1, $2, $3,$4)
    `,
    [name, email, password, cpf]
  );
}

export default { findByEmail, createCostumerAccount };
