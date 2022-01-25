import React from "react";
import CheckboxItem from "./CheckboxItem";
import ClearCheckedBtn from "./ClearCheckedBtn";
import AddItemControls from "./AddItemControls";
import { v4 as uuid } from "uuid";
import { dbPush, dbPull, dbDelete } from "./firestore";
class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: [],
    };

    this.itemChanged = this.itemChanged.bind(this);
    this.addItem = this.addItem.bind(this);
    this.clearChecked = this.clearChecked.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  async componentDidMount() {
    const shoppingList = await dbPull();

    this.setState({ shoppingList: shoppingList });
  }

  itemChanged(target) {
    const id = target.name;
    let shoppingList = [...this.state.shoppingList];
    let item = shoppingList.find((item) => item.id === id);
    if (target.type === "checkbox") {
      item.checked = target.checked;
    } else {
      item.text = target.value;
    }
    this.setState({ shoppingList: shoppingList });
  }

  async addItem(value) {
    let shoppingList = [...this.state.shoppingList];
    const newItem = { id: uuid(), text: value, checked: false, isCleared: false };
    shoppingList.unshift(newItem);
    this.setState({ shoppingList: shoppingList });
    dbPush(newItem);
  }

  deleteItem(id) {
    let shoppingList = [...this.state.shoppingList];
    shoppingList = shoppingList.filter((item) => item.id !== id);
    this.setState({ shoppingList: shoppingList });
    dbDelete(id);
  }

  updateItem(id) {
    const item = this.state.shoppingList.find((item) => item.id === id);
    dbPush(item);
  }

  clearChecked() {
    let shoppingList = [...this.state.shoppingList];
    shoppingList.forEach((item) => {
      if (item.checked === true) {
        item.isCleared = true;
      }
    });
    this.setState({ shoppingList: shoppingList });
  }

  render() {
    return (
      <div className="form-control">
        <AddItemControls addItem={this.addItem} />
        <ClearCheckedBtn clearChecked={this.clearChecked} />
        {this.state.shoppingList
          .filter((item) => item.isCleared === false)
          .map((item) => (
            <CheckboxItem
              key={item.id}
              id={item.id}
              text={item.text}
              checked={item.checked}
              itemChanged={this.itemChanged}
              deleteItem={this.deleteItem}
              updateItem={this.updateItem}
            />
          ))}
      </div>
    );
  }
}

export default ShoppingList;
