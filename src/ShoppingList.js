import React from "react";
import CheckboxItem from "./CheckboxItem";
import ClearCheckedBtn from "./ClearCheckedBtn";
import AddItemControls from "./AddItemControls";

function ShoppingList(props) {
  function handleDragEnd(event) {
    props.handleDragEnd(event);
  }
  return (
    <div className="form-control">
      <AddItemControls addItem={props.addItem} />
      <ClearCheckedBtn clearChecked={props.clearChecked} />
      {props.shoppingList.map((item) => (
        <CheckboxItem
          key={item.id}
          id={item.id}
          text={item.text}
          checked={item.checked}
          inputChanged={props.inputChanged}
          checkboxClicked={props.checkboxClicked}
          deleteItem={props.deleteItem}
        />
      ))}
    </div>
  );
}

export default ShoppingList;
