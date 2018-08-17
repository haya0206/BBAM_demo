import React, { Component } from "react";
import { Route } from "react-router-dom";
import { SolvingPage, ProblemListPage } from "pages";
class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ProblemListPage} />
        <Route path="/problem/:id?" component={SolvingPage} />
      </div>
    );
  }
}

export default App;
