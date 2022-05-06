import React, { useEffect } from "react";
import ShoppingListItem from "./ShoppingListItem";
import AddItemControls from "./AddItemControls";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as shoppingListStorage from "./data/shoppingListStorage";
import { reorder } from "./modules/utils";

function ShoppingList(props) {
  let { parentCall } = { ...props };
  let shoppingList = [...props.shoppingList];
  let addItems = parentCall.addItems;

  function inputChanged(id, value) {
    let item = shoppingList.find((item) => item.id === id);
    item.text = value;
    parentCall.setShoppingList(shoppingList);
  }

  function saveItem(item) {
    if (shoppingList.some((itm) => itm.id === item.id)) {
      shoppingListStorage.update(item);
    }
  }

  function checkboxClicked(id) {
    let item = shoppingList.find((item) => item.id === id);
    item.checked = !item.checked;
    parentCall.setShoppingList(shoppingList);
    shoppingListStorage.update(item);
  }

  function deleteItem(id) {
    let item = shoppingList.find((item) => item.id === id);
    if (!item) {
      return;
    }
    shoppingList = shoppingList.filter((item) => item.id !== id);
    parentCall.setShoppingList(shoppingList);
    shoppingListStorage.deleteItem(item);
  }

  function clearList() {
    parentCall.setShoppingList([]);
    shoppingListStorage.deleteItem(shoppingList);
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
    shoppingListStorage.update(shoppingList);
  }

  return (
    <div className="form-control">
      <AddItemControls parentCall={{ addItems }} />
      <button className={`btn btn-link self-end text-white -mr-4`} onClick={clearList}>
        Clear all
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="fix">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {shoppingList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <ShoppingListItem
                        item={item}
                        dragHandleProps={provided.dragHandleProps}
                        snapshot={snapshot}
                        parentCall={{ ...parentCall, inputChanged, checkboxClicked, deleteItem, saveItem }}
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
