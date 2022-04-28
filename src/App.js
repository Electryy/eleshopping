import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import ShoppingList from "./ShoppingList";
import Recipes from "./Recipes";
import LoadingScreen from "./LoadingScreen";
import Refresher from "./modules/Refresher";
import { reorder } from "./modules/utils";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import ShoppingListStorage from "./data/shoppingListStorage";

let refresher = null;
const shoppingListStorage = new ShoppingListStorage();

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await shoppingListStorage.getAll();
      setShoppingList(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("state", shoppingList);
  });

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

  async function addItem(value) {
    let order = shoppingList.length;
    const newItem = { id: uuid(), text: value, checked: false, order: order };
    shoppingList.unshift(newItem);
    setShoppingList(shoppingList);
    await shoppingListStorage.add(newItem);
  }

  async function copyRecipe(item) {
    for (const ingredient of item.ingredients) {
      await this.addItem(ingredient);
    }
  }

  return (
    <div className="App pb-5 relative">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ShoppingList parentCall={{ addItem, copyRecipe, setShoppingList }} shoppingList={shoppingList} />} />
          <Route path="recipes" element={<Recipes parentCall={copyRecipe} />} />
        </Route>
      </Routes>
      <LoadingScreen dataIsLoading={dataIsLoading} />
    </div>
  );
}

export default App;
