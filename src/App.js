import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import ShoppingList from "./ShoppingList";
import Recipes from "./Recipes";
import LoadingScreen from "./LoadingScreen";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import * as shoppingListStorage from "./data/shoppingListStorage";
import * as recipesStorage from "./data/recipesStorage";

// Needed for live database update callback
let shoppingListState = [];

function App() {
  let [shoppingList, setShoppingList] = useState([]);
  let [recipes, setRecipes] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const shoppingList = await shoppingListStorage.getAll();
      const recipes = await recipesStorage.getAll();
      setShoppingList(shoppingList);
      setRecipes(recipes);

      setDataIsLoading(false);
    };
    fetchData();

    // Database listener. Passing shoppingList state getter and setter
    shoppingListStorage.subscribe(() => shoppingListState, setShoppingList);
  }, []);

  useEffect(() => {
    console.log("shoppingList", shoppingList);

    // Have to update this as the database listener needs the access
    shoppingListState = shoppingList;
  }, [shoppingList]);

  useEffect(() => {
    console.log("recipes", recipes);
  }, [recipes]);

  async function addItems(values) {
    // Make it to array
    let valuesArr = Array.isArray(values) ? values : [values];
    let shoppingListCopy = [...shoppingList];
    let order = shoppingListCopy.length;
    let newItems = [];

    // Loop new items and add them to newItems array. Also keep in track of the order number.
    for (const value of valuesArr) {
      const newItem = { id: uuid(), text: value, checked: false, order: order };
      newItems.push(newItem);
      order++;
    }

    newItems.reverse();

    // Combine old an new items
    let newList = [...newItems, ...shoppingList];
    setShoppingList(newList);
    await shoppingListStorage.add(newItems);
  }

  return (
    <div className="App pb-5 relative">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ShoppingList parentCall={{ addItems, setShoppingList }} shoppingList={shoppingList} />} />
          <Route path="recipes" element={<Recipes parentCall={{ addItems, setRecipes }} recipes={recipes} />} />
        </Route>
      </Routes>
      <LoadingScreen dataIsLoading={dataIsLoading} />
    </div>
  );
}

export default App;
