import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import ShoppingList from "./ShoppingList";
import Recipes from "./Recipes";
import LoadingScreen from "./LoadingScreen";
import RecipesStorage from "./data/recipesStorage";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import * as shoppingListStorage from "./data/shoppingListStorage";

const recipesStorage = new RecipesStorage();

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
    const unsub = shoppingListStorage.subscribe(() => shoppingListState, setShoppingList);
  }, []);

  useEffect(() => {
    console.log("shoppingList", shoppingList);
    console.log("recipes", recipes);
    shoppingListState = shoppingList;
  });

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
          <Route path="recipes" element={<Recipes parentCall={{ addItems, setRecipes }} recipes={recipes} />} />
        </Route>
      </Routes>
      <LoadingScreen dataIsLoading={dataIsLoading} />
    </div>
  );
}

export default App;
