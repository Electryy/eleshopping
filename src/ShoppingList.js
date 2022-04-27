import React from "react";
import CheckboxItem from "./CheckboxItem";
import ClearCheckedBtn from "./ClearCheckedBtn";
import AddItemControls from "./AddItemControls";
import Refresher from "./modules/Refresher";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ShoppingListStorage from "./data/shoppingListStorage";
import { v4 as uuid } from "uuid";
import { reorder } from "./modules/utils";

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: this.fetchInitialFromSessionStorage(),
    };
    this.parentCall = {
      inputChanged: this.inputChanged.bind(this),
      addItem: this.addItem.bind(this),
      clearChecked: this.clearChecked.bind(this),
      deleteItem: this.deleteItem.bind(this),
      checkboxClicked: this.checkboxClicked.bind(this),
      onDragEnd: this.onDragEnd.bind(this),
    };

    this.refresh = async () => {
      const shoppingList = await this.shoppingListStorage.getAll();
      this.setState({ shoppingList: shoppingList });
    };
    this.refresher = new Refresher(this.refresh);
    this.shoppingListStorage = new ShoppingListStorage();
  }
  async componentDidMount() {
    this.refresh().then((res) => {
      this.props.parentCall.dataLoadingStop();
      //this.refresher.start();
    });
  }
  fetchInitialFromSessionStorage() {
    const recipes = JSON.parse(sessionStorage.getItem("shoppingListLocal"));
    if (!Array.isArray(recipes)) {
      this.props.parentCall.dataLoadingStart();
      return [];
    }
    return recipes;
  }
  componentWillUnmount() {
    sessionStorage.setItem("shoppingListLocal", JSON.stringify(this.state.shoppingList));
  }
  async componentDidUpdate() {
    console.log("state", this.state);
    console.log(this.props.test);
  }
  inputChanged(target) {
    const id = target.name;
    let shoppingList = [...this.state.shoppingList];
    let item = shoppingList.find((item) => item.id === id);
    item.text = target.value;
    this.setState({ shoppingList: shoppingList });
    this.shoppingListStorage.update(item, "text");
  }
  checkboxClicked(id) {
    let shoppingList = [...this.state.shoppingList];
    let item = shoppingList.find((item) => item.id === id);
    item.checked = !item.checked;
    this.setState({ shoppingList: shoppingList });
    this.shoppingListStorage.update(item, "checked");
  }

  async addItem(value) {
    let shoppingList = [...this.state.shoppingList];
    let order = shoppingList.length;
    const newItem = { id: uuid(), text: value, checked: false, order: order };
    shoppingList.unshift(newItem);
    this.setState({ shoppingList: shoppingList });
    await this.shoppingListStorage.add(newItem);
  }

  deleteItem(id) {
    let shoppingList = [...this.state.shoppingList];
    let item = shoppingList.find((item) => item.id === id);
    shoppingList = shoppingList.filter((item) => item.id !== id);
    this.setState({ shoppingList: shoppingList });
    this.shoppingListStorage.delete(item);
  }

  clearChecked() {
    let shoppingList = [...this.state.shoppingList];
    let deletedItems = shoppingList.filter((item) => item.checked === true);
    let remainingItems = shoppingList.filter((item) => item.checked === false);
    this.setState({ shoppingList: remainingItems });
    this.shoppingListStorage.delete(deletedItems);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const ordered = reorder(this.state.shoppingList, result.source.index, result.destination.index);
    this.refreshListOrders(ordered);
  }

  refreshListOrders(shoppingList) {
    let lastIndex = shoppingList.length - 1;
    let ordered = shoppingList.map((item, index) => {
      item.order = lastIndex - index;
      return item;
    });

    this.setState({ shoppingList: ordered });
    this.shoppingListStorage.update(shoppingList, "order");
  }

  render() {
    return (
      <div className="form-control">
        <AddItemControls parentCall={this.parentCall} />
        <ClearCheckedBtn parentCall={this.parentCall} />
        <DragDropContext onDragEnd={this.parentCall.onDragEnd}>
          <Droppable droppableId="fix">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {this.state.shoppingList.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <CheckboxItem item={item} dragHandleProps={provided.dragHandleProps} snapshot={snapshot} parentCall={this.parentCall} />
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
}

export default ShoppingList;
