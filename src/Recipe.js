import { PencilAltIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

function Recipe(props) {
  const { item, parentCall } = { ...props };
  const [readMore, setReadMore] = useState(false);

  function copyToShoppingList(e) {
    parentCall.addItems(item.ingredients);
    doCopiedTextAnimation(e.target);
  }

  function doCopiedTextAnimation(target) {
    const copyTextElm = target.children[0]; // <-- "Copy to shopping list"
    const copiedTextElm = target.children[1]; // <-- "Copied"
    const copiedTextClasses = ["opacity-100", "transition-opacity", "duration-300"];

    copyTextElm.classList.add("opacity-0"); // Hide one
    copiedTextElm.classList.add(...copiedTextClasses); // animate in the other

    setTimeout(() => {
      copiedTextElm.classList.remove(...copiedTextClasses); // Reset styles
      copyTextElm.classList.remove("opacity-0"); // Reset styles
    }, 1000);
  }

  function getFullText() {
    return item.notes.split("\n").join("<br>");
  }

  function getSnippet() {
    return item.notes.slice(0, 120);
  }

  return (
    <div className="card shadow-2xl bg-zinc-800 mb-4">
      <div className="p-4 relative">
        <h2 className="card-title">
          <a href={item.url}>
            {item.name} <ExternalLinkIcon className="w-4 inline" />
          </a>
        </h2>
        <label htmlFor="recipeModal" className="btn btn-circle absolute top-1 right-1 modal-button btn-ghost" onClick={() => parentCall.openModal(item.id)}>
          <PencilAltIcon className="w-6" />
        </label>
      </div>

      {item.img && (
        <figure className="bg-slate-600">
          <img className="h-52 max-h-[40vw] w-full object-cover" src={item.img} alt={item.name} />
        </figure>
      )}

      <div className="card-body">
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag, index) => (
            <div key={index} className="badge badge-secondary">
              {tag}
            </div>
          ))}
        </div>
        <ul className="list-disc list-inside mb-4">
          {item.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        {item.notes && (
          <div className="mb-4">
            {!readMore && <p>{getSnippet()}...</p>}
            {readMore && <p dangerouslySetInnerHTML={{ __html: getFullText() }}></p>}

            <button className="block link link-accent link-hover uppercase mt-4" onClick={() => setReadMore(!readMore)}>
              {!readMore && "Read more"}
              {readMore && "Show less"}
            </button>
          </div>
        )}

        <div className="card-actions">
          <button className="relative btn btn-primary text-center" onClick={copyToShoppingList}>
            <span className="pointer-events-none">Copy to Shopping list</span>
            <span className="pointer-events-none absolute opacity-0 duration-0">Copied</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
