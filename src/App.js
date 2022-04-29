import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import ShoppingList from "./ShoppingList";
import Recipes from "./Recipes";
import LoadingScreen from "./LoadingScreen";
import Refresher from "./modules/Refresher";
import { reorder } from "./modules/utils";
import RecipesStorage from "./data/recipesStorage";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import ShoppingListStorage from "./data/shoppingListStorage";
import { dbGetDoc, dbAdd, dbDeleteBatch, dbUpdateBatch, live } from "../src/data/firestore";
import { render } from "@testing-library/react";

let refresher = null;
const shoppingListStorage = new ShoppingListStorage();
const recipesStorage = new RecipesStorage();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: [],
      recipes: [],
      dataIsloading: true,
    };
    this.addItems = this.addItems.bind(this);
    this.setShoppingList = this.setShoppingList.bind(this);
    this.setRecipes = this.setRecipes.bind(this);
    this.getState = this.getState.bind(this);
  }
  componentDidMount() {
    const fetchData = async () => {
      const shoppingList = await shoppingListStorage.getAll();
      const recipes = await recipesStorage.getAll();
      this.setState({ shoppingList: shoppingList });
      this.setState({ recipes: recipes });
      this.setState({ dataIsloading: false });
    };
    fetchData();
    live("shopping_list", this.getState);
  }
  getState() {
    return this.state.shoppingList;
  }
  setShoppingList(data) {
    this.setState({ shoppingList: data });
  }
  setRecipes(data) {
    this.setState({ recipes: data });
  }
  /*
  shoppingList = shoppingListStorage.getAll();
  setShoppingList(shoppingList);

  const refresh = async function () {
    const shoppingList = await shoppingListStorage.getAll();
    setShoppingList(shoppingList);
  };
*/
  //refresh();

  //this.refresher = new Refresher(refresh);

  async addItems(values) {
    let valuesArr = Array.isArray(values) ? values : [values];
    let shoppingListCopy = [...this.state.shoppingList];
    let order = shoppingListCopy.length;
    let newItems = [];
    for (const value of valuesArr) {
      const newItem = { id: uuid(), text: value, checked: false, order: order };
      newItems.push(newItem);
      order++;
    }
    newItems.reverse();
    let newList = [...newItems, ...this.state.shoppingList];
    this.setState({ shoppingList: newList });
    await shoppingListStorage.add(newItems);
  }
  render() {
    return (
      <div className="App pb-5 relative">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ShoppingList parentCall={{ addItems: this.addItems, setShoppingList: this.setShoppingList }} shoppingList={this.state.shoppingList} />} />
            <Route path="recipes" element={<Recipes parentCall={{ addItems: this.addItems, setRecipes: this.setRecipes }} recipes={this.state.recipes} />} />
          </Route>
        </Routes>
        <LoadingScreen dataIsLoading={this.state.dataIsLoading} />
      </div>
    );
  }
}

export default App;
