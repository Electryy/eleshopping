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
      refreshCounter: 600,
    };

    this.parentCall = {
      dataLoadingStarted: this.dataLoadingStarted.bind(this),
      dataLoadingEnded: this.dataLoadingEnded.bind(this),
      inputChanged: this.inputChanged.bind(this),
      addItem: this.addItem.bind(this),
      clearChecked: this.clearChecked.bind(this),
      deleteItem: this.deleteItem.bind(this),
      checkboxClicked: this.checkboxClicked.bind(this),
      onDragEnd: this.onDragEnd.bind(this),
      showTools: this.showTools.bind(this),
    };

    this.refresh = async () => {
      if (this.state.refreshCounter > 0) {
        const shoppingList = await storeGetAll();
        this.setState((state) => {
          return { refreshCounter: state.refreshCounter - 1, shoppingList: shoppingList };
        });
      }
    };

    this.intervalRef = null;

    this.restartRefreshCounter = () => {
      if (this.state.refreshCounter < 600) {
        this.setState({ refreshCounter: 600 });
      }
    };
  }

  async componentDidMount() {
    this.dataLoadingStarted();
    this.refresh().then((res) => {
      this.dataLoadingEnded();
    });
    this.intervalRef = setInterval(this.refresh, 2000);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.setState({ refreshCounter: 0 });
      } else if (document.visibilityState === "visible") {
        this.setState({ refreshCounter: 600 });
      }
    });
  }

  async componentDidUpdate() {
    console.log("state", this.state);
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
    this.setState({ shoppingList: shoppingList });
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

  showTools(id) {
    let shoppingList = [...this.state.shoppingList].map((item) => {
      item.toolsVisible = false;
      return item;
    });

    let item = shoppingList.find((item) => item.id === id);
    item.toolsVisible = true;
    this.setState({ shoppingList: shoppingList });
  }

  render() {
    return (
      <div className="App pb-5 relative" onTouchStart={this.restartRefreshCounter} onMouseMove={this.restartRefreshCounter}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Shopping parentCall={this.parentCall} shoppingList={this.state.shoppingList} />} />
            <Route path="recipes" element={<Recipe />} />
          </Route>
        </Routes>
        <LoadingScreen dataIsLoading={this.state.dataIsLoading} />
      </div>
    );
  }
}

export default App;
