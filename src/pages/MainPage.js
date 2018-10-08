import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import styled, { injectGlobal } from "styled-components";
import AppBar from "../components/MainPageAppBar";
import Avatar from "@material-ui/core/Avatar";
import EmptyAvatar from "../media/emptyAvatar.png";
import solveIcon from "../media/solveIcon.svg";
import sandboxIcon from "../media/sandboxIcon.svg";
import peopleIcon from "../media/peopleIcon.svg";
import fightIcon from "../media/fightIcon.svg";
injectGlobal`
  body{
    position: fixed; 
    overflow-y: scroll;
    width: 100%;
  }
`;
const MainTopGradient = styled.div`
  z-index: -1;
  width: 100vw;
  height: 40vh;
  background: linear-gradient(270deg, #c291fe, #519cfe);
  background-size: 400% 400%;

  -webkit-animation: AnimationName 8s ease infinite;
  -moz-animation: AnimationName 8s ease infinite;
  animation: AnimationName 8s ease infinite;

  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 51%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 51%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 51%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 51%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 51%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 51%;
    }
  }
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
`;
const MainAppBar = styled(AppBar)`
  z-index: 1;
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
const MainItemSquere = styled.div`
  position: relative;
  float: left;
  width: calc(50vw - 1.5px);
  height: 30vh;
  border: 1.5px solid #e2e2e2;
  ${props => {
    if (props.TopLeft) {
      return `border-left: none; border-top: none; background-image: url(${solveIcon})`;
    }
    if (props.TopRight) {
      return `border-right: none; border-top: none; background-image: url(${sandboxIcon})`;
    }
    if (props.BottomLeft) {
      return `border-left: none; border-bottom: none; background-image: url(${peopleIcon})`;
    }
    if (props.BottomRight) {
      return `border-right: none; border-bottom: none; background-image: url(${fightIcon})`;
    } else return ``;
  }};
  background-size: 50% 50%;
  background-repeat: no-repeat;
  background-position: 50% 40%;
`;
const MainItemText = styled.div`
  font-family: Youth;
  font-size: 15px;
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -90%);
`;
const Div = styled.div`
  height: 100vh;
`;
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      url: ""
    };
  }
  handleOnClick = url => {
    // some action...
    // then redirect
    this.setState({ redirect: true, url: url });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.url} />;
    }
    return (
      <Div>
        <MainTopGradient />
        <div
          style={{
            width: "100vw",
            height: "40vh"
          }}
        >
          <MainAppBar />
          <MainAvatar alt="Remy Sharp" src={EmptyAvatar} />
          <TextFiled>
            <Name>empty</Name>
            <Level>LV.0</Level>
          </TextFiled>
        </div>
        <div
          styled={{
            width: "100vw",
            height: "60vh"
          }}
        >
          <MainItemSquere
            TopLeft
            onClick={() => {
              this.handleOnClick("/problemList");
            }}
          >
            <MainItemText>문제풀이</MainItemText>
          </MainItemSquere>
          <MainItemSquere TopRight>
            <MainItemText>샌드박스</MainItemText>
          </MainItemSquere>
          <MainItemSquere BottomLeft style={{ clear: "left" }}>
            <MainItemText>커뮤니티</MainItemText>
          </MainItemSquere>
          <MainItemSquere BottomRight>
            <MainItemText>전국대전</MainItemText>
          </MainItemSquere>
        </div>
      </Div>
    );
  }
}
export default MainPage;
