import React from "react";
import { PlusIcon } from "@heroicons/react/solid";

class AddItemControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputIsActive: false };
    this.toggleFocus = this.toggleFocus.bind(this);
  }
  toggleFocus() {
    this.setState({ inputIsActive: !this.state.inputIsActive });
  }
  render() {
    return (
      <div className="flex relative">
        <input type="text" placeholder="Add item" className="input input-lg input-bordered grow" onFocus={this.toggleFocus} onBlur={this.toggleFocus}></input>
        <button className={`btn btn-square btn-primary absolute right-2 top-2 ${this.state.inputIsActive ? "" : "hidden"}`}>
          <PlusIcon className="w-5" />
        </button>
      </div>
    );
  }
}

export default AddItemControls;
