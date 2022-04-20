import { PencilAltIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

class RecipeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    let item = { ...this.state.item };
    item[event.target.id] = event.target.value;

    this.setState({ item: item });
  }
  render() {
    console.log(this.state, "statee");
    let item = this.state.item;
    return (
      <div>
        <input type="checkbox" id="my-modal-2" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <div className="form-control w-full min-w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" id="name" value={item.name} className="input input-bordered min-w-full" onChange={this.handleChange}></input>
              <label className="label">
                <span className="label-text">Url</span>
              </label>
              <input type="text" id="url" value={item.url} className="input input-bordered min-w-full" onChange={this.handleChange}></input>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered min-w-full"></input>
            </div>

            <div className="modal-action">
              <label htmlFor="my-modal-2" className="btn btn-primary">
                Accept
              </label>
              <label htmlFor="my-modal-2" className="btn">
                Close
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeModal;
