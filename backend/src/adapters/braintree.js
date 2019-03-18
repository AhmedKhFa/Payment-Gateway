import braintree from "braintree";

export default class BraintreeAdapter {
  static async checkoutOrder(checkout) {
    const params = this.buildCheckoutParams(checkout);
    const resp = await this.client().transaction.sale(params);
    return this.parseCheckoutResp(resp);
  }

  static buildCheckoutParams(checkout) {
    return {
      amount: checkout.order.amount,
      creditCard: {
        cardholderName: checkout.card.name,
        cvv: checkout.card.cvv,
        expirationDate: checkout.card.expiration,
        number: checkout.card.number
      },
      merchantAccountId: checkout.order.currency,
      options: {
        submitForSettlement: true
      }
    };
  }

  static parseCheckoutResp(resp) {
    return {
      success: resp.success,
      response: resp.message,
      transactionId: resp.transaction && resp.transaction.id,
      transactionStatus: resp.transaction && resp.transaction.status
    };
  }

  static client() {
    return (this.gateway =
      this.gateway ||
      braintree.connect({
        environment: braintree.Environment.Sandbox,
        merchantId: process.env.BRAINTREE_MERCHANT_ID,
        publicKey: process.env.BRAINTREE_PUBLIC_KEY,
        privateKey: process.env.BRAINTREE_PRIVATE_KEY
      }));
  }
}
