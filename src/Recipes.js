import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import RecipeModal from "./RecipeModal";
import Recipe from "./Recipe";
import RecipeFilters from "./RecipeFilters";
import * as recipesStorage from "./data/recipesStorage";

import { v4 as uuid } from "uuid";

function Recipes(props) {
  const [modalItem, setModalItem] = useState(null);
  const [filterString, setFilterString] = useState("");
  const [filterTags, setFilterTags] = useState([]);
  let [tagCloud, setTagCloud] = useState([]);
  const { parentCall } = { ...props };
  const addItems = parentCall.addItems;
  let recipes = JSON.parse(JSON.stringify(props.recipes));

  useEffect(() => {
    buildAllTags();
  }, [props.recipes]);

  /**
   * Get all tags from all recipes and remove dublicates
   */
  function buildAllTags() {
    let tags = [];

    // get all tags
    recipes.forEach((item) => {
      tags = [...tags, ...item.tags];
    });

    tags = [...new Set(tags)]; // remove dublicates
    setTagCloud(tags);
  }

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
    const newItem = { id: uuid(), name: "", url: "", img: "", ingredients: [], notes: "", tags: [] };
    setModalItem(newItem);
  }

  function filteredRecipes() {
    function isFilterTagsFound(tags) {
      for (const i of filterTags) {
        if (!tags.includes(i)) {
          return false;
        }
      }
      return true;
    }

    function isFilterWordFound(target, search) {
      return target.toLowerCase().includes(search.toLowerCase());
    }

    if (!filterString && !filterTags.length) {
      return recipes;
    }
    const result = recipes.filter((i) => isFilterWordFound(i.name, filterString) && isFilterTagsFound(i.tags));
    return result;
  }

  /**
   * A little hacky, but fixes persistent
   * button background hover effect after
   * clicking a button on mobile devices
   */
  function refreshTagCloud() {
    const tagCloudSave = [...tagCloud];
    setTagCloud([]);
    window.requestAnimationFrame(() => {
      setTagCloud(tagCloudSave);
    });
  }

  return (
    <div className="relative">
      <RecipeFilters parentCall={{ setFilterString, setFilterTags, refreshTagCloud }} {...{ filterString, filterTags, tagCloud }} />

      <div>
        {filteredRecipes().map((item, index) => (
          <Recipe key={index} item={item} parentCall={{ openModal, addItems }} tagCloud={tagCloud} />
        ))}
      </div>
      <RecipeModal modalItem={modalItem} tagCloud={tagCloud} parentCall={{ deleteItem, saveItem, setModalItem, refreshTagCloud }} />
      <label htmlFor="recipeModal" className="btn btn-circle btn-primary fixed bottom-2 right-2 drop-shadow-lg" onClick={addRecipe}>
        <PlusIcon className="w-6" />
      </label>
    </div>
  );
}

export default Recipes;
