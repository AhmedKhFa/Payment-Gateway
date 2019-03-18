export default class CheckoutsAPI {
  static createCheckout(checkout) {
    return fetch(process.env.REACT_APP_API_BASE_URL + "/checkouts", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.buildCreateCheckoutReqBody(checkout))
    }).then(response => response.json());
  }

  static buildCreateCheckoutReqBody(fields) {
    return {
      order: {
        amount: fields.amount,
        currency: fields.currency,
        fullname: fields.fullname
      },
      card: {
        name: fields.holderName,
        number: fields.cardNumber,
        ccv: fields.ccv,
        expiration: fields.expiration
      }
    };
  }
}
