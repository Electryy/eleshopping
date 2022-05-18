import React, { useState, useEffect } from "react";
import { DotsVerticalIcon, CheckIcon } from "@heroicons/react/solid";

function ShoppingListItem(props) {
  const { item, parentCall } = { ...props };
  const [isEditing, setIsEditing] = useState(false);
  const [deleteAnimation, setDeleteAnimation] = useState(false);
  const textInputRef = React.createRef();
  const wrapperRef = React.createRef();

  // Need to override transition-duration as tailwind does not work as expected
  const transDuration = 300;
  const styleDuration = {
    transitionDuration: transDuration + "ms",
  };

  useEffect(() => {
    // Once state changes to checked: Animate it out and delete
    if (item.checked === true) {
      setDeleteAnimation(true);
      setTimeout(() => {
        parentCall.deleteItem(item.id);
      }, transDuration);
    }
  });

  function focus() {
    setIsEditing(true);
  }
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      saveItem();
    }
  }
  function onChange(e) {
    parentCall.inputChanged(item.id, e.target.value);
  }

  function saveItem() {
    textInputRef.current.setSelectionRange(0, 0); // "Scroll" back to start of the string on long lines
    textInputRef.current.blur();
    setIsEditing(false);
    parentCall.saveItem(item);
  }

  function submit(e) {
    e.preventDefault();
    saveItem();
  }

  return (
    <div
      ref={wrapperRef}
      style={styleDuration}
      className={`relative rounded-sm p-2 pl-0 flex items-start transition ${props.snapshot.isDragging ? "bg-zinc-600" : ""} ${deleteAnimation ? "opacity-0 scale-75" : ""}`}
    >
      <div className="h-12 w-10 relative shrink-0" {...props.dragHandleProps}>
        <DotsVerticalIcon className="absolute w-6 top-3 left-0" />
        <DotsVerticalIcon className="absolute w-6 top-3 left-2" />
      </div>
      <form className="grow flex justify-end mr-2" onSubmit={submit}>
        <input
          ref={textInputRef}
          name={item.id}
          value={item.text}
          type="text"
          className={`input w-full grow input-ghost p-0 text-xl focus:bg-slate-600 ${deleteAnimation ? "line-through italic" : ""}`}
          onFocus={focus}
          onBlur={saveItem}
          onKeyPress={handleKeyPress}
          onChange={onChange}
        ></input>
        <button type="submit" className={`btn mt-2 ml-2 btn-sm btn-primary ${isEditing ? "" : "hidden"}`}>
          <CheckIcon className="w-4" />
        </button>
      </form>

      <input name={item.id} type="checkbox" className="checkbox checkbox-lg shrink-0 mt-2" checked={item.checked} onChange={() => parentCall.checkboxClicked(item.id)} />
    </div>
  );
}

export default ShoppingListItem;
