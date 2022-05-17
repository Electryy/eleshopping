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
  function handleKey(e) {
    if (e.key === "Enter") {
      addItem();
    }
  }

  function inputChanged(e) {
    const text = e.target.value;
    // Rant: Android key events are so messed up with trying to listen to Enter
    // key events so this is the solution for mobile. If double space it means Enter...
    if (text.includes("  ")) {
      addItem();
      return;
    }
    setInput(text);
  }

  return (
    <div className="relative">
      <input type="text" placeholder="Add item" className="input input-lg input-bordered grow w-full" value={input} onChange={inputChanged} onKeyDown={handleKey}></input>
      <button className={`btn btn-square btn-primary absolute right-2 top-2 ${input ? "" : "opacity-0"}`} onClick={addItem}>
        <PlusIcon className="w-5" />
      </button>
    </div>
  );
}

export default AddItemControls;
