import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import firstStep from "../media/2.svg";
import secondStep from "../media/1.svg";
import AppBar from "../components/ProblemListPageAppBar";
import axios from "axios";
import SwipeableViews from "react-swipeable-views";
import DifficultySelectSwipe from "../components/DifficultySelectSwipe";
import ChaterSelectSwipe from "../components/ChapterSelectSwipe";
import ProblemSwipe from "../components/ProblemSwipe";
const StepperList = styled.div`
  width: 100vw;
  margin: 0;
  padding: 0;
  list-style-type: none;
  position: relative;
  display: flex;
  justify-content: space-between;
`;
const StepperListItem = styled.div`
  width: 100px;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Activ = styled.div`
  background-image: ${props => {
    if (props.none) return `url(${firstStep})`;
    else return `url(${secondStep})`;
  }};
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: ${props => {
    if (props.none) return "25px 25px";
    else return "37px 37px";
  }};
  font-size: ${props => {
    if (props.none) return "10px";
    else return "20px";
  }};
  width: 55px;
  height: 55px;
  color: ${props => {
    if (props.none) return "rgba(255, 255, 255, 0.61)";
    else return "#fff";
  }};
  line-height: 56px;
  display: block;
  text-align: center;
`;
const AvtivTitle = styled.span`
  color: ${props => {
    if (props.none) return "#c291fe";
    else return "#a15fff";
  }};
  font-size: ${props => {
    if (props.none) return "10px";
    else return "15px";
  }};
  font-weight: 400;
`;
const Bar = styled.hr`
  position: absolute;
  width: 20%;
  height: 8px;
  ${props => {
    if (props.left)
      return "top: 27%; left: 26%; transform: translate(-29%, -27%);";
    else return "top: 27%; left: 75%; transform: translate(-75%, -27%);";
  }};
  background-image: linear-gradient(to left, #519cfe, #8da1fe, #c291fe 60%);
  border: 0;
  height: 2px;
`;
class ProblemListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problemList: null,
      number: 0,
      difficultyNum: 0,
      problemNum: 0,
      problemValue: "",
      problemName: ""
    };
  }
  getProblemList = num => {
    const url = "http://13.125.181.57:5000/problemList";
    axios
      .post(url, {
        diff: num
      })
      .then(response => {
        this.setState({ problemList: response.data });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({ difficultyNum: num });
  };
  getProblem = (num, name) => {
    const url = "http://13.125.181.57:5000/problem";
    const { problemNum } = this.state;
    axios
      .post(url, {
        id: num
      })
      .then(response => {
        this.setState({
          problemValue: response.data[0].PRB_CNT
        });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({ problemNum: num, problemName: name });
  };
  handleStepChange = number => {
    this.setState({ number });
  };
  handleNext = (num, name = "") => {
    this.setState(prevState => ({
      number: prevState.number + 1
    }));
    if (this.state.number === 0) {
      this.getProblemList(num);
    }
    if (this.state.number === 1) {
      this.getProblem(num, name);
    }
  };

  handleBack = () => {
    this.setState(prevState => ({
      number: prevState.number - 1
    }));
  };
  render() {
    /*const problemList = this.state.problemList.map(id => (
      <li>
        <Link to={{ pathname: `/problem/${id.PRB_ID}` }} />
      </li>
    ));*/
    const {
      number,
      difficultyNum,
      problemList,
      problemValue,
      problemNum,
      problemName
    } = this.state;
    const nowPercent = [0, 0, 0];
    const lastRecord = [0, 0, 0];
    return (
      <div>
        <AppBar />
        <div>
          <StepperList>
            <StepperListItem left>
              <Activ none={number === 0 ? false : true}> 1 </Activ>
              <AvtivTitle none={number === 0 ? false : true}>
                난이도 선택
              </AvtivTitle>
            </StepperListItem>
            <Bar left />
            <StepperListItem>
              <Activ none={number === 1 ? false : true}> 2 </Activ>
              <AvtivTitle none={number === 1 ? false : true}>
                챕터 고르기
              </AvtivTitle>
            </StepperListItem>
            <Bar />
            <StepperListItem right>
              <Activ none={number === 2 ? false : true}> 3 </Activ>
              <AvtivTitle none={number === 2 ? false : true}>
                문제 풀기
              </AvtivTitle>
            </StepperListItem>
          </StepperList>
        </div>
        <SwipeableViews
          index={this.state.number}
          onChangeIndex={this.handleStepChange}
          disabled={true}
        >
          <DifficultySelectSwipe
            nowPercent={nowPercent}
            lastRecord={lastRecord}
            handleNext={this.handleNext}
          />
          <ChaterSelectSwipe
            difficultyNum={difficultyNum}
            problemList={problemList}
            handleNext={this.handleNext}
          />
          <ProblemSwipe
            difficultyNum={difficultyNum}
            problemName={problemName}
            problemValue={problemValue}
            problemNum={problemNum}
          />
        </SwipeableViews>
        {/*
        <ul>
          {this.state.problemList === null
            ? ""
            : this.state.problemList.map((id, index) => (
                <li>
                  <Link to={{ pathname: `/problem/${id.PRB_ID}` }}>
                    {index + 1}
                  </Link>
                </li>
              ))}
          <li>
            <Link to="/textTest">로딩 테스트</Link>
          </li>
        </ul>
            */}
      </div>
    );
  }
}
export default ProblemListPage;
