import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";

function AddItemControls(props) {
  const { parentCall } = { ...props };
  const [input, setInput] = useState("");

  function addItem() {
    if (input) {
      parentCall.addItems(input.trim());
      setInput("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    addItem();
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add item" className="input input-lg input-bordered grow w-full" value={input} onChange={(e) => setInput(e.target.value)}></input>
        <button type="submit" className={`btn btn-square btn-primary absolute right-2 top-2 ${input ? "" : "opacity-0"}`}>
          <PlusIcon className="w-5" />
        </button>
      </form>
    </div>
  );
}

export default AddItemControls;
