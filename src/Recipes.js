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
  const [filterTags, setFilterTags] = useState([]);
  let [tagCloud, setTagCloud] = useState([]);
  const { parentCall } = { ...props };
  const addItems = parentCall.addItems;
  let recipes = JSON.parse(JSON.stringify(props.recipes));
  const tagCloudWrapperRef = React.createRef();

  useEffect(() => {
    console.log("modalItem", modalItem);
  }, [modalItem]);

  useEffect(() => {
    buildAllTags();
  }, [props.recipes]);

  function buildAllTags() {
    let tags = [];
    recipes.forEach((item) => {
      item.tags.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });
    setTagCloud(tags);
    console.log("tagggiii");
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
    const newItem = { id: uuid(), name: "", url: "", img: "", ingredients: [], notes: "" };
    setModalItem(newItem);
  }

  function filterRecipes(e) {
    setFilterString(e.target.value);
    return recipes;
  }

  function filteredRecipes() {
    if (!filterString && !filterTags.length) {
      return recipes;
    }
    const result = recipes.filter((i) => isWordSearchMatch(i.name, filterString) && isFilterTagsFound(i.tags));
    return result;
  }

  function isFilterTagsFound(tags) {
    for (const i of filterTags) {
      if (!tags.includes(i)) {
        return false;
      }
    }
    return true;
  }

  function isWordSearchMatch(target, search) {
    const recipeName = removeSpacesAndLowerCaseString(target);
    const find = removeSpacesAndLowerCaseString(search);
    return recipeName.includes(find);
  }

  function tagClick(e) {
    const clickTag = e.target.textContent;

    let filterTagsCpy = [...filterTags];
    if (filterTagsCpy.includes(clickTag)) {
      filterTagsCpy = filterTagsCpy.filter((i) => i !== clickTag);
    } else {
      filterTagsCpy.push(clickTag);
    }
    setFilterTags(filterTagsCpy);
    refreshTagCloud();
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

  function isTagged(tag) {
    return filterTags.includes(tag);
  }

  function hideClearBtn() {
    return filterTags.length === 0 && filterString.length === 0;
  }

  function clearFilters() {
    setFilterString("");
    setFilterTags([]);
  }

  return (
    <div>
      <div className="relative">
        <input type="text" placeholder="Filter" className="input input-lg input-bordered grow w-full mb-6" value={filterString} onChange={filterRecipes} />
      </div>

      <div ref={tagCloudWrapperRef} className="flex flex-wrap gap-2 mb-4">
        {tagCloud.map((tag, index) => (
          <button key={index} className={`btn btn-sm btn-secondary transition-none animate-none ${isTagged(tag) ? "" : "btn-outline"} `} onClick={tagClick}>
            {tag}
          </button>
        ))}
      </div>
      <div className="flex justify-end">
        <button className={`block link link-accent link-hover uppercase mb-4 text-sm ${hideClearBtn() ? "hidden" : ""}`} onClick={clearFilters}>
          clear filters
        </button>
      </div>

      <div className="">
        {filteredRecipes().map((item, index) => (
          <Recipe key={index} item={item} parentCall={{ openModal, addItems }} tagCloud={tagCloud} />
        ))}
        <div className="card shadow-2xl bg-zinc-800">
          <div className="card-body">
            <label htmlFor="recipeModal" className="btn btn-outline" onClick={addRecipe}>
              Add recipe
            </label>
          </div>
        </div>
      </div>
      <RecipeModal modalItem={modalItem} tagCloud={tagCloud} parentCall={{ deleteItem, saveItem, setModalItem, refreshTagCloud }} />
    </div>
  );
}

export default Recipes;
