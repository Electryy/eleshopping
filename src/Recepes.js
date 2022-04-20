import React from "react";
import { PencilAltIcon } from "@heroicons/react/solid";
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
      ],
      dataIsLoading: true,
    };
  }
  render() {
    let recipes = [...this.state.recipes];
    console.log(recipes);
    return (
      <div className="flex flex-wrap gap-4">
        {recipes.map((item, index) => (
          <Recipe key={index} item={item} />
        ))}
      </div>
    );
  }
}

export default Recipes;
