import db from "../config/database.js";

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

async function insertCostumerSession({ costumer_id, token }) {
  await db.query(
    `INSERT INTO costumer_sessions (costumer_id, token) VALUES ($1,$2);`,
    [costumer_id, token]
  );
}

export default { findByEmail, createCostumerAccount, insertCostumerSession };
