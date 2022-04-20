import { PencilAltIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

function RecipeModal(props) {
  const { item } = { ...props };
  return (
    <div>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="form-control w-full min-w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered min-w-full"></input>
            <label className="label">
              <span className="label-text">Url</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered min-w-full"></input>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered min-w-full"></input>
          </div>

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
