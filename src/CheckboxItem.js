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
    console.log("jaa");
    if (e.key === "Enter") {
      textInputRef.current.blur();
    }
  }
  function blur() {
    textInputRef.current.blur();
  }

  function deleteItem(id) {
    textInputRef.current.blur();

    requestAnimationFrame(() => {
      parentCall.deleteItem(id);
    });
  }

  return (
    <div
      className={`cursor-pointer  rounded-md label flex items-start relative ${props.snapshot.isDragging ? "bg-slate-800" : ""}`}
      {...props.dragHandleProps}
      onClick={() => parentCall.showTools(item.id)}
    >
      <div className="grow flex flex-wrap justify-end">
        <input
          ref={textInputRef}
          name={item.id}
          defaultValue={item.text}
          type="text"
          className={`input w-full input-ghost p-0 text-xl focus:bg-transparen mr-2`}
          onFocus={toggleFocus}
          onBlur={toggleFocus}
          onKeyPress={handleKeyPress}
        ></input>
        <div className={`mx-1 mt-2  ${isEditing ? "" : "hidden"}`}>
          <button className={`btn btn-sm btn-warning mx-1`} onClick={() => deleteItem(item.id)}>
            <TrashIcon className="w-4" />
          </button>
          <button className={`btn btn-sm btn-primary mx-1`} onClick={blur}>
            <CheckIcon className="w-4" />
          </button>
        </div>
      </div>

      <input name={item.id} type="checkbox" className="checkbox checkbox-lg shrink-0" checked={item.checked} onChange={() => parentCall.checkboxClicked(item.id)} />
    </div>
  );
}

export default CheckboxItem;
