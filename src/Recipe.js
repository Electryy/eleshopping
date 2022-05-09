import { PencilAltIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";

function Recipe(props) {
  const { item, parentCall } = { ...props };
  const [copyingAnimation, setCopyingAnimation] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const copyTextRef = React.createRef();
  const copiedTextRef = React.createRef();

  useEffect(() => {
    if (copyingAnimation) {
      // Add little transition to animate copied text
      const copiedTextClasses = ["opacity-100", "transition-opacity", "duration-300"];
      copyTextRef.current.classList.add("opacity-0");
      copiedTextRef.current.classList.add(...copiedTextClasses);
      setTimeout(() => {
        copiedTextRef.current?.classList.remove(...copiedTextClasses);
        copyTextRef.current?.classList.remove("opacity-0");

        setCopyingAnimation(false);
      }, 1000);
    }
  });
  function copyToShoppingList() {
    setCopyingAnimation(true);
    parentCall.addItems(item.ingredients);
  }

  function getFullText() {
    return item.notes.split("\n").join("<br>");
  }

  function getSnippet() {
    return item.notes.slice(0, 120);
  }

  function toggleReadMore() {
    setReadMore(!readMore);
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
            <button className="uppercase mt-2 text-accent" onClick={toggleReadMore}>
              {!readMore && "Read more"}
              {readMore && "Show less"}
            </button>
          </div>
        )}

        <div className="card-actions">
          <button className="relative btn btn-primary text-center" onClick={copyToShoppingList}>
            <span ref={copyTextRef}>Copy to Shopping list</span>
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
