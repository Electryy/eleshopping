import React from "react";
import { DotsVerticalIcon, TrashIcon } from "@heroicons/react/solid";

class CheckboxItem extends React.Component {
  constructor(props) {
    super(props);
    this.itemChanged = this.itemChanged.bind(this);
    this.toggleFocus = this.toggleFocus.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = { isEditing: false };
  }

  itemChanged(e) {
    this.props.itemChanged(e.target);
  }

  toggleFocus(e) {
    if (e.type === "focus") {
      this.setState({ isEditing: true });
    } else if (e.type === "blur") {
      this.setState({ isEditing: false });
    }
  }

  deleteItem(e) {
    const id = e.target.name;
    this.props.deleteItem(id);
  }
  render() {
    return (
      <label className="cursor-pointer label justify-start relative">
        <DragIcon />
        <input name={this.props.id} type="checkbox" className="checkbox checkbox-lg mr-5" checked={this.props.checked} onChange={this.itemChanged} />
        <input
          name={this.props.id}
          value={this.props.text}
          type="text"
          placeholder=""
          className="input grow input-ghost p-0 text-xl"
          onChange={this.itemChanged}
          onFocus={this.toggleFocus}
          onBlur={this.toggleFocus}
        ></input>
        <button name={this.props.id} className={`btn btn text-white absolute top-2 right-0 ${this.state.isEditing ? "" : "opacity-0"}`} onClick={this.deleteItem}>
          <TrashIcon className="w-5 pointer-events-none" />
        </button>
      </label>
    );
  }
}

function DragIcon() {
  return (
    <div className="mr-5 flex">
      <DotsVerticalIcon className="h-9 w-9 -mr-6" />
      <DotsVerticalIcon className="h-9 w-9" />
    </div>
  );
}

export default CheckboxItem;
