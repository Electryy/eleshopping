import React, { useState } from "react";
import { PencilAltIcon } from "@heroicons/react/solid";
import RecipesStorage from "./data/recipesStorage";
import RecipeModal from "./RecipeModal";
import Recipe from "./Recipe";

import { v4 as uuid } from "uuid";

const recipesStorage = new RecipesStorage();
function Recipes(props) {
  const [modalItem, setModalItem] = useState(null);
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
    recipesStorage.delete(modalItem);
  }
  function addRecipe() {
    const newItem = { id: uuid(), name: "", url: "", ingredients: [], notes: "" };
    setModalItem(newItem);
  }

  return (
    <div>
      <div className="">
        {recipes.map((item, index) => (
          <Recipe key={index} item={item} parentCall={{ openModal, addItems }} />
        ))}
        <div className="card shadow-2xl bg-slate-600">
          <div className="card-body">
            <label htmlFor="recipeModal" className="btn btn-primary" onClick={addRecipe}>
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
