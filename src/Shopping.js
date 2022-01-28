import React from "react";
import ShoppingList from "./ShoppingList";

class Shopping extends React.Component {
  render() {
    return (
      <div className="w-full">
        <ShoppingList {...this.props} />
      </div>
    );
  }
}

export default Shopping;
