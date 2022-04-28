import React from "react";
import CheckboxItem from "./CheckboxItem";
import ClearCheckedBtn from "./ClearCheckedBtn";
import AddItemControls from "./AddItemControls";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ShoppingListStorage from "./data/shoppingListStorage";
import { reorder } from "./modules/utils";

const shoppingListStorage = new ShoppingListStorage();

function ShoppingList(props) {
  let { parentCall } = { ...props };
  let shoppingList = [...props.shoppingList];

  function inputChanged(id, value) {
    let item = shoppingList.find((item) => item.id === id);
    item.text = value;
    parentCall.setShoppingList(shoppingList);
    shoppingListStorage.update(item, "text");
  }

  function checkboxClicked(id) {
    let item = shoppingList.find((item) => item.id === id);
    item.checked = !item.checked;
    console.log(shoppingList);
    parentCall.setShoppingList(shoppingList);
    shoppingListStorage.update(item, "checked");
    console.log("cliddk");
  }

  function deleteItem(id) {
    let item = shoppingList.find((item) => item.id === id);
    shoppingList = shoppingList.filter((item) => item.id !== id);
    parentCall.setShoppingList(shoppingList);
    shoppingListStorage.delete(item);
  }

  function clearChecked() {
    let deletedItems = shoppingList.filter((item) => item.checked === true);
    let remainingItems = shoppingList.filter((item) => item.checked === false);
    parentCall.setShoppingList(remainingItems);
    shoppingListStorage.delete(deletedItems);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const ordered = reorder(shoppingList, result.source.index, result.destination.index);
    refreshListOrders(ordered);
  }

  function refreshListOrders(shoppingList) {
    let lastIndex = shoppingList.length - 1;
    let ordered = shoppingList.map((item, index) => {
      item.order = lastIndex - index;
      return item;
    });

    parentCall.setShoppingList(ordered);
    shoppingListStorage.update(shoppingList, "order");
  }

  return (
    <div className="form-control">
      <AddItemControls parentCall={parentCall} />
      <ClearCheckedBtn parentCall={parentCall} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="fix">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {shoppingList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <CheckboxItem
                        item={item}
                        dragHandleProps={provided.dragHandleProps}
                        snapshot={snapshot}
                        parentCall={{ ...parentCall, inputChanged, checkboxClicked, deleteItem, clearChecked }}
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
