import PaypalAdapter from "./paypal";
import BraintreeAdapter from "./braintree";

export default class PaymentGateway {
  static init() {
    let adapter;
    switch (process.env.PAYMENT_GATEWAY) {
      case "braintree":
      case undefined:
        adapter = BraintreeAdapter;
        break;
      case "paypal":
        adapter = PaypalAdapter;
        break;
      default:
        throw new Error("Unsupported Payment Gateway");
    }
    return adapter;
  }
}
