import React from "react";
import styled from "styled-components";
import Star from "../media/star.svg";
const DifficultyText = styled.div`
  position: absolute;
  font-size: 23px;
  color: #519cfe;
  top: 30%;
  left: 5%;
  transform: translate(-5%, -30%);
`;
const DifficultySelectCardBox = styled.div`
  position: relative;
  border-radius: 10px;
  border: 1.5px solid #e2e2e2;
  height: 17%;
  width: 85%;
  background: #ffffff;
  display: flex;
  box-shadow: 3px 3px 20px #aaaaaa;
  margin-top: ${props => {
    if (props.position === "top") return `20%`;
  }};
  margin-bottom: ${props => {
    if (props.position === "bottom") return `20%`;
  }};
`;
const Hr = styled.hr`
  position: absolute;
  background-color: #cccccc;
  height: 2px;
  border: 0;
  width: 90%;
  top: 45%;
  left: 45%;
  transform: translate(-45%, -45%);
`;
const StarDiv = styled.div`
  background-image: url(${Star});
  background-size: 20px 20px;
  width: ${props => {
    return `${props.difficulty * 20}px`;
  }};
  height: 20px;
  position: absolute;
  top: 25%;
  left: calc(
    87% -
      ${props => {
        return `${(props.difficulty - 1) * 20}px`;
      }}
  );
  transform: translate(
    calc(
      -87% + ${props => {
          return `${(props.difficulty - 1) * 20}px`;
        }}
    ),
    -25%;
  );
`;
const Percent = styled.div`
  white-space: pre-wrap;
  position: absolute;
  top: 80%;
  left: 6%;
  transform: translate(-6%, -80%);
  font-size: 10px;
  line-height: 15px;
`;
const DifficultySelectCard = props => {
  const {
    difficulty,
    difficultyStar,
    nowPercent,
    lastRecord,
    difficultyNum,
    OnClick
  } = props;
  return (
    <DifficultySelectCardBox
      position={props.position}
      onClick={() => {
        OnClick(difficultyNum);
      }}
    >
      <DifficultyText>{difficulty}</DifficultyText>
      <Hr />
      <StarDiv difficulty={difficultyStar} />
      <Percent>{`마지막 기록 ${lastRecord}
진행률 ${nowPercent}%`}</Percent>
    </DifficultySelectCardBox>
  );
};

export default DifficultySelectCard;
