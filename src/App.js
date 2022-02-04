import "./App.css";
import { Routes, Route } from "react-router-dom";
import { arrayMove } from "@dnd-kit/sortable";
import MainLayout from "./MainLayout";
import Shopping from "./Shopping";
import Recipe from "./Recipe";
import LoadingScreen from "./LoadingScreen";
import React from "react";
import { v4 as uuid } from "uuid";
import { dbUpdate, dbPull, dbAdd, dbDelete, dbDeleteBatch, dbUpdateBatch } from "./firestore";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: [],
      dataIsLoading: true,
    };

    this.shoppingProps = {
      dataLoadingStarted: this.dataLoadingStarted.bind(this),
      dataLoadingEnded: this.dataLoadingEnded.bind(this),
      inputChanged: this.inputChanged.bind(this),
      addItem: this.addItem.bind(this),
      clearChecked: this.clearChecked.bind(this),
      deleteItem: this.deleteItem.bind(this),
      checkboxClicked: this.checkboxClicked.bind(this),
      refresh: this.refresh.bind(this),
      onDragEnd: this.onDragEnd.bind(this),
    };
  }

  async componentDidMount() {
    this.dataLoadingStarted();
    this.refresh().then((res) => {
      this.dataLoadingEnded();
    });
  }
  async componentDidUpdate() {}
  async refresh() {
    console.log("refreshing data");
    const shoppingList = await dbPull();
    this.setState({ shoppingList: shoppingList });
    console.log(this.state);
    //setTimeout(this.refresh.bind(this), 2000);
  }
  inputChanged(target) {
    const id = target.name;
    let shoppingList = [...this.state.shoppingList];
    let item = shoppingList.find((item) => item.id === id);
    if (item.text !== target.value) {
      item.text = target.value;
      this.setState({ shoppingList: shoppingList });
      dbUpdate(item, { text: item.text });
    }
  }
  checkboxClicked(id) {
    let shoppingList = [...this.state.shoppingList];
    let item = shoppingList.find((item) => item.id === id);
    item.checked = !item.checked;
    this.setState({ shoppingList: shoppingList });
    dbUpdate(item, { checked: item.checked });
  }

  async addItem(value) {
    let shoppingList = [...this.state.shoppingList];
    const newItem = { id: uuid(), text: value, checked: false, order: shoppingList.length };
    shoppingList.unshift(newItem);
    this.setState({ shoppingList: shoppingList }, this.refreshListOrders);
    dbAdd(newItem);
  }

  deleteItem(id) {
    let shoppingList = [...this.state.shoppingList];
    let item = shoppingList.find((item) => item.id === id);
    shoppingList = shoppingList.filter((item) => item.id !== id);
    this.setState({ shoppingList: shoppingList });
    dbDelete(item);
  }

  clearChecked() {
    let shoppingList = [...this.state.shoppingList];
    let deletedItems = shoppingList.filter((item) => item.checked === true);
    let remainingItems = shoppingList.filter((item) => item.checked === false);
    this.setState({ shoppingList: remainingItems });
    dbDeleteBatch(deletedItems);
  }
  dataLoadingStarted() {
    this.setState({ dataIsLoading: true });
    console.log("started");
  }
  dataLoadingEnded() {
    this.setState({ dataIsLoading: false });
    console.log("ended");
  }
  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const shoppingList = reorder(this.state.shoppingList, result.source.index, result.destination.index);

    this.setState({ shoppingList }, this.refreshListOrders());
  }
  refreshListOrders() {
    let shoppingList = [...this.state.shoppingList];
    shoppingList.forEach((item, index) => {
      item.order = index;
    });
    this.setState({ shoppingList: shoppingList });

    let dbObject = [];
    shoppingList.forEach((item) => {
      dbObject.push({
        id: item.id,
        order: item.order,
      });
    });
    dbUpdateBatch(dbObject);
  }
  render() {
    return (
      <div className="App pb-5 relative">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Shopping {...this.shoppingProps} shoppingList={this.state.shoppingList} />} />
            <Route path="recipes" element={<Recipe />} />
          </Route>
        </Routes>
        <LoadingScreen dataIsLoading={this.state.dataIsLoading} />
      </div>
    );
  }
}

export default App;
