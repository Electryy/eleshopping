import React from "react";
import { PencilAltIcon } from "@heroicons/react/solid";
import RecipesStorage from "./data/recipesStorage";
import RecipeModal from "./RecipeModal";
import Recipe from "./Recipe";

import { v4 as uuid } from "uuid";
class Recipes extends React.Component {
  constructor(props) {
    super(props);

    this.recipesStorage = new RecipesStorage();
    this.state = {
      recipes: this.fetchInitialFromSessionStorage(),
      modalItem: null,
    };
    this.refresh = async () => {
      const recipes = await this.recipesStorage.getAll();
      this.setState({ recipes: recipes });
    };

    this.recipeCalls = {
      openModal: this.openModal.bind(this),
      ...this.props.parentCall,
    };
    this.modalCalls = {
      itemChanged: this.itemChanged.bind(this),
      ingredientChanged: this.ingredientChanged.bind(this),
      addIngredient: this.addIngredient.bind(this),
      removeIngredient: this.removeIngredient.bind(this),
      saveItem: this.saveItem.bind(this),
      cancelEdits: this.cancelEdits.bind(this),
      deleteItem: this.deleteItem.bind(this),
    };
    this.addRecipe = this.addRecipe.bind(this);
  }
  async componentDidMount() {
    this.refresh();
  }

  fetchInitialFromSessionStorage() {
    const recipes = JSON.parse(sessionStorage.getItem("recipesLocal"));
    if (!Array.isArray(recipes)) {
      return [];
    }
    return recipes;
  }
  componentWillUnmount() {
    sessionStorage.setItem("recipesLocal", JSON.stringify(this.state.recipes));
  }
  openModal(id) {
    let item = this.state.recipes.find((item) => item.id === id);
    let modalItem = JSON.parse(JSON.stringify(item));
    this.setState({ modalItem: modalItem });
  }
  itemChanged(property, value) {
    let modalItem = { ...this.state.modalItem };
    modalItem[property] = value;
    this.setState({ modalItem: modalItem });
  }
  ingredientChanged(index, value) {
    let modalItem = { ...this.state.modalItem };
    modalItem.ingredients[index] = value;
    this.setState({ modalItem: modalItem });
  }
  addIngredient() {
    let modalItem = { ...this.state.modalItem };
    modalItem.ingredients.push("");
    this.setState({ modalItem: modalItem });
  }
  removeIngredient(index) {
    let modalItem = { ...this.state.modalItem };
    modalItem.ingredients.splice(index, 1);
    this.setState({ modalItem: modalItem });
  }
  saveItem() {
    let recipes = [...this.state.recipes];
    let modalItem = { ...this.state.modalItem };

    // In case of empty save
    if (!modalItem.name) {
      return;
    }

    let index = recipes.findIndex((item) => {
      return item.id === modalItem.id;
    });

    // If not found in array then it's a new item and add it to last place
    if (index === -1) {
      index = recipes.length;
      this.recipesStorage.add(modalItem);
    } else {
      this.recipesStorage.update(modalItem);
    }
    recipes.splice(index, 1, modalItem);
    this.setState({ recipes: recipes });
  }
  cancelEdits() {
    this.setState({ modalItem: null });
  }
  deleteItem() {
    let recipes = [...this.state.recipes];
    let modalItem = { ...this.state.modalItem };
    const index = recipes.findIndex((item) => {
      return item.id === modalItem.id;
    });
    recipes.splice(index, 1);
    this.setState({ recipes: recipes });
    this.recipesStorage.delete(modalItem);
  }
  addRecipe() {
    const newItem = { id: uuid(), name: "", url: "", ingredients: [], notes: "" };
    this.setState({ modalItem: newItem });
  }
  render() {
    let recipes = [...this.state.recipes];
    return (
      <div>
        <div className="">
          {recipes.map((item, index) => (
            <Recipe key={index} item={item} parentCall={this.recipeCalls} />
          ))}
          <div className="card shadow-2xl bg-slate-600">
            <div className="card-body">
              <label htmlFor="recipeModal" className="btn btn-primary" onClick={this.addRecipe}>
                Add recipe
              </label>
            </div>
          </div>
        </div>
        <RecipeModal item={this.state.modalItem} parentCall={this.modalCalls} />
      </div>
    );
  }
}

export default Recipes;
