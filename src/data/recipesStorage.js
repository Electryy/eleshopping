import { dbGetDoc, dbAdd, dbDeleteBatch, dbUpdate } from "./firestore";

const RecipesStorage = function () {
  const document = "recipes";

  /**
   * Get all Recipes from storage
   * @returns Array of items
   */
  this.getAll = async function () {
    let recipes = await dbGetDoc(document);
    return recipes;
  };

  /**
   * Update recipe
   * @param {Object} item item to update
   */
  this.update = async function (item) {
    await dbUpdate(document, item.id, item);
  };
};

export default RecipesStorage;
