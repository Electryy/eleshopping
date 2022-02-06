import React, { useState } from "react";
import { DotsVerticalIcon, TrashIcon, PencilIcon } from "@heroicons/react/solid";

function CheckboxItem(props) {
  const { item, parentCall } = { ...props };

  const textInputRef = React.createRef();

  function toggleFocus(e) {
    if (e.type === "focus") {
    } else if (e.type === "blur") {
      textInputRef.current.setSelectionRange(0, 0); // Fix mobile issue
      props.inputChanged(textInputRef.current);
    }
  }
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      textInputRef.current.blur();
    }
  }

  return (
    <div
      className={`cursor-pointer py-3 px-2 rounded-md label justify-start relative ${props.snapshot.isDragging ? "bg-slate-800" : ""}`}
      {...props.dragHandleProps}
      onClick={() => parentCall.showTools(item.id)}
    >
      <input
        ref={textInputRef}
        name={item.id}
        defaultValue={item.text}
        type="text"
        className={`input input-ghost p-0 text-xl pr-5 w-0 grow focus:bg-transparen ml-10`}
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        onKeyPress={handleKeyPress}
      ></input>
      <p className={`grow text-xl hidden ${item.toolsVisible ? "hidden" : ""}`}>{item.text}</p>
      <button name={item.id} className={`btn btn text-white btn-sm btn-ghost hidden ${item.toolsVisible ? "" : "hidden"}`}>
        <PencilIcon className="w-6 " />
      </button>
      <input name={item.id} type="checkbox" className="checkbox checkbox-lg shrink-0" checked={item.checked} onChange={() => parentCall.checkboxClicked(item.id)} />

      <button name={item.id} className={`btn btn text-white absolute top-2 -right-2 ${item.toolsVisible ? "" : "hidden"}`} onMouseDown={() => parentCall.deleteItem(item.id)}>
        <TrashIcon className="w-5 pointer-events-none" />
      </button>
    </div>
  );
}

export default CheckboxItem;
