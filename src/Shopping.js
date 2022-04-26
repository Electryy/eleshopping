import React from "react";
import ShoppingList from "./ShoppingList";

function Shopping(props) {
  return (
    <div className="w-full">
      <ShoppingList {...props} />
    </div>
  );
}

export default Shopping;
