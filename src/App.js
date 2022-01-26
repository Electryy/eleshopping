import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import Shopping from "./Shopping";
import Recipe from "./Recipe";
import LoadingScreen from "./LoadingScreen";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataIsLoading: true,
    };
    this.dataLoadingStarted = this.dataLoadingStarted.bind(this);
    this.dataLoadingEnded = this.dataLoadingEnded.bind(this);
  }
  dataLoadingStarted() {
    this.setState({ dataIsLoading: true });
    console.log("started");
  }
  dataLoadingEnded() {
    this.setState({ dataIsLoading: false });
    console.log("ended");
  }
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Shopping dataLoadingStarted={this.dataLoadingStarted} dataLoadingEnded={this.dataLoadingEnded} />} />
            <Route path="recipes" element={<Recipe />} />
          </Route>
        </Routes>
        <LoadingScreen dataIsLoading={this.state.dataIsLoading} />
      </div>
    );
  }
}

export default App;
