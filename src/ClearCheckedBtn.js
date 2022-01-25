import React from "react";
import { PlusIcon } from "@heroicons/react/solid";

class AddItemControls extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button className={`btn btn-link self-end text-white`} onClick={this.props.clearChecked}>
        Clear checked
      </button>
    );
  }
}

export default AddItemControls;
