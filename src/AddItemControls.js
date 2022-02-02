import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";

function AddItemControls(props) {
  const [isEditing, setEditing] = useState(false);
  const [keyDebug, setKeyDebug] = useState();

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
  function handleKey(e) {
    setKeyDebug(e.key);
    if (e.key === "Enter") {
      addItem();
    }
  }

  return (
    <div className="relative">
      <input
        type="text"
        ref={textInputRef}
        placeholder="Add item"
        className="input input-lg input-bordered grow w-full"
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        onKeyDown={handleKey}
      ></input>
      <button className={`btn btn-square btn-primary absolute right-2 top-2 ${isEditing ? "" : "opacity-0"}`} onClick={addItem}>
        <PlusIcon className="w-5" />
      </button>
      <div className="">{keyDebug}</div>
    </div>
  );
}

export default AddItemControls;
