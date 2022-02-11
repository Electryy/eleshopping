import { PencilAltIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

function Recipe(props) {
  const { item } = { ...props };
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="card shadow-2xl bg-slate-600  shrink">
      <div className="card-body">
        <label htmlFor="my-modal-2" className="btn btn-circle absolute top-1 right-1 modal-button">
          <PencilAltIcon className="w-4" />
        </label>
        <h2 className="card-title">
          <a href={item.url}>{item.name}</a>
        </h2>
        <ul className="list-disc list-inside">
          {item.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="card-actions">
          <button className="btn btn-outline btn-accent">Copy to Shoppinglist</button>
        </div>
      </div>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <p>
            Enim dolorem dolorum omnis atque necessitatibus. Consequatur aut adipisci qui iusto illo eaque. Consequatur repudiandae et. Nulla ea quasi eligendi. Saepe velit autem
            minima.
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal-2" className="btn btn-primary">
              Accept
            </label>
            <label htmlFor="my-modal-2" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
