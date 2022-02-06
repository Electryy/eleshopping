import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import Shopping from "./Shopping";
import Recipe from "./Recipe";
import LoadingScreen from "./LoadingScreen";
import React from "react";
import { v4 as uuid } from "uuid";
import { storeAdd, storeGetAll, storeDelete, storeUpdate } from "./storage";

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
  async componentDidUpdate() {
    console.log("state", this.state);
  }
  async refresh() {
    const shoppingList = await storeGetAll();
    this.setState({ shoppingList: shoppingList });
  }
  inputChanged(target) {
    const id = target.name;
    let shoppingList = [...this.state.shoppingList];
    let item = shoppingList.find((item) => item.id === id);
    if (item.text !== target.value) {
      item.text = target.value;
      this.setState({ shoppingList: shoppingList });
      storeUpdate(item, "text");
    }
  }
  checkboxClicked(id) {
    let shoppingList = [...this.state.shoppingList];
    let item = shoppingList.find((item) => item.id === id);
    item.checked = !item.checked;
    this.setState({ shoppingList: shoppingList });
    storeUpdate(item, "checked");
  }

  async addItem(value) {
    let shoppingList = [...this.state.shoppingList];
    const newItem = { id: uuid(), text: value, checked: false, order: 0 };
    shoppingList.unshift(newItem);
    await storeAdd(newItem);
    this.refreshListOrders(shoppingList);
  }

  deleteItem(id) {
    let shoppingList = [...this.state.shoppingList];
    let item = shoppingList.find((item) => item.id === id);
    shoppingList = shoppingList.filter((item) => item.id !== id);
    this.setState({ shoppingList: shoppingList });
    storeDelete(item);
  }

  clearChecked() {
    let shoppingList = [...this.state.shoppingList];
    let deletedItems = shoppingList.filter((item) => item.checked === true);
    let remainingItems = shoppingList.filter((item) => item.checked === false);
    this.setState({ shoppingList: remainingItems });
    storeDelete(deletedItems);
  }
  dataLoadingStarted() {
    this.setState({ dataIsLoading: true });
  }
  dataLoadingEnded() {
    this.setState({ dataIsLoading: false });
  }
  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const ordered = reorder(this.state.shoppingList, result.source.index, result.destination.index);
    this.refreshListOrders(ordered);
  }
  refreshListOrders(shoppingList) {
    let ordered = shoppingList.map((item, index) => {
      item.order = index;
      return item;
    });

    this.setState({ shoppingList: ordered });
    storeUpdate(shoppingList, "order");
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
