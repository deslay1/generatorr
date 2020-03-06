import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import MemeGen from "./components/memegen";
import TextmanGen from "./components/textmangen";
import RecipeGen from "./components/recipegen";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/memegen" component={MemeGen}></Route>
        <Route path="/textmangen" component={TextmanGen}></Route>
        <Route path="/recipegen" component={RecipeGen}></Route>
      </div>
    </Router>
  );
}

export default App;
