import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import {
  SolvingPage,
  ProblemListPage,
  MainPage,
  AppFirstPage,
  LoginPage,
  BattlePage,
  SandBoxPage,
  MyPage
} from "pages";
import { injectGlobal } from "styled-components";
import Socket from "./core/Socket";
import Store from "./mobx/Store";
import { CSSTransition, TransitionGroup } from "react-transition-group";
injectGlobal`
  @font-face {
    font-family: 'Youth';
    font-style: normal;
    font-weight: 400;
    src: url('//cdn.jsdelivr.net/korean-webfonts/1/orgs/othrs/kywa/Youth/Youth.woff2') format('woff2'), url('//cdn.jsdelivr.net/korean-webfonts/1/orgs/othrs/kywa/Youth/Youth.woff') format('woff');
  }
  body{
    font-family: Youth !important;
    position: fixed; 
    overflow-y: scroll;
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;

const store = new Store();
const socket = new Socket({ store });
class App extends Component {
  render() {
    return (
      <TransitionGroup>
        <CSSTransition
          classNames="fadeTranslate"
          timeout={300}
          mountOnEnter={true}
          unmountOnExit={true}
          key={this.props.location.pathname}
        >
          <section className="fix-container">
            <Switch location={this.props.location}>
              <Route exact path="/" component={LoginPage} />
              <Route
                exact
                path="/problemList/:number/:difficultyNum/:problemNum"
                component={ProblemListPage}
              />
              <Route exact path="/appfirst" component={AppFirstPage} />
              <Route
                path="/problem/:id"
                render={props => (
                  <SolvingPage
                    {...props}
                    store={store}
                    success={socket.success}
                  />
                )}
              />
              <Route
                path="/mainpage"
                render={() => (
                  <MainPage
                    login={socket.login}
                    store={store}
                    toInvite={socket.toInvite}
                  />
                )}
              />
              <Route
                path="/battle"
                render={() => (
                  <BattlePage toBattle={socket.toBattle} store={store} />
                )}
              />
              <Route
                path="/battlepage/:room/:id"
                render={props => (
                  <SolvingPage
                    {...props}
                    store={store}
                    type="battle"
                    startBattle={socket.startBattle}
                    success={socket.success}
                  />
                )}
              />
              <Route
                path="/sandbox"
                render={props => <SandBoxPage {...props} store={store} />}
              />
              <Route exact path="/mypage" component={MyPage} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default App;
