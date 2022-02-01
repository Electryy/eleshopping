import "./App.css";
import { Routes, Route } from "react-router-dom";
import { arrayMove } from "@dnd-kit/sortable";
import MainLayout from "./MainLayout";
import Shopping from "./Shopping";
import Recipe from "./Recipe";
import LoadingScreen from "./LoadingScreen";
import React from "react";
import { v4 as uuid } from "uuid";
import { dbUpdate, dbPull } from "./firestore";

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
      handleDragEnd: this.handleDragEnd.bind(this),
    };
  }
  async componentDidMount() {
    this.dataLoadingStarted();
    this.refresh().then((res) => {
      this.dataLoadingEnded();
    });
  }
  componentDidUpdate() {
    dbUpdate(this.state.shoppingList);
  }
  async refresh() {
    console.log("refreshing data");
    const shoppingList = await dbPull();
    this.setState({ shoppingList: shoppingList });
    console.log(this.state);
    //setTimeout(this.refresh, 2000);
  }
  inputChanged(target) {
    const id = target.name;
    let shoppingList = [...this.state.shoppingList];
    let item = shoppingList.find((item) => item.id === id);
    item.text = target.value;
    this.setState({ shoppingList: shoppingList });
  }
  checkboxClicked(id) {
    let shoppingList = [...this.state.shoppingList];
    let item = shoppingList.find((item) => item.id === id);
    item.checked = !item.checked;
    this.setState({ shoppingList: shoppingList });
  }

  async addItem(value) {
    let shoppingList = [...this.state.shoppingList];
    const newItem = { id: uuid(), text: value, checked: false, order: shoppingList.length };
    shoppingList.unshift(newItem);
    this.setState({ shoppingList: shoppingList }, this.refreshListOrders);
  }

  deleteItem(id) {
    let shoppingList = [...this.state.shoppingList];
    shoppingList = shoppingList.filter((item) => item.id !== id);
    this.setState({ shoppingList: shoppingList });
  }

  clearChecked() {
    let shoppingList = [...this.state.shoppingList];
    let deletedItems = shoppingList.filter((item) => item.checked === true);
    let remainingItems = shoppingList.filter((item) => item.checked === false);
    this.setState({ shoppingList: remainingItems });
    //updateEverything(this.state.shoppingList);
  }
  dataLoadingStarted() {
    this.setState({ dataIsLoading: true });
    console.log("started");
  }
  dataLoadingEnded() {
    this.setState({ dataIsLoading: false });
    console.log("ended");
  }
  handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      let shoppingList = [];
      const oldIndex = this.state.shoppingList.findIndex((item) => item.id === active.id);
      const newIndex = this.state.shoppingList.findIndex((item) => item.id === over.id);

      shoppingList = arrayMove(this.state.shoppingList, oldIndex, newIndex);

      this.setState({ shoppingList: shoppingList }, this.refreshListOrders);
    }
  }
  refreshListOrders() {
    let shoppingList = [...this.state.shoppingList];
    shoppingList.forEach((item, index) => {
      item.order = index;
    });
    this.setState({ shoppingList: shoppingList }, console.log(this.state.shoppingList));
    //updateEverything(shoppingList);
  }
  render() {
    return (
      <div className="App">
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
