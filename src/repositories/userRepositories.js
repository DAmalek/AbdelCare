import db from "../config/database.js";

async function findByEmail(email) {
  return await db.query(
    `
    SELECT * FROM costumers WHERE email=$1
    `,
    [email]
  );
}

async function findMedicByEmail(email) {
  return await db.query(
    `
    SELECT * FROM medics WHERE email=$1
    `,
    [email]
  );
}

async function createCostumerAccount({ email, name, password, cpf }) {
  await db.query(
    `
    INSERT INTO costumers (email, name , password, cpf) VALUES ($1, $2, $3,$4)
    `,
    [email, name, password, cpf]
  );
}

async function createMedicAccount({ email, name, password, crm, speciality }) {
  await db.query(
    `
    INSERT INTO medics (email, name , password, crm, speciality ) VALUES ($1, $2, $3, $4, $5)
    `,
    [email, name, password, crm, speciality]
  );
}

async function insertCostumerSession({ costumer_id, token }) {
  console.log(costumer_id, token);
  await db.query(
    `INSERT INTO costumer_sessions (costumer_id, token) VALUES ($1,$2);`,
    [costumer_id, token]
  );
}

async function insertMedicSession({ medic_id, token }) {
  console.log(medic_id, token);
  await db.query(
    `INSERT INTO medic_sessions (medic_id, token) VALUES ($1,$2);`,
    [medic_id, token]
  );
}

export default {
  findByEmail,
  findMedicByEmail,
  createCostumerAccount,
  insertCostumerSession,
  createMedicAccount,
  insertMedicSession,
};
