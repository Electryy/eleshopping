import React, { useState, useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/solid";
import { removeSpacesAndLowerCaseString } from "./modules/utils";
import RecipeModal from "./RecipeModal";
import Recipe from "./Recipe";
import * as recipesStorage from "./data/recipesStorage";

import { v4 as uuid } from "uuid";

function Recipes(props) {
  const [modalItem, setModalItem] = useState(null);
  const [filterString, setFilterString] = useState("");
  const { parentCall } = { ...props };
  const addItems = parentCall.addItems;
  let recipes = JSON.parse(JSON.stringify(props.recipes));

  function openModal(id) {
    let item = recipes.find((item) => item.id === id);
    let modalItemCopy = JSON.parse(JSON.stringify(item));
    setModalItem(modalItemCopy);
  }

  function saveItem() {
    let modalItemCopy = JSON.parse(JSON.stringify(modalItem));
    // In case of empty save
    if (!modalItemCopy.name) {
      return;
    }

    let index = recipes.findIndex((item) => {
      return item.id === modalItem.id;
    });

    modalItemCopy.notes = modalItemCopy.notes.trim();

    // If not found in array then it's a new item and add it to last place
    if (index === -1) {
      index = recipes.length;
      recipesStorage.add(modalItemCopy);
    } else {
      recipesStorage.update(modalItemCopy);
    }
    recipes.splice(index, 1, modalItemCopy);
    parentCall.setRecipes(recipes);
  }

  function deleteItem() {
    const index = recipes.findIndex((item) => {
      return item.id === modalItem.id;
    });
    recipes.splice(index, 1);
    parentCall.setRecipes(recipes);
    recipesStorage.deleteItem(modalItem);
  }
  function addRecipe() {
    const newItem = { id: uuid(), name: "", url: "", img: "", ingredients: [], notes: "" };
    setModalItem(newItem);
  }

  function filterRecipes(e) {
    setFilterString(e.target.value);
    return recipes;
  }

  function filteredRecipes() {
    if (!filterString) {
      return recipes;
    }
    const result = recipes.filter((i) => {
      const recipeName = removeSpacesAndLowerCaseString(i.name);
      const search = removeSpacesAndLowerCaseString(filterString);
      return recipeName.includes(search);
    });
    return result;
  }

  return (
    <div>
      <div className="relative">
        <input type="text" placeholder="Filter" className="input input-lg input-bordered grow w-full mb-6 pr-20" value={filterString} onChange={filterRecipes} />
        <button className={`btn btn-ghost absolute right-2 top-2 ${filterString ? "" : "opacity-0"}`} onClick={() => setFilterString("")}>
          CLEAR
        </button>
      </div>

      <div className="">
        {filteredRecipes().map((item, index) => (
          <Recipe key={index} item={item} parentCall={{ openModal, addItems }} />
        ))}
        <div className="card shadow-2xl bg-zinc-800">
          <div className="card-body">
            <label htmlFor="recipeModal" className="btn btn-outline" onClick={addRecipe}>
              Add recipe
            </label>
          </div>
        </div>
      </div>
      <RecipeModal modalItem={modalItem} parentCall={{ deleteItem, saveItem, setModalItem }} />
    </div>
  );
}

export default Recipes;
