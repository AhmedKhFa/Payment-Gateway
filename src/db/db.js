import Sequelize from "sequelize";

export const db = new Sequelize("payment_gateway_demo", "", "", {
  host: "localhost",
  dialect: "sqlite",
  storage: "./database.sqlite"
});

export const Datatypes = Sequelize;
