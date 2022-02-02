import React from "react";
import ShoppingList from "./ShoppingList";

function Shopping(props) {
  return (
    <div className="w-full mt-20">
      <ShoppingList {...props} />
    </div>
  );
}

export default Shopping;
