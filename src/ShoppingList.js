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

    this.checkBoxClick = this.checkBoxClick.bind(this);
    this.textChange = this.textChange.bind(this);
  }

  checkBoxClick(target) {
    const id = target.name;
    let shoppingList = [...this.state.shoppingList];
    const index = shoppingList.findIndex((item) => item.id === id);
    shoppingList[index].checked = !shoppingList[index].checked;
    this.setState({ shoppingList: shoppingList });
  }
  textChange(target) {
    const id = target.name;

    let shoppingList = [...this.state.shoppingList];
    const index = shoppingList.findIndex((item) => item.id === id);

    shoppingList[index].text = target.value;
    console.log(shoppingList);
    this.setState({ shoppingList: shoppingList });
  }
  render() {
    return (
      <div className="form-control">
        {this.state.shoppingList.map((item) => (
          <CheckboxItem key={item.id} id={item.id} text={item.text} checked={item.checked} checkBoxClick={this.checkBoxClick} textChange={this.textChange} />
        ))}
        <AddItemBtn />
      </div>
    );
  }
}

export default ShoppingList;
