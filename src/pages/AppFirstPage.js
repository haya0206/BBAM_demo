import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import SwipeableViews from "react-swipeable-views";
import SolvePng from "./solve.png";
import FightPng from "./fight.png";
import FeedBackPng from "./feedback.png";
import ReactSVG from "react-svg";
import styled from "styled-components";
const tutorialSteps = [
  {
    title: "학습",
    label: "블록코딩을 이용하여 더욱 쉽고 재미있게 풀어보세요!",
    imgPath: SolvePng
  },
  {
    title: "대결",
    label: "다른 사용자와 대결하여 랭킹을 올려보세요!",
    imgPath: FightPng
  },
  {
    title: "피드백",
    label: "전문적인 피드백으로 취약점을 확실히 잡아보세요!",
    imgPath: FeedBackPng
  }
];
const Img = styled.img`
  transform: scale(0.25);
  align: center;
`;
const ImageDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const MobileStepperCenter = styled(MobileStepper)`
  margin-top: -150px;
  display: flex;
  justify-content: center !important;
  background: #ffffff !important;
`;
const Div = styled.div`
  height: 0vh;
  padding-left: 30px;
`;
const Title = styled.a`
  color: #231815;
  font-size: 30px;
  font-family: Youth;
  line-height: 40px;
`;
const Value = styled.a`
  width: 596px;
  height: 118px;
  color: #595757;
  font-family: Youth;
  font-size: 13px;
`;
const StartButton = styled.a`
  margin: 10px;
  font-family: Youth;
  font-size: 20px;
  padding: 15px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: #fff;
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
  top: 88%;
  left: 48%;
  transform: translate(-50%, -30%);
`;
class AppFirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      response: "",
      activeStep: 0
    };
  }

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };
  handleOnClick = () => {
    // some action...
    // then redirect
    this.setState({ redirect: true });
  };
  render() {
    const { activeStep } = this.state;

    const maxSteps = tutorialSteps.length;
    if (this.state.redirect) {
      return <Redirect push to="/main" />;
    }
    return (
      <div>
        <SwipeableViews
          index={this.state.activeStep}
          onChangeIndex={this.handleStepChange}
        >
          {tutorialSteps.map(step => (
            <div>
              <Div>
                <br />
                <br />
                <br />
                <Title>{step.title}</Title>
                <br />
                <Value>{step.label}</Value>
              </Div>
              <ImageDiv>
                <Img src={step.imgPath} />
              </ImageDiv>
            </div>
          ))}
        </SwipeableViews>
        <MobileStepperCenter
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
        />
        {activeStep === 2 ? (
          <StartButton onClick={this.handleOnClick}>시작하기</StartButton>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default AppFirstPage;
