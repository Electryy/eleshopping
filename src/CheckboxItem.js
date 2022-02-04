import React, { useState } from "react";
import { DotsVerticalIcon, TrashIcon, PencilIcon } from "@heroicons/react/solid";

function CheckboxItem(props) {
  const [isEditing, setEditing] = useState(false);

  const textInputRef = React.createRef();

  function checkboxClicked(e) {
    console.log("höh");
    const id = e.target.name;
    props.checkboxClicked(id);
  }

  function toggleFocus(e) {
    if (e.type === "focus") {
      setEditing(true);
    } else if (e.type === "blur") {
      textInputRef.current.setSelectionRange(0, 0); // Fix mobile issue
      setEditing(false);
      props.inputChanged(textInputRef.current);
    }
  }
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      textInputRef.current.blur();
    }
  }

  function deleteItem(e) {
    const id = e.target.name;
    props.deleteItem(id);
  }

  return (
    <div className={`cursor-pointer py-3 px-2 rounded-md label justify-start relative ${props.snapshot.isDragging ? "bg-slate-800" : ""}`} {...props.dragHandleProps}>
      <input
        ref={textInputRef}
        name={props.id}
        defaultValue={props.text}
        type="text"
        className="input input-ghost p-0 text-xl pr-5 w-0 grow focus:bg-transparen hidden"
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        onKeyPress={handleKeyPress}
      ></input>
      <p className="grow text-xl">{props.text}</p>
      <button name={props.id} className={`btn btn text-white btn-sm btn-ghost`} onMouseDown={deleteItem}>
        <PencilIcon className="w-6 " />
      </button>
      <input name={props.id} type="checkbox" className="checkbox checkbox-lg shrink-0" checked={props.checked} onChange={checkboxClicked} />

      <button name={props.id} className={`btn btn text-white absolute top-2 -right-2 ${isEditing ? "" : "hidden"}`} onMouseDown={deleteItem}>
        <TrashIcon className="w-5 pointer-events-none" />
      </button>
    </div>
  );
}

export default CheckboxItem;
