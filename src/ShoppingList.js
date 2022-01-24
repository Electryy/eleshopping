import React from "react";
import CheckboxItem from "./CheckboxItem";
import AddItemBtn from "./AddItemBtn";
class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: [
        { id: "1", text: "kikkelis kokkelis", checked: true },
        { id: "2", text: "pissiäjakakkaa", checked: false },
      ],
    };

    this.itemChanged = this.itemChanged.bind(this);
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
  render() {
    return (
      <div className="form-control">
        {this.state.shoppingList.map((item) => (
          <CheckboxItem key={item.id} id={item.id} text={item.text} checked={item.checked} itemChanged={this.itemChanged} />
        ))}
        <AddItemBtn />
      </div>
    );
  }
}

export default ShoppingList;
