import React from "react";
import { DotsVerticalIcon } from "@heroicons/react/solid";

class CheckboxItem extends React.Component {
  constructor(props) {
    super(props);
    this.itemChanged = this.itemChanged.bind(this);
  }

  itemChanged(e) {
    this.props.itemChanged(e.target);
  }
  render() {
    return (
      <label className="cursor-pointer label justify-start">
        <DragIcon />
        <input name={this.props.id} type="checkbox" className="checkbox checkbox-lg mr-5" checked={this.props.checked} onChange={this.itemChanged} />
        <input name={this.props.id} value={this.props.text} type="text" placeholder="" className="input grow input-ghost p-0 text-xl" onChange={this.itemChanged}></input>
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
