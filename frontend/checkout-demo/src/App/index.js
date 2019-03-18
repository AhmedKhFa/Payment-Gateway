import React, { Component } from "react";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { TabMenu } from "primereact/tabmenu";
import "./App.css";

import NewCheckout from "../Components/new-checkout";

const headerMenuItems = [
  { label: "New Checkout" },
  { label: "List Checkouts" }
];

class App extends Component {
  state = {
    activeItem: headerMenuItems[0].label
  };
  render() {
    return (
      <div className="App">
        <TabMenu
          model={headerMenuItems}
          activeItem={this.state.activeItem}
          onTabChange={e => this.setState({ activeItem: e.value.label })}
        />
        {this.state.activeItem === "New Checkout" && <NewCheckout />}
        {this.state.activeItem === "List Checkouts" && "TODO"}
      </div>
    );
  }
}

export default App;
