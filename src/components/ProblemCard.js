import React from "react";
import styled from "styled-components";
const ProblemTextBox = styled.div`
  height: 80%;
  width: 90%;
  font-size: 15px;
  text-align: center;
  word-wrap: break-word;
  word-break: keep-all;
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
`;
const ProblemCard = props => {
  return (
    <ProblemCardBox>
      <ProblemTextBox>{props.value}</ProblemTextBox>
    </ProblemCardBox>
  );
};

export default ProblemCard;