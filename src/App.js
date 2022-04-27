import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import ShoppingList from "./ShoppingList";
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
      dataIsLoading: false,
    };
    this.dataIsLoadingCalls = {
      dataLoadingStart: this.dataLoadingStart.bind(this),
      dataLoadingStop: this.dataLoadingStop.bind(this),
    };
  }

  dataLoadingStart() {
    this.setState({ dataIsLoading: true });
  }
  dataLoadingStop() {
    this.setState({ dataIsLoading: false });
  }

  render() {
    return (
      <div className="App pb-5 relative">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ShoppingList parentCall={this.dataIsLoadingCalls} />} />
            <Route path="recipes" element={<Recipes parentCall={this.dataIsLoadingCalls} />} />
          </Route>
        </Routes>
        <LoadingScreen dataIsLoading={this.state.dataIsLoading} />
      </div>
    );
  }
}

export default App;
