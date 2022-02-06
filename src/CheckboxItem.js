import React, { useState } from "react";
import { DotsVerticalIcon, TrashIcon, PencilIcon } from "@heroicons/react/solid";

function CheckboxItem(props) {
  const [isEditing, setEditing] = useState(false);

  const textInputRef = React.createRef();

  function checkboxClicked(e) {
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
  function jes() {
    console.log(props);
    props.showTools();
  }

  return (
    <div
      className={`cursor-pointer py-3 px-2 rounded-md label justify-start relative ${props.snapshot.isDragging ? "bg-slate-800" : ""}`}
      {...props.dragHandleProps}
      onClick={() => props.showTools(props.item.id)}
    >
      <input
        ref={textInputRef}
        name={props.item.id}
        defaultValue={props.item.text}
        type="text"
        className="input input-ghost p-0 text-xl pr-5 w-0 grow focus:bg-transparen hidden"
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        onKeyPress={handleKeyPress}
      ></input>
      <p className="grow text-xl">{props.item.text}</p>
      <button name={props.item.id} className={`btn btn text-white btn-sm btn-ghost ${props.item.toolsVisible ? "" : "hidden"}`} onMouseDown={deleteItem}>
        <PencilIcon className="w-6 " />
      </button>
      <input name={props.item.id} type="checkbox" className="checkbox checkbox-lg shrink-0" checked={props.checked} onChange={checkboxClicked} />

      <button name={props.item.id} className={`btn btn text-white absolute top-2 -right-2 ${props.item.toolsVisible ? "" : "hidden"}`} onMouseDown={deleteItem}>
        <TrashIcon className="w-5 pointer-events-none" />
      </button>
    </div>
  );
}

export default CheckboxItem;
