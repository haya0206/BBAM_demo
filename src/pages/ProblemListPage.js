import React, { Component } from "react";
import styled from "styled-components";
import firstStep from "../media/2.svg";
import secondStep from "../media/1.svg";
import AppBar from "../components/MainAppBar";
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
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
    this.goBack = this.goBack.bind(this);
  }
  componentWillMount() {
    const id = this.getId();
    const number = parseInt(id.number, 10);
    const difficultyNum = parseInt(id.difficultyNum, 10);
    const problemNum = parseInt(id.problemNum, 10);
    this.setState({ number, difficultyNum, problemNum });
    if (difficultyNum !== 0) {
      const problemList = JSON.parse(
        sessionStorage.getItem(`problemList ${difficultyNum}`)
      );
      if (problemList !== null) {
        this.setState({ problemList });
      } else this.getProblemList(difficultyNum);
    }
    if (problemNum !== 0 && difficultyNum !== 0) {
      const problem = JSON.parse(sessionStorage.getItem(`${problemNum}`));
      if (problem !== null) {
        this.setState({
          problemNum,
          problemName: problem.PRB_NM,
          problemValue: problem.PRB_CNT
        });
      } else {
        this.getProblem(problemNum, problem.PRB_NM);
      }
    }
  }
  getId = () => {
    return this.props.match.params;
  };
  goBack = () => {
    this.props.history.push("/mainpage");
  };
  getProblemList = num => {
    const url = "https://bbam.study/getProblemList";
    axios
      .post(url, {
        diff: num
      })
      .then(response => {
        this.setState({ problemList: response.data });
        sessionStorage.setItem(
          `problemList ${num}`,
          JSON.stringify(response.data)
        );
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({ difficultyNum: num });
  };
  getProblem = (num, name) => {
    const url = "https://bbam.study/getProblem";
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    axios
      .post(url, {
        PID: num,
        UID: userInfo.id
      })
      .then(response => {
        this.setState({
          problemValue: response.data[0].PRB_CNT,
          problemName: name
        });
        sessionStorage.setItem(`${num}`, JSON.stringify(response.data[0]));
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
    if (this.state.number === 0) {
      const problemList = JSON.parse(sessionStorage.getItem("problemList"));
      if (problemList !== null) {
        this.setState({ problemList, difficultyNum: num });
      } else this.getProblemList(num);
    }
    if (this.state.number === 1) {
      const problem = JSON.parse(sessionStorage.getItem(`${num}`));
      if (problem !== null) {
        this.setState({
          problemNum: num,
          problemName: name,
          problemValue: problem.PRB_CNT
        });
      } else {
        this.getProblem(num, name);
      }
    }
    this.setState(prevState => ({
      number: prevState.number + 1
    }));
  };

  handleBack = () => {
    if (this.state.number === 0) {
      this.goBack();
    } else {
      this.setState(prevState => ({
        number: prevState.number - 1
      }));
    }
  };
  render() {
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
        <AppBar backArrow={true} handleBack={this.handleBack} />
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
      </div>
    );
  }
}
export default ProblemListPage;
