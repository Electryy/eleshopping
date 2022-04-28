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
  const [dataIsLoading, setDataIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await shoppingListStorage.getAll();
      setShoppingList(data);
      setDataIsLoading(false);
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

  async function addItems(values) {
    let valuesArr = Array.isArray(values) ? values : [values];
    let shoppingListCopy = [...shoppingList];
    let order = shoppingListCopy.length;
    let newItems = [];
    for (const value of valuesArr) {
      const newItem = { id: uuid(), text: value, checked: false, order: order };
      newItems.push(newItem);
      order++;
    }
    newItems.reverse();
    let newList = [...newItems, ...shoppingList];
    setShoppingList(newList);
    await shoppingListStorage.add(newItems);
  }

  return (
    <div className="App pb-5 relative">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ShoppingList parentCall={{ addItems, setShoppingList }} shoppingList={shoppingList} />} />
          <Route path="recipes" element={<Recipes parentCall={{ addItems }} />} />
        </Route>
      </Routes>
      <LoadingScreen dataIsLoading={dataIsLoading} />
    </div>
  );
}

export default App;
