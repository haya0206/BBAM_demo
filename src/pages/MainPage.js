import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ReactSVG from "react-svg";
import styled from "styled-components";
import AppBar from "../components/MainPageAppBar";
const Circle = styled.div`
  z-index: -1;
  width: 600px;
  height: 490px;
  background: radial-gradient(ellipse at left, #c291fe, transparent),
    radial-gradient(ellipse at right, #519cfe, transparent);
  background-size: 400% 400%;

  -webkit-animation: AnimationName 7s ease infinite;
  -moz-animation: AnimationName 7s ease infinite;
  animation: AnimationName 7s ease infinite;

  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  border-radius: 50%;
  position: absolute;
  top: -120%;
  left: 50%;
  transform: translate(-50%, 120%);
`;
const MainAppBar = styled(AppBar)`
  z-index: 1;
`;
const LoginButton = styled.a`
  font-family: Youth;
  margin: 10px;
  font-size: 20px;
  padding: 15px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: #f7f7f7;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  width: 200px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  display: inline-block;
  border-radius: 25px;
  background-image: linear-gradient(
    to right,
    #519cfe 0%,
    #c395fa 51%,
    #519cfe 100%
  );
  &:active {
    background-position: right center;
  }
  position: absolute;
  top: 78%;
  left: 48%;
  transform: translate(-50%, -30%);
`;
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      response: ""
    };
  }
  handleOnClick = () => {
    // some action...
    // then redirect
    this.setState({ redirect: true });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect push to="/problemList" />;
    }
    return (
      <div>
        <MainAppBar />
        <Circle />
        <LoginButton onClick={this.handleOnClick}>목록</LoginButton>
      </div>
    );
  }
}
export default MainPage;
