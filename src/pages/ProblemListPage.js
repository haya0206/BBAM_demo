import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled, { injectGlobal } from "styled-components";
import firstStep from "./2.svg";
import secondStep from "./1.svg";
import AppBar from "../components/ProbelmListPageAppBar";
injectGlobal`
body {
  padding: 0px;
}
`;
const StepperList = styled.div`
  width: 100vw;
  margin: 0;
  padding: 0;
  list-style-type: none;

  display: flex;
  justify-content: space-between;
`;
const StepperListItem = styled.div`
  padding: 3px 5px;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
  flex-direction: column;
  flex: 1;
`;
const Activ = styled.div`
  background-image: ${props => {
    if (props.none) return `url(${firstStep})`;
    else return `url(${secondStep})`;
  }};
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: ${props => {
    if (props.none) return "30px 30px";
    else return "45px 45px";
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
  font-family: Youth;
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
  font-family: Youth;
  font-weight: 400;
`;
class ProblemListPage extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <div>
          <div>
            <StepperList>
              <StepperListItem>
                <Activ> 1 </Activ>
                <AvtivTitle>난이도 선택</AvtivTitle>
              </StepperListItem>
              <StepperListItem>
                <Activ none> 2 </Activ>
                <AvtivTitle none>챕터 고르기</AvtivTitle>
              </StepperListItem>
              <StepperListItem>
                <Activ none> 3 </Activ>
                <AvtivTitle none>문제 풀기</AvtivTitle>
              </StepperListItem>
            </StepperList>
          </div>
        </div>
        <ul>
          <li>
            <Link to="/problem/1">문제1</Link>
          </li>
          <li>
            <Link to="/problem/2">문제2</Link>
          </li>
          <li>
            <Link to="/problem/3">문제3</Link>
          </li>
          <li>
            <Link to="/problem/4">문제4</Link>
          </li>
          <li>
            <Link to="/problem/5">문제5</Link>
          </li>
          <li>
            <Link to="/problem/6">문제6</Link>
          </li>
          <li>
            <Link to="/textTest">로딩 테스트</Link>
          </li>
        </ul>
      </div>
    );
  }
}
export default ProblemListPage;
