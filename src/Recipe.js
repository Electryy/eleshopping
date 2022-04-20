import { PencilAltIcon } from "@heroicons/react/solid";
import RecipeModal from "./RecipeModal";
import React, { useState } from "react";

function Recipe(props) {
  const { item } = { ...props };
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="card shadow-2xl bg-slate-600  shrink">
      <div className="card-body">
        <label htmlFor="recipeModal" className="btn btn-circle absolute top-1 right-1 modal-button">
          <PencilAltIcon className="w-4" />
        </label>
        <h2 className="card-title">
          <a href={item.url}>{item.name}</a>
        </h2>
        <ul className="list-disc list-inside">
          {item.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="card-actions">
          <button className="btn btn-outline btn-accent">Copy to Shoppinglist</button>
        </div>
      </div>
      <RecipeModal item={item} />
    </div>
  );
}

export default Recipe;
