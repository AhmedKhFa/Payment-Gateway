import React, { Component } from "react";
import CheckoutAPI from "../../Api/checkouts-api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Messages } from "primereact/messages";

const currenciesSelectItems = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "THB", value: "THB" },
  { label: "HKD", value: "HKD" },
  { label: "SGD", value: "SGD" },
  { label: "AUD", value: "AUD q" }
];

class NewCheckout extends Component {
  state = {
    currency: "USD"
  };

  submitCheckout = () => {
    CheckoutAPI.createCheckout({ ...this.state }).then(resp => {
      if (resp.success) {
        this.messages.show({
          severity: "success",
          summary: "Checkout submitted"
        });
      } else {
        this.messages.show({
          severity: "error",
          summary:
            "Cannot create checkout due to the following fields/errors: ",
          detail: resp.errors && this.formatErrorsArray(resp.errors)
        });
      }
    });
  };

  formatErrorsArray(errors) {
    let errorMsg = "";
    errors.forEach(error => {
      errorMsg += (error.param || error) + ", ";
    });

    return errorMsg;
  }

  render() {
    return (
      <React.Fragment>
        {this.renderNotificationsBar()}
        {this.renderCheckoutForm()}
      </React.Fragment>
    );
  }

  renderNotificationsBar = () => <Messages ref={el => (this.messages = el)} />;

  renderCheckoutForm = () => (
    <div className="p-grid">
      <div className="p-col-3">
        <InputText
          placeholder="Amount"
          onChange={e => this.setState({ amount: e.target.value })}
        />
      </div>
      <div className="p-col-3">
        <Dropdown
          style={{
            width: "70%"
          }}
          value={this.state.currency}
          options={currenciesSelectItems}
          onChange={e => {
            this.setState({ currency: e.value });
          }}
          placeholder="Select a Currency"
        />
      </div>
      <div className="p-col-3">
        <InputText
          placeholder="Full name"
          onChange={e => this.setState({ fullname: e.target.value })}
        />
      </div>
      <div className="p-col-3">
        <InputText
          placeholder="Card Holder Name"
          onChange={e => this.setState({ holderName: e.target.value })}
        />
      </div>
      <div className="p-col-3">
        <InputText
          placeholder="Card Number"
          onChange={e => this.setState({ cardNumber: e.target.value })}
        />
      </div>
      <div className="p-col-3">
        <InputText
          placeholder="Expiration Date(MM/YYYY)"
          onChange={e => this.setState({ expiration: e.target.value })}
        />
      </div>
      <div className="p-col-3">
        <InputText
          placeholder="CCV"
          onChange={e => this.setState({ ccv: e.target.value })}
        />
      </div>
      <div className="p-col-3">
        <Button label="Checkout" onClick={this.submitCheckout} />
      </div>
    </div>
  );
}

export default NewCheckout;
