import React from "react";
import styled from "styled-components";
import CheckIcon from "../media/check.svg";
const Div = styled.div`
  height: calc(100vh - (56px + 72px));
`;
const ChapterCardBox = styled.div`
  border-radius: 10px;
  border: 1.5px solid #e2e2e2;
  height: 10%;
  width: 40%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 3px 20px #e2e2e2;
  margin-top: 15%;
  margin-left: 5%;
`;
const ChapterCardText = styled.div`
  font-size: 30px;
  color: #519cfe;
  width: 54px;
  height: 0px;
`;
const ChapterCardText2 = styled.div`
  float: right;
  font-size: 17px;
  color: #519cfe;
  margin-top: 13%;
`;
const ChapterCardTextBox = styled.div`
  height: 36px;
  width: 105px;
`;
const Problem = styled.div`
  position: relative;
  width: 100%;
  height: 5%;
  ${props => {
    if (props.last === true) return "margin-bottom: 15%";
  }};
`;
const ProblemList = styled.div`
  overflow: auto;
  margin-top: 10%;
`;
const ProblemTitle = styled.div`
  font-size: 20px;
  color: #000000;
  margin-left: 9%;
  margin-bottom: 3%;
`;
const ProblemCheck = styled.div`
  font-size: 13px;
  color: ${props => {
    if (props.yes) return "#6e6e6e";
    else return "#519CFE";
  }};
  margin-left: 14%;
`;
const Hr = styled.hr`
  background-color: #cccccc;
  height: 1px;
  border: 0;
  width: 85%;
  margin-bottom: 5%;
`;
const CheckIconDiv = styled.div`
  width: 17px;
  height: 17px;
  background-image: ${props => {
    if (props.yes) return `url(${CheckIcon})`;
    else return "";
  }};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  float: left;
  margin-right: 5px;
`;
const ChapterSelectSwipe = props => {
  const { difficultyNum, problemList, handleNext } = props;
  const difficulty = ["아무것도 업지롱", "초급", "중급", "고급"];
  return (
    <Div>
      <ChapterCardBox>
        <ChapterCardTextBox>
          <ChapterCardText>{difficulty[difficultyNum]}</ChapterCardText>
          <ChapterCardText2>난이도</ChapterCardText2>
        </ChapterCardTextBox>
      </ChapterCardBox>
      <ProblemList>
        {problemList === null
          ? ""
          : problemList.map((id, index, list) =>
              id === null ? (
                ""
              ) : (
                <Problem
                  onClick={() => {
                    handleNext(id.PRB_ID, id.PRB_NM);
                  }}
                  key={index}
                  last={index + 1 === list.length ? true : false}
                >
                  <ProblemTitle>{`${id.PRB_NM}`}</ProblemTitle>
                  <ProblemCheck>
                    <CheckIconDiv />
                    문제풀이 가능
                  </ProblemCheck>
                  <Hr />
                </Problem>
              )
            )}
        {/*<Link style={{ textDecoration: "none" }} to="/textTest">
          <Problem>
            <ProblemTitle>챕터 1</ProblemTitle>
            <ProblemCheck yes>
              <CheckIconDiv yes />
              문제풀이 완료
            </ProblemCheck>
            <Hr />
          </Problem>
        </Link>*/}
      </ProblemList>
    </Div>
  );
};
export default ChapterSelectSwipe;
