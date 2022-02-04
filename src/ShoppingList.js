import React from "react";
import CheckboxItem from "./CheckboxItem";
import ClearCheckedBtn from "./ClearCheckedBtn";
import AddItemControls from "./AddItemControls";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function ShoppingList(props) {
  function handleDragEnd(event) {
    props.handleDragEnd(event);
  }
  function onDragEnd(result) {
    props.onDragEnd(result);
  }
  return (
    <div className="form-control">
      <AddItemControls addItem={props.addItem} />
      <ClearCheckedBtn clearChecked={props.clearChecked} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="fix">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {props.shoppingList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <CheckboxItem
                        key={item.id}
                        id={item.id}
                        text={item.text}
                        checked={item.checked}
                        inputChanged={props.inputChanged}
                        checkboxClicked={props.checkboxClicked}
                        deleteItem={props.deleteItem}
                        dragHandleProps={provided.dragHandleProps}
                      />
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
