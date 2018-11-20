import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Div = styled.div`
  position: relative;
  height: calc(100vh - (56px + 72px));
`;
const Card = styled.div`
  position: absolute;
  border-radius: 25px;
  border: 1.5px solid #e2e2e2;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 85%;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 3px 3px 20px #e2e2e2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const CardTitle = styled.div`
  position: absolute;
  top: 112%;
  left: 50%;
  background-color: #519cfe;
  border-radius: 10px;
  width: 58%;
  height: 45px;
  transform: translate(-50%, -112%);
  font-weight: 700;
  font-size: 25px;
  color: #ffffff;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const TextBox = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const DiffText = styled.div`
  font-size: 23px;
  color: #519cfe;
  margin-bottom: 10px;
`;
const ChepterText = styled.div`
  font-size: 15px;
  color: #595959;
`;
const ProblemText = styled.span`
  width: 90%;
  word-wrap: break-word;
  word-break: keep-all;
  color: #595959;
  font-size: 20px;
  line-height: 30px;
  white-space: pre-wrap;
  text-align: center;
  overflow: scroll;
`;
const ProblemSwipe = props => {
  const { problemNum, problemValue, problemName, difficultyNum } = props;
  const difficulty = ["아무것도 업지롱", "초급", "중급", "고급"];
  return (
    <Div>
      <TextBox>
        <DiffText>{difficulty[difficultyNum]}</DiffText>
        <ChepterText>{problemName}</ChepterText>
      </TextBox>
      <Card>
        <ProblemText>{problemValue}</ProblemText>
        <Link to={{ pathname: `/problem/${problemNum}` }}>
          <CardTitle>풀러가기</CardTitle>
        </Link>
      </Card>
    </Div>
  );
};
export default ProblemSwipe;
