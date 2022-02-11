import { PencilAltIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

function Recipe() {
  //const [openModal, setOpenModal] = useState(false);
  return (
    <div class="card shadow-2xl bg-slate-600  shrink">
      <div class="card-body">
        <label for="my-modal-2" class="btn btn-circle absolute top-1 right-1 modal-button">
          <PencilAltIcon className="w-4" />
        </label>
        <h2 class="card-title">
          <a href="google.com">Chorizo keitto</a>
        </h2>
        <ul className="list-disc list-inside">
          <li>Chorizoo</li>
          <li>1 sipuli</li>
          <li>1 sipuli</li>
          <li>1 sipuli</li>
          <li>1 sipuli</li>
        </ul>
        <div className="card-actions">
          <button className="btn btn-outline btn-accent">Copy to Shoppinglist</button>
        </div>
      </div>
      <input type="checkbox" id="my-modal-2" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
          <p>
            Enim dolorem dolorum omnis atque necessitatibus. Consequatur aut adipisci qui iusto illo eaque. Consequatur repudiandae et. Nulla ea quasi eligendi. Saepe velit autem
            minima.
          </p>
          <div class="modal-action">
            <label for="my-modal-2" class="btn btn-primary">
              Accept
            </label>
            <label for="my-modal-2" class="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
