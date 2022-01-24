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

  handleChange(event) {
    const id = event.target.name;
    const checked = event.target.checked;
    let shoppingList = this.state.shoppingList;
    shoppingList.find((item) => item.id === id).checked = checked;
    this.setState({ shoppingList: shoppingList });
  }

  render() {
    return (
      <div className="form-control">
        {this.state.shoppingList.map((item) => (
          <label className="cursor-pointer label">
            <span className="label-text text-lg">{item.label}</span>
            <input name={item.id} type="checkbox" className="checkbox checkbox-md" checked={item.checked} onChange={this.handleChange} />
          </label>
        ))}
      </div>
    );
  }
}
export default ShoppingList;
