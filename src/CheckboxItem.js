import React, { useState } from "react";
import { DotsVerticalIcon, TrashIcon, CheckIcon } from "@heroicons/react/solid";

function CheckboxItem(props) {
  const { item, parentCall } = { ...props };
  const [isEditing, setIsEditing] = useState(false);
  const textInputRef = React.createRef();

  function focus() {
    setIsEditing(true);
  }
  function blur(item) {
    textInputRef.current.setSelectionRange(0, 0); // "Scroll" back to start of the string
    setIsEditing(false);
    parentCall.saveItem(item);
  }
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.target.current.blur();
    }
  }
  function onChange(e) {
    parentCall.inputChanged(item.id, e.target.value);
  }
  function deleteItem(id) {
    textInputRef.current.blur();

    requestAnimationFrame(() => {
      parentCall.deleteItem(id);
    });
  }

  return (
    <div className={`rounded-md p-2 pl-0 flex items-start relative ${props.snapshot.isDragging ? "bg-slate-800" : ""}`}>
      <div className="h-12 w-10 relative shrink-0" {...props.dragHandleProps}>
        <DotsVerticalIcon className="absolute w-6 top-3 left-0" />
        <DotsVerticalIcon className="absolute w-6 top-3 left-2" />
      </div>
      <div className="grow flex flex-wrap justify-end mr-2">
        <input
          ref={textInputRef}
          name={item.id}
          value={item.text}
          type="text"
          className={`input grow basis-full  input-ghost p-0 text-xl focus:bg-slate-600 ${item.checked ? "line-through italic" : ""}`}
          onFocus={focus}
          onBlur={() => blur(item)}
          onKeyPress={handleKeyPress}
          onChange={onChange}
        ></input>
        <div className={`-mx-1 mt-2  ${isEditing ? "" : "hidden"}`}>
          <button className={`btn btn-sm btn-warning mx-1`} onMouseDown={() => deleteItem(item.id)}>
            <TrashIcon className="w-4" />
          </button>
          <button className={`btn btn-sm btn-primary mx-1`}>
            <CheckIcon className="w-4" />
          </button>
        </div>
      </div>

      <input name={item.id} type="checkbox" className="checkbox checkbox-lg shrink-0 mt-2" checked={item.checked} onChange={() => parentCall.checkboxClicked(item.id)} />
    </div>
  );
}

export default CheckboxItem;
