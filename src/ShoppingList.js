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

    this.inputChanged = this.inputChanged.bind(this);
    this.addItem = this.addItem.bind(this);
    this.clearChecked = this.clearChecked.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.checkboxClicked = this.checkboxClicked.bind(this);
  }

  async componentDidMount() {
    const shoppingList = await dbPull();

    this.setState({ shoppingList: shoppingList });
  }

  inputChanged(target) {
    const id = target.name;
    let shoppingList = [...this.state.shoppingList];
    let item = shoppingList.find((item) => item.id === id);
    item.text = target.value;
    this.setState({ shoppingList: shoppingList });
  }
  checkboxClicked(id) {
    let shoppingList = [...this.state.shoppingList];
    let item = shoppingList.find((item) => item.id === id);
    item.checked = !item.checked;
    this.setState({ shoppingList: shoppingList });
    dbPush(item);
  }

  async addItem(value) {
    let shoppingList = [...this.state.shoppingList];
    const newItem = { id: uuid(), text: value, checked: false };
    shoppingList.unshift(newItem);
    this.setState({ shoppingList: shoppingList });
    dbPush(newItem);
  }

  deleteItem(id) {
    let shoppingList = [...this.state.shoppingList];
    shoppingList = shoppingList.filter((item) => item.id !== id);
    const item = this.state.shoppingList.find((item) => item.id === id);
    this.setState({ shoppingList: shoppingList });
    dbDelete(item);
  }

  updateItem(id) {
    const item = this.state.shoppingList.find((item) => item.id === id);
    dbPush(item);
  }

  clearChecked() {
    let shoppingList = [...this.state.shoppingList];
    let deletedItems = shoppingList.filter((item) => item.checked === true);
    let remainingItems = shoppingList.filter((item) => item.checked === false);
    this.setState({ shoppingList: remainingItems });
    dbDelete(deletedItems);
  }

  render() {
    return (
      <div className="form-control">
        <AddItemControls addItem={this.addItem} />
        <ClearCheckedBtn clearChecked={this.clearChecked} />
        {this.state.shoppingList.map((item) => (
          <CheckboxItem
            key={item.id}
            id={item.id}
            text={item.text}
            checked={item.checked}
            inputChanged={this.inputChanged}
            checkboxClicked={this.checkboxClicked}
            deleteItem={this.deleteItem}
            updateItem={this.updateItem}
          />
        ))}
      </div>
    );
  }
}

export default ShoppingList;
