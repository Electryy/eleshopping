import { PlusIcon, TrashIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

class RecipeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item };
    this.itemChanged = this.itemChanged.bind(this);
    this.ingredientChanged = this.ingredientChanged.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
  }
  itemChanged(event) {
    let item = { ...this.state.item };
    item[event.target.id] = event.target.value;

    this.setState({ item: item });
  }
  ingredientChanged(event) {
    let item = { ...this.state.item };
    const index = event.target.getAttribute("data-index");
    item.ingredients[index] = event.target.value;
    this.setState({ item: item });
  }
  addIngredient() {
    let item = { ...this.state.item };
    item.ingredients.push("");
    this.setState({ item: item });
  }
  removeIngredient(event) {
    let item = { ...this.state.item };
    const index = event.target.getAttribute("data-index");
    item.ingredients.splice(index, 1);
    this.setState({ item: item });
  }
  render() {
    console.log(this.state, "statee");
    let item = this.state.item;
    return (
      <div>
        <input type="checkbox" id="recipeModal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <label for="recipeModal" class="btn btn-sm btn-circle absolute right-2 top-2">
              ✕
            </label>
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
                <div key={index} className="flex flex-row">
                  <input value={ingredient} data-index={index} type="text" className="input input-bordered input-sm mb-2 grow mr-2" onChange={this.ingredientChanged}></input>
                  <button className="btn btn-sm" data-index={index} onClick={this.removeIngredient}>
                    <TrashIcon className="w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="grid place-content-center">
              <button className="btn btn-circle btn-outline" onClick={this.addIngredient}>
                <PlusIcon className="w-6 top-3 left-0" />
              </button>
            </div>
            <div class="divider"></div>
            <div className="modal-action justify-between ">
              <label htmlFor="recipeModal" className="btn">
                Delete
              </label>
              <label htmlFor="recipeModal" className="btn btn-primary">
                Save
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeModal;
