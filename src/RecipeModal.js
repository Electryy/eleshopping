import { PlusIcon, TrashIcon } from "@heroicons/react/solid";

function RecipeModal(props) {
  const { parentCall } = { ...props };
  let modalItem = JSON.parse(JSON.stringify(props.modalItem));

  function itemChanged(e) {
    modalItem[e.target.id] = e.target.value;
    parentCall.setModalItem(modalItem);
  }
  function ingredientChanged(e) {
    const index = e.target.getAttribute("data-index");
    modalItem.ingredients[index] = e.target.value;
    parentCall.setModalItem(modalItem);
  }
  function removeIngredient(e) {
    const index = e.target.getAttribute("data-index");
    modalItem.ingredients.splice(index, 1);
    parentCall.setModalItem(modalItem);
  }
  function addIngredient() {
    modalItem.ingredients.push("");
    parentCall.setModalItem(modalItem);

    // Auto focus the last input element in the list
    window.requestAnimationFrame(() => {
      let ingredientInputs = document.querySelectorAll(`input[data-index]`);
      ingredientInputs[ingredientInputs.length - 1].focus();
    });
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
          </div>
          <label className="label">
            <span className="label-text">Ingredients</span>
          </label>
          <div className="form-control w-full min-w-full mb-2">
            {modalItem.ingredients.map((ingredient, index) => (
              <div key={index} className="flex flex-row">
                <input value={ingredient} data-index={index} type="text" className="input input-bordered input-sm mb-2 grow mr-2" onChange={ingredientChanged}></input>
                <button className="btn btn-sm" data-index={index} onClick={removeIngredient}>
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Notes</span>
            </label>
            <textarea id="notes" value={modalItem.notes} onChange={itemChanged} className="textarea textarea-bordered  min-w-full" />
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
