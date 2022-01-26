import React from "react";
import ShoppingList from "./ShoppingList";

class Shopping extends React.Component {
  render() {
    return (
      <div className="w-full">
        <ShoppingList dataLoadingStarted={() => this.props.dataLoadingStarted()} dataLoadingEnded={() => this.props.dataLoadingEnded()} />
      </div>
    );
  }
}

export default Shopping;
