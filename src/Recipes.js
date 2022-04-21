import React from "react";
import { PencilAltIcon } from "@heroicons/react/solid";
import RecipeModal from "./RecipeModal";
import Recipe from "./Recipe";

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [
        {
          id: "adfjkdfjsak",
          name: "Chorizo pasta",
          url: "https://google.com",
          notes: "tekstiä tekstiä",
          ingredients: ["Chorizoo 200g", "fjdkslajfdsa", "jfkdlsa jfkdslajfkl"],
        },
        {
          id: "adfjkdfjsaaaak",
          name: "KANA pasta",
          url: "https://google.com",
          notes: "tekstiä tekstiä",
          ingredients: ["kanaa 200g", "fjdkslajfdsa", "jfkdlsa jfkdslajfkl"],
        },
      ],
      modalItem: null,
      dataIsLoading: true,
    };
    this.recipeCalls = {
      openModal: this.openModal.bind(this),
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
    const index = recipes.findIndex((item) => {
      return item.id === modalItem.id;
    });
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
  }
  render() {
    let recipes = [...this.state.recipes];
    return (
      <div>
        <div className="flex flex-wrap gap-4">
          {recipes.map((item, index) => (
            <Recipe key={index} item={item} parentCall={this.recipeCalls} />
          ))}
        </div>
        <RecipeModal item={this.state.modalItem} parentCall={this.modalCalls} />
      </div>
    );
  }
}

export default Recipes;
