import "./Recipe.css";
import { PencilAltIcon, CheckIcon } from "@heroicons/react/solid";
import RecipeModal from "./RecipeModal";
import React, { useState } from "react";

function Recipe(props) {
  const { item, parentCall } = { ...props };
  const copyTextRef = React.createRef();
  const copiedTextRef = React.createRef();

  function copyToShoppingList() {
    // Add little transition to animate copied text
    const copiedTextClasses = ["opacity-100", "scale-100", "transition", "duration-300"];
    copyTextRef.current.classList.add("opacity-0");
    copiedTextRef.current.classList.add(...copiedTextClasses);
    setTimeout(() => {
      copiedTextRef.current.classList.remove(...copiedTextClasses);
      copyTextRef.current.classList.remove("opacity-0");

      // Need to run this after animations because re-rendering when state changes
      parentCall.addItems(item.ingredients);
    }, 1000);
  }

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
          <button className="relative btn btn-outline btn-accent text-center" onClick={copyToShoppingList}>
            <span ref={copyTextRef}>Copy to Shoppinglist</span>
            <span ref={copiedTextRef} className="absolute scale-50 opacity-0">
              Copied
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
