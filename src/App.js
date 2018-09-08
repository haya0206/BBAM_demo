import React, { Component } from "react";
import { Route } from "react-router-dom";
import { SolvingPage, ProblemListPage, MainPage, textTestPage } from "pages";
class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/problemList" component={ProblemListPage} />
        <Route path="/problem/:id?" component={SolvingPage} />
        <Route path="/textTest" component={textTestPage} />
      </div>
    );
  }
}

export default App;
