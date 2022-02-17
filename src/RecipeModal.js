import { PencilAltIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

function RecipeModal(props) {
  const { item } = { ...props };
  return (
    <div>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h4>{item.name}</h4>
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

export default RecipeModal;
