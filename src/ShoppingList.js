import React from "react";
import CheckboxItem from "./CheckboxItem";
import ClearCheckedBtn from "./ClearCheckedBtn";
import AddItemControls from "./AddItemControls";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ShoppingListStorage from "./data/shoppingListStorage";

const shoppingListStorage = new ShoppingListStorage();

function ShoppingList(props) {
  let { shoppingList, parentCall } = { ...props };

  function inputChanged(id, value) {
    let item = shoppingList.find((item) => item.id === id);
    item.text = value;
    parentCall.setShoppingList(shoppingList);
    shoppingListStorage.update(item, "text");
  }

  parentCall = { ...parentCall, inputChanged };
  return (
    <div className="form-control">
      <AddItemControls parentCall={parentCall} />
      <ClearCheckedBtn parentCall={parentCall} />
      <DragDropContext onDragEnd={parentCall.onDragEnd}>
        <Droppable droppableId="fix">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {shoppingList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <CheckboxItem item={item} dragHandleProps={provided.dragHandleProps} snapshot={snapshot} parentCall={parentCall} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default ShoppingList;
