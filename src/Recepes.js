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
          ingredients: ["Chorizoo 200g", "fjdkslajfdsa", "jfkdlsa jfkdslajfkl"],
        },
      ],
      modalItem: {
        id: "adfjkdfjsak",
        name: "Chorizo pasta",
        url: "https://google.com",
        notes: "tekstiä tekstiä",
        ingredients: ["Chorizoo 200g", "fjdkslajfdsa", "jfkdlsa jfkdslajfkl"],
      },
      dataIsLoading: true,
    };
    this.parentCall = {
      openModal: this.openModal.bind(this),
    };
  }
  openModal(id) {
    let item = this.state.recipes.find((item) => item.id === id);
    this.setState({ modalItem: item });
    console.log(this.state.modalItem, "modalii");
  }
  render() {
    let recipes = [...this.state.recipes];
    console.log(recipes);
    return (
      <div>
        <div className="flex flex-wrap gap-4">
          {recipes.map((item, index) => (
            <Recipe key={index} item={item} parentCall={this.parentCall} />
          ))}
        </div>
        <RecipeModal item={this.state.modalItem} />
      </div>
    );
  }
}

export default Recipes;
