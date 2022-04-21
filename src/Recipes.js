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
    console.log("devuggi", this.state);
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
