import PaymentGateway from "../adapters/payment";
import Checkout from "@models/checkout";

export default class CheckoutService {
  constructor(checkout) {
    this.checkout = checkout;
  }

  async perform() {
    const result = await PaymentGateway.init().checkoutOrder(this.checkout);
    await this.persistCheckout(result);
    return {
      success: result.success,
      error: result.response
    };
  }

  async persistCheckout(result) {
    const {
      order: { amount, currency, fullname }
    } = this.checkout;
    const { transactionId, transactionStatus, success, response } = result;
    return await Checkout.create({
      amount,
      currency,
      fullname,
      success,
      transactionStatus,
      transactionId,
      gatewayResponse: response
    });
  }
}
