import dotenv from "dotenv";
import "module-alias/register";
import express from "express";
import router from "./routes";
import { db } from "@db/db";

dotenv.config();

const app = express();

db.sync().then(() => {
  app.use(router);
  app.listen(process.env.PORT);
});
