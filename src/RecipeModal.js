import { PencilAltIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

class RecipeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item };
    this.itemChanged = this.itemChanged.bind(this);
    this.ingredientChanged = this.ingredientChanged.bind(this);
  }
  itemChanged(event) {
    let item = { ...this.state.item };
    item[event.target.id] = event.target.value;

    this.setState({ item: item });
  }
  ingredientChanged(event) {
    let item = { ...this.state.item };
    item.ingredients[event.target.id] = event.target.value;
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
            <div className="form-control w-full min-w-full mb-6">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" id="name" value={item.name} className="input input-bordered min-w-full" onChange={this.itemChanged}></input>
              <label className="label">
                <span className="label-text">Url</span>
              </label>
              <input type="text" id="url" value={item.url} className="input input-bordered min-w-full" onChange={this.itemChanged}></input>
            </div>
            <label className="label">
              <span className="label-text">Ingredients</span>
            </label>
            <div className="form-control w-full min-w-full mb-2">
              {item.ingredients.map((ingredient, index) => (
                <input key={index} value={ingredient} type="text" id={index} className="input input-bordered min-w-full input-sm mb-2" onChange={this.ingredientChanged}></input>
              ))}
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
