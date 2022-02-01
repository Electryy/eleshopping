import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";

function AddItemControls(props) {
  const [isEditing, setEditing] = useState(false);

  const textInputRef = React.createRef();

  function toggleFocus(e) {
    if (e.type === "focus") {
      setEditing(true);
    } else if (e.type === "blur") {
      setEditing(false);
    }
  }
  function addItem() {
    const input = textInputRef.current;
    if (input.value) {
      props.addItem(input.value);
      input.value = "";
    }
    setEditing(true);
    input.focus();
  }

  return (
    <div className="flex relative">
      <input type="text" ref={textInputRef} placeholder="Add item" className="input input-lg input-bordered grow" onFocus={toggleFocus} onBlur={toggleFocus}></input>
      <button className={`btn btn-square btn-primary absolute right-2 top-2 ${isEditing ? "" : "opacity-0"}`} onClick={addItem}>
        <PlusIcon className="w-5" />
      </button>
    </div>
  );
}

export default AddItemControls;
