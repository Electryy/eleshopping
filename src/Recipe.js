import { PencilAltIcon } from "@heroicons/react/solid";
import RecipeModal from "./RecipeModal";
import React, { useState } from "react";

function Recipe(props) {
  const { item, parentCall } = { ...props };
  console.log(parentCall);
  return (
    <div className="card shadow-2xl bg-slate-600 mb-4">
      <div className="card-body">
        <label htmlFor="recipeModal" className="btn btn-circle absolute top-1 right-1 modal-button" onClick={() => parentCall.openModal(item.id)}>
          <PencilAltIcon className="w-4" />
        </label>
        <h2 className="card-title">
          <a href={item.url}>{item.name}</a>
        </h2>
        <ul className="list-disc list-inside mb-4">
          {item.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{item.notes}</p>
        <div className="card-actions">
          <button className="btn btn-outline btn-accent" onClick={() => parentCall.copyRecipe(item)}>
            Copy to Shoppinglist
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
