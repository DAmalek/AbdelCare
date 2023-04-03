import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { handleApplicationErrors } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(handleApplicationErrors);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server rodando...");
});
