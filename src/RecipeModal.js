import { PlusIcon, TrashIcon } from "@heroicons/react/solid";

function RecipeModal(props) {
  const { item, parentCall } = { ...props };

  function itemChanged(e) {
    parentCall.itemChanged(e.target.id, e.target.value);
  }
  function ingredientChanged(e) {
    const index = e.target.getAttribute("data-index");
    parentCall.ingredientChanged(index, e.target.value);
  }
  function removeIngredient(e) {
    const index = e.target.getAttribute("data-index");
    parentCall.removeIngredient(index);
  }
  if (!item) {
    return null;
  }
  return (
    <div>
      <input type="checkbox" id="recipeModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label htmlFor="recipeModal" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={parentCall.cancelEdits}>
            ✕
          </label>
          <div className="form-control w-full min-w-full mb-6">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" id="name" value={item.name} className="input input-bordered min-w-full" onChange={itemChanged}></input>
            <label className="label">
              <span className="label-text">Url</span>
            </label>
            <input type="text" id="url" value={item.url} className="input input-bordered min-w-full" onChange={itemChanged}></input>
          </div>
          <label className="label">
            <span className="label-text">Ingredients</span>
          </label>
          <div className="form-control w-full min-w-full mb-2">
            {item.ingredients.map((ingredient, index) => (
              <div key={index} className="flex flex-row">
                <input value={ingredient} data-index={index} type="text" className="input input-bordered input-sm mb-2 grow mr-2" onChange={ingredientChanged}></input>
                <button className="btn btn-sm" data-index={index} onClick={removeIngredient}>
                  <TrashIcon className="w-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="grid place-content-center">
            <button className="btn btn-circle btn-outline" onClick={parentCall.addIngredient}>
              <PlusIcon className="w-6 top-3 left-0" />
            </button>
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
