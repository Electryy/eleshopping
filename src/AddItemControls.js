import React from "react";
import { PlusIcon } from "@heroicons/react/solid";

class AddItemControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputIsActive: false };
    this.toggleFocus = this.toggleFocus.bind(this);
    this.addItem = this.addItem.bind(this);
  }
  toggleFocus(e) {
    if (e.type === "focus") {
      this.setState({ inputIsActive: true });
    } else if (e.type === "blur") {
      this.setState({ inputIsActive: false });
    }
  }
  addItem() {
    if (this.inputElement.value) {
      this.props.addItem(this.inputElement.value);
      this.inputElement.value = "";
    }

    this.setState({ inputIsActive: true });
    this.inputElement.focus();
  }
  render() {
    return (
      <div className="flex relative">
        <input
          type="text"
          ref={(input) => (this.inputElement = input)}
          placeholder="Add item"
          className="input input-lg input-bordered grow"
          onFocus={this.toggleFocus}
          onBlur={this.toggleFocus}
        ></input>
        <button className={`btn btn-square btn-primary absolute right-2 top-2 ${this.state.inputIsActive ? "" : "opacity-0"}`} onClick={this.addItem}>
          <PlusIcon className="w-5" />
        </button>
      </div>
    );
  }
}

export default AddItemControls;
