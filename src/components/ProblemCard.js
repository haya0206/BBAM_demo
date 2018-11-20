import React from "react";
import styled from "styled-components";
const ProblemTextBox = styled.span`
  width: 90%;
  padding-top: 10px;
  padding-bottom: 15px;
  font-size: 15px;
  text-align: center;
  word-wrap: break-word;
  word-break: keep-all;
  color: #595959;
  overflow: scroll;
`;
const ProblemCardBox = styled.div`
  border-radius: 10px;
  border: 1.5px solid #e2e2e2;
  height: 70%;
  width: 90%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 5px 5px 20px #aaaaaa;
  font-size: 20px;
  white-space: pre-wrap;
`;
const ProblemCard = props => {
  return (
    <ProblemCardBox>
      <ProblemTextBox>{props.value}</ProblemTextBox>
    </ProblemCardBox>
  );
};

export default ProblemCard;
