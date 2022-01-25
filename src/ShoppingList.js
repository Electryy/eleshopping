import React from "react";
import CheckboxItem from "./CheckboxItem";
import ClearCheckedBtn from "./ClearCheckedBtn";
import AddItemControls from "./AddItemControls";
import { v4 as uuid } from "uuid";
import db from "./firestore";
import { collection, addDoc } from "firebase/firestore";
class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: [
        { id: "c7b2f6f4-9a76-4508-8dd3-1", text: "kikkelis kokkelis", checked: true, isCleared: false },
        { id: "8d9d6964-fad9-44e9-a968-2", text: "pissiäjakakkaa", checked: false, isCleared: false },
        { id: "8d9d6964-fad9-44e9-a968-3", text: "filtterii", checked: false, isCleared: true },
      ],
    };

    this.itemChanged = this.itemChanged.bind(this);
    this.addItem = this.addItem.bind(this);
    this.clearChecked = this.clearChecked.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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
    shoppingList.unshift({ newItem });
    try {
      const docRef = await addDoc(collection(db, "shopping_list"), {
        newItem,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    this.setState({ shoppingList: shoppingList });
  }

  deleteItem(id) {
    let shoppingList = [...this.state.shoppingList];
    shoppingList = shoppingList.filter((item) => item.id !== id);
    this.setState({ shoppingList: shoppingList });
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
            <CheckboxItem key={item.id} id={item.id} text={item.text} checked={item.checked} itemChanged={this.itemChanged} deleteItem={this.deleteItem} />
          ))}
      </div>
    );
  }
}

export default ShoppingList;
