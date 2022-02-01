import React from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import CheckboxItem from "./CheckboxItem";
import ClearCheckedBtn from "./ClearCheckedBtn";
import AddItemControls from "./AddItemControls";

function ShoppingList(props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    props.handleDragEnd(event);
  }
  return (
    <div className="form-control">
      <AddItemControls addItem={props.addItem} />
      <ClearCheckedBtn clearChecked={props.clearChecked} />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={props.shoppingList} strategy={verticalListSortingStrategy}>
          {props.shoppingList.map((item) => (
            <CheckboxItem
              key={item.id}
              id={item.id}
              text={item.text}
              checked={item.checked}
              inputChanged={props.inputChanged}
              checkboxClicked={props.checkboxClicked}
              deleteItem={props.deleteItem}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default ShoppingList;
