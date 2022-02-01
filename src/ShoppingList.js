import React, { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import CheckboxItem from "./CheckboxItem";
import ClearCheckedBtn from "./ClearCheckedBtn";
import AddItemControls from "./AddItemControls";
import SortableItem from "./SortableItem";

function ShoppingList(props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [items, setItems] = useState(["1", "2", "3"]);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="form-control">
      <AddItemControls addItem={props.addItem} />
      <ClearCheckedBtn clearChecked={props.clearChecked} />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </SortableContext>
      </DndContext>
      {props.shoppingList.map((item) => (
        <CheckboxItem
          key={item.id}
          id={item.id}
          text={item.text}
          checked={item.checked}
          inputChanged={props.inputChanged}
          checkboxClicked={props.checkboxClicked}
          deleteItem={props.deleteItem}
          updateItem={props.updateItem}
        />
      ))}
    </div>
  );
}

export default ShoppingList;
