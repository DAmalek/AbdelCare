import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.unsubscribe(express.json());
app.use(cors());

const port = process.env.PORT;
app.listen(5000, () => {
  console.log("server rodando...");
});
