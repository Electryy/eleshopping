import React from "react";

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
      </div>
    );
  }
}
export default ShoppingList;

function CheckboxItem(props) {
  return (
    <label className="cursor-pointer label">
      <span className="label-text text-lg">{props.label}</span>
      <input name={props.id} type="checkbox" className="checkbox checkbox-md" checked={props.checked} onChange={() => props.handleChange(props.id)} />
    </label>
  );
}
