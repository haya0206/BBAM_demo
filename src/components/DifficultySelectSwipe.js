import React from "react";
import styled from "styled-components";
import DifficultySelectCard from "./DifficultySelectCard.js";
const Div = styled.div`
  height: calc(100vh - (56px + 72px));
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;
const DifficultySelectSwipe = props => {
  const { nowPercent, lastRecord, handleNext } = props;
  return (
    <Div>
      <DifficultySelectCard
        position="top"
        difficulty="초급"
        difficultyStar="1"
        nowPercent={nowPercent[0]}
        lastRecord={lastRecord[0]}
        OnClick={handleNext}
        difficultyNum={1}
      />
      <DifficultySelectCard
        position="middle"
        difficulty="중급"
        difficultyStar="2"
        nowPercent={nowPercent[1]}
        lastRecord={lastRecord[1]}
        OnClick={handleNext}
        difficultyNum={2}
      />
      <DifficultySelectCard
        position="bottom"
        difficulty="고급"
        difficultyStar="4"
        nowPercent={nowPercent[2]}
        lastRecord={lastRecord[2]}
        OnClick={handleNext}
        difficultyNum={3}
      />
    </Div>
  );
};

export default DifficultySelectSwipe;
