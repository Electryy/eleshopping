import React, { useState } from "react";
import { DotsVerticalIcon, TrashIcon, CheckIcon } from "@heroicons/react/solid";

function CheckboxItem(props) {
  const { item, parentCall } = { ...props };
  const [isEditing, setIsEditing] = useState(false);
  const textInputRef = React.createRef();

  function toggleFocus(e) {
    if (e.type === "focus") {
      setIsEditing(true);
    } else if (e.type === "blur") {
      const element = textInputRef.current;

      element.setSelectionRange(0, 0); // "Scroll" back to start of the string

      setIsEditing(false);

      parentCall.inputChanged(element);
    }
  }
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      textInputRef.current.blur();
    }
  }
  function blur() {
    //textInputRef.current.blur();
  }

  function deleteItem(id) {
    //textInputRef.current.blur();
    parentCall.deleteItem(id);
  }

  return (
    <div
      className={`cursor-pointer  rounded-md label flex items-center relative ${props.snapshot.isDragging ? "bg-slate-800" : ""}`}
      {...props.dragHandleProps}
      onClick={() => parentCall.showTools(item.id)}
    >
      <input
        ref={textInputRef}
        name={item.id}
        defaultValue={item.text}
        type="text"
        className={`input input-ghost p-0 text-xl pr-5 w-0 grow focus:bg-transparen ml-10 mr-2`}
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        onKeyPress={handleKeyPress}
      ></input>
      <div className={`mx-1 ${isEditing ? "" : "hidden"}`}>
        <button className={`btn btn-primary mx-1`} onClick={blur}>
          <CheckIcon className="w-6" />
        </button>
        <button className={`btn btn-warning mx-1`} onClick={() => deleteItem(item.id)}>
          <TrashIcon className="w-6" />
        </button>
      </div>

      <input name={item.id} type="checkbox" className="checkbox checkbox-lg shrink-0" checked={item.checked} onChange={() => parentCall.checkboxClicked(item.id)} />
    </div>
  );
}

export default CheckboxItem;
