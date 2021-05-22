import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import BlogList from "./Blog/BlogList";
import BlogDetails from "./Blog/BlogDetails";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={BlogList} />
        <Route path="/blogs/:blogId" component={BlogDetails} />
      </Switch>
    </div>
  );
}

export default App;