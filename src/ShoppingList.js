import React from "react";
import CheckboxItem from "./CheckboxItem";
import ClearCheckedBtn from "./ClearCheckedBtn";
import AddItemControls from "./AddItemControls";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function ShoppingList(props) {
  const { shoppingList, parentCall } = { ...props };
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
