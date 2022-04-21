import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import Shopping from "./Shopping";
import Recipes from "./Recipes";
import LoadingScreen from "./LoadingScreen";
import Refresher from "./modules/Refresher";
import { reorder } from "./modules/utils";
import React from "react";
import { v4 as uuid } from "uuid";
import ShoppingListStorage from "./data/shoppingListStorage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: [],
      recipes: [
        {
          name: "Chorizo pasta",
          url: "https://google.com",
          notes: "tekstiä tekstiä",
          ingredients: ["Chorizoo 200g", "fjdkslajfdsa", "jfkdlsa jfkdslajfkl"],
        },
      ],
      dataIsLoading: true,
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
    this.setState({ dataIsLoading: true });
    this.refresh().then((res) => {
      this.setState({ dataIsLoading: false });
      //this.refresher.start();
    });
  }

  async componentDidUpdate() {
    console.log("state", this.state);
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
      <div className="App pb-5 relative">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Shopping parentCall={this.parentCall} shoppingList={this.state.shoppingList} />} />
            <Route path="recipes" element={<Recipes recipes={this.state.recipes} />} />
          </Route>
        </Routes>
        <LoadingScreen dataIsLoading={this.state.dataIsLoading} />
      </div>
    );
  }
}

export default App;
