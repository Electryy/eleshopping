import React from "react";

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log("jeah");
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text text-lg">Remember me</span>
          <input name="isGoing" type="checkbox" className="checkbox checkbox-md" checked={this.state.isGoing} onChange={this.handleChange} />
        </label>
      </div>
    );
  }
}

export default ShoppingList;
