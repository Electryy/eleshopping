import React from "react";
import CheckboxItem from "./CheckboxItem";
import AddItemBtn from "./AddItemBtn";
class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: [
        { id: "1", label: "kikkelis kokkelis", checked: true },
        { id: "2", label: "pissiäjakakkaa", checked: false },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(id) {
    let shoppingList = [...this.state.shoppingList];
    const index = shoppingList.findIndex((item) => item.id === id);
    shoppingList[index].checked = !shoppingList[index].checked;
    this.setState({ shoppingList: shoppingList });
  }

  render() {
    return (
      <div className="form-control">
        {this.state.shoppingList.map((item) => (
          <CheckboxItem key={item.id} id={item.id} label={item.label} checked={item.checked} handleChange={() => this.handleChange(item.id)} />
        ))}
        <AddItemBtn />
      </div>
    );
  }
}

export default ShoppingList;
