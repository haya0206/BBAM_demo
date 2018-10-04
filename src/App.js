import React, { Component } from "react";
import { Route } from "react-router-dom";
import {
  SolvingPage,
  ProblemListPage,
  MainPage,
  textTestPage,
  AppFirstPage,
  LoginPage
} from "pages";

import TransitionGroup from "react-transition-group/TransitionGroup";
class App extends Component {
  render() {
    return (
      <div>
        <meta name="viewport" content="width=device-width" />
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/problemList" component={ProblemListPage} />
        <Route exact path="/appfirst" component={AppFirstPage} />
        <Route path="/problem/:id?" component={SolvingPage} />
        <Route path="/textTest" component={textTestPage} />
        <Route path="/mainpage" component={MainPage} />
      </div>
    );
  }
}

export default App;
