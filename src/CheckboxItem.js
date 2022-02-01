import React, { useState } from "react";
import { DotsVerticalIcon, TrashIcon } from "@heroicons/react/solid";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function CheckboxItem(props) {
  const [isEditing, setEditing] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const textInputRef = React.createRef();

  function checkboxClicked(e) {
    console.log("höh");
    const id = e.target.name;
    props.checkboxClicked(id);
  }

  function toggleFocus(e) {
    const id = e.target.name;
    if (e.type === "focus") {
      setEditing(true);
    } else if (e.type === "blur") {
      setEditing(false);
      props.inputChanged(textInputRef.current);
    }
  }

  function deleteItem(e) {
    const id = e.target.name;
    props.deleteItem(id);
  }

  return (
    <div className="cursor-pointer label justify-start relative" ref={setNodeRef} style={style}>
      <DragIcon attributes={attributes} listeners={listeners} />
      <input name={props.id} type="checkbox" className="checkbox checkbox-lg mr-5" checked={props.checked} onChange={checkboxClicked} />
      <input
        ref={textInputRef}
        name={props.id}
        defaultValue={props.text}
        type="text"
        placeholder=""
        className="input grow input-ghost p-0 text-xl"
        onFocus={toggleFocus}
        onBlur={toggleFocus}
      ></input>
      <button name={props.id} className={`btn btn text-white absolute top-2 right-0 ${isEditing ? "" : "opacity-0"}`} onClick={deleteItem}>
        <TrashIcon className="w-5 pointer-events-none" />
      </button>
    </div>
  );
}

function DragIcon(props) {
  return (
    <div className="mr-5 flex" {...props.attributes} {...props.listeners}>
      <DotsVerticalIcon className="h-9 w-9 -mr-6" />
      <DotsVerticalIcon className="h-9 w-9" />
    </div>
  );
}

export default CheckboxItem;
