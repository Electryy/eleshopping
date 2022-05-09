import { PlusIcon, TrashIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";

function RecipeModal(props) {
  const { parentCall } = { ...props };
  let [newTag, setNewTag] = useState("");
  let modalItem = JSON.parse(JSON.stringify(props.modalItem));
  let tagCloud = [...props.tagCloud];

  useEffect(() => {
    console.log("FOOOKKKKK", modalItem);
  }, []);

  function itemChanged(e) {
    modalItem[e.target.id] = e.target.value;
    parentCall.setModalItem(modalItem);
  }

  function ingredientChanged(e, index) {
    modalItem.ingredients[index] = e.target.value;
    parentCall.setModalItem(modalItem);
  }

  function removeIngredient(index) {
    modalItem.ingredients.splice(index, 1);
    parentCall.setModalItem(modalItem);
  }

  function addIngredient() {
    modalItem.ingredients.push("");
    parentCall.setModalItem(modalItem);

    // Auto focus the last input element in the list
    window.requestAnimationFrame(() => {
      let ingredientInputs = document.querySelectorAll(`[data-ingredientinput]`);
      ingredientInputs[ingredientInputs.length - 1].focus();
    });
  }

  function isTagged(tag) {
    return modalItem.tags.includes(tag);
  }

  function tagClick(e) {
    const tag = e.target.textContent;
    if (isTagged(tag)) {
      modalItem.tags = modalItem.tags.filter((i) => i !== tag);
    } else {
      modalItem.tags.push(tag);
    }
    parentCall.setModalItem(modalItem);
    parentCall.dirtyMobileHoverBackgroundColorIssueFix();
  }

  function handleNewTag(e) {
    setNewTag(e.target.value.toLowerCase());
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      addNewTag();
    }
  }

  function addNewTag() {
    const tag = newTag.trim();
    modalItem.tags.push(tag);
    parentCall.setModalItem(modalItem);
    setNewTag("");
  }

  function unTagged() {
    return tagCloud.filter((tag) => !modalItem.tags.includes(tag));
  }

  if (!modalItem) {
    return null;
  }
  return (
    <div>
      <input type="checkbox" id="recipeModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label htmlFor="recipeModal" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => parentCall.setModalItem(null)}>
            ✕
          </label>
          <div className="form-control w-full min-w-full mb-6">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" id="name" value={modalItem.name} className="input input-bordered min-w-full" onChange={itemChanged}></input>
            <label className="label">
              <span className="label-text">Url</span>
            </label>
            <input type="text" id="url" value={modalItem.url} className="input input-bordered min-w-full" onChange={itemChanged}></input>
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input type="text" id="img" value={modalItem.img} className="input input-bordered min-w-full" onChange={itemChanged}></input>
          </div>
          <label className="label">
            <span className="label-text">Ingredients</span>
          </label>
          <div className="form-control w-full min-w-full mb-2">
            {modalItem.ingredients.map((ingredient, index) => (
              <div key={index} className="flex flex-row">
                <input
                  value={ingredient}
                  data-ingredientinput
                  type="text"
                  className="input input-bordered input-sm mb-2 grow mr-2"
                  onChange={(e) => ingredientChanged(e, index)}
                ></input>
                <button className="btn btn-sm" onClick={() => removeIngredient(index)}>
                  <TrashIcon className="w-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="grid place-content-center">
            <button className="btn btn-circle btn-outline" onClick={addIngredient}>
              <PlusIcon className="w-6 top-3 left-0" />
            </button>
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Notes</span>
            </label>
            <textarea rows="8" id="notes" value={modalItem.notes} onChange={itemChanged} className="textarea textarea-bordered  min-w-full" />
          </div>

          <h5 className="mb-2">Tags</h5>
          <div className="flex flex-wrap gap-2">
            {modalItem.tags.map((tag, index) => (
              <button key={index} className={`btn btn-xs btn-secondary transition-none animate-none `} onClick={tagClick}>
                {tag}
              </button>
            ))}
            {unTagged().map((tag, index) => (
              <button key={index} className={`btn btn-xs btn-secondary transition-none animate-none btn-outline`} onClick={tagClick}>
                {tag}
              </button>
            ))}
            <div className="relative">
              <input
                type="text"
                placeholder="New tag"
                value={newTag}
                className="input input-bordered input-xs w-32 input-primary pr-7"
                onChange={handleNewTag}
                onKeyDown={handleEnter}
              />
              <button className="absolute right-0 top-0.5 btn btn-square btn-xs btn-primary -ml-0.5" onClick={addNewTag}>
                <PlusIcon />
              </button>
            </div>
          </div>
          <div className="divider"></div>
          <div className="modal-action justify-between ">
            <label htmlFor="recipeModal" className="btn" onClick={parentCall.deleteItem}>
              Delete
            </label>
            <label htmlFor="recipeModal" className="btn btn-primary" onClick={parentCall.saveItem}>
              Save
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;
