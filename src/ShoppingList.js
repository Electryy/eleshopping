import React from "react";
import CheckboxItem from "./CheckboxItem";
import AddItemBtn from "./AddItemBtn";
import AddItemControls from "./AddItemControls";
import { v4 as uuid } from "uuid";
class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: [
        { id: "c7b2f6f4-9a76-4508-8dd3-c99d0f8acbcd", text: "kikkelis kokkelis", checked: true },
        { id: "8d9d6964-fad9-44e9-a968-9c1206f01f98", text: "pissiäjakakkaa", checked: false },
      ],
    };

    this.itemChanged = this.itemChanged.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  itemChanged(target) {
    const id = target.name;
    let shoppingList = [...this.state.shoppingList];
    console.log(shoppingList);
    let item = shoppingList.find((item) => item.id === id);
    if (target.type === "checkbox") {
      item.checked = target.checked;
    } else {
      item.text = target.value;
    }
    this.setState({ shoppingList: shoppingList });
  }

  addItem(value) {
    let shoppingList = [...this.state.shoppingList];
    shoppingList.push({ id: uuid(), text: value, checked: false });
    this.setState({ shoppingList: shoppingList });
  }

  render() {
    return (
      <div className="form-control">
        <AddItemControls addItem={this.addItem} />
        {this.state.shoppingList.map((item) => (
          <CheckboxItem key={item.id} id={item.id} text={item.text} checked={item.checked} itemChanged={this.itemChanged} />
        ))}
      </div>
    );
  }
}

export default ShoppingList;
