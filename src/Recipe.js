import { PencilAltIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";

function Recipe(props) {
  const { item, parentCall } = { ...props };
  const [copyingAnimation, setCopyingAnimation] = useState(false);
  const copyTextRef = React.createRef();
  const copiedTextRef = React.createRef();

  useEffect(() => {
    if (copyingAnimation) {
      // Add little transition to animate copied text
      const copiedTextClasses = ["opacity-100", "transition-opacity", "duration-300"];
      copyTextRef.current.classList.add("opacity-0");
      copiedTextRef.current.classList.add(...copiedTextClasses);
      setTimeout(() => {
        copiedTextRef.current.classList.remove(...copiedTextClasses);
        copyTextRef.current.classList.remove("opacity-0");

        setCopyingAnimation(false);
      }, 1000);
    }
  });
  function copyToShoppingList() {
    setCopyingAnimation(true);
    parentCall.addItems(item.ingredients);
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
            <span ref={copiedTextRef} className="absolute opacity-0 duration-0">
              Copied
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
