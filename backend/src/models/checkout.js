import { db, Datatypes } from "@db/db";

const Checkout = db.define(
  "checkout",
  {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: Datatypes.DECIMAL,
    currency: Datatypes.STRING,
    fullname: Datatypes.STRING,
    success: Datatypes.BOOLEAN,
    transactionStatus: Datatypes.STRING,
    transactionId: Datatypes.STRING,
    gatewayResponse: Datatypes.STRING
  },
  {
    freezeTableName: true
  }
);

export default Checkout;
