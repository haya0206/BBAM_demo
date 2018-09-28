import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import styled, { injectGlobal } from "styled-components";
import AppBar from "../components/MainPageAppBar";
import Avatar from "@material-ui/core/Avatar";
import EmptyAvatar from "./emptyAvatar.png";
injectGlobal`
  body{
    position: fixed; 
    overflow-y: scroll;
    width: 100%;
  }
`;
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
const MainAvatar = styled(Avatar)`
  margin-left: 20px;
  width: 130px !important;
  height: 130px !important;
`;
const TextFiled = styled.div`
  float: left;
  margin-left: 170px;
  margin-top: -120px;
`;
const Name = styled.p`
  color: #000000;
  font-family: Youth;
  font-size: 25px;
  font-weight: 400;
  line-height: 20px;
`;
const Level = styled.p`
  color: #3592ff;
  font-family: Youth;
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
`;
const Div = styled.div`
  height: 100vh;
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
      <Div>
        <MainAppBar />
        <MainAvatar alt="Remy Sharp" src={EmptyAvatar} />
        <TextFiled>
          <Name>empty</Name>
          <Level>LV.0</Level>
        </TextFiled>
        <Circle />
        <LoginButton onClick={this.handleOnClick}>목록</LoginButton>
      </Div>
    );
  }
}
export default MainPage;
