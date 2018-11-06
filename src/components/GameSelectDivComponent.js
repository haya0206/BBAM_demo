import React, { Component } from "react";
import styled from "styled-components";
import friendsIcon from "../media/friends.svg";
import UserList from "./UserList";
import RankingList from "./RankingList";
const SelectDiv = styled.div`
  height: 70%;
`;
const SelectMenu = styled.div`
  height: 100%;
  width: 40%;
  float: left;
  background-color: rgb(81, 156, 254, 0.76);
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const ShowMenu = styled.div`
  height: 100%;
  width: 60%;
  float: right;
`;
const TopBar = styled.div`
  height: 8%;
  width: 100%;
`;
const TopIcon = styled.div`
  float: right;
  height: 100%;
  width: 19%;
  background-image: url(${friendsIcon});
  background-size: 50% 50%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;
const Button = styled.div`
  width: 80%;
  border-radius: 11px;
  height: 8%;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: ${props => {
    if (props.top) {
      return "50px";
    } else {
      return "20px";
    }
  }};
  ${props => {
    if (props.selected) {
      return `background-color: white;
  color: #3194ff;
  border: 1.5px solid #ffffff;`;
    } else {
      return `border: 1.5px solid #E5E5E5;color: #ffffff; `;
    }
  }};
`;
class GameSelectDivComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1
    };
  }
  onButton = selected => {
    console.log(selected);
    this.setState({ selected });
  };
  render() {
    const { selected } = this.state;
    const { handleOpen, store } = this.props;
    return (
      <SelectDiv>
        <SelectMenu>
          <Button
            top
            selected={selected === 1}
            onClick={() => {
              this.onButton(1);
            }}
          >
            대전상대
          </Button>
          <Button
            selected={selected === 2}
            onClick={() => {
              this.onButton(2);
            }}
          >
            랜덤대전
          </Button>
          <Button
            selected={selected === 3}
            onClick={() => {
              this.onButton(3);
            }}
          >
            나의랭킹
          </Button>
          <Button
            selected={selected === 4}
            onClick={() => {
              this.onButton(4);
            }}
          >
            대전기록
          </Button>
        </SelectMenu>
        <ShowMenu>
          <TopBar>
            <TopIcon />
          </TopBar>
          {(() => {
            switch (this.state.selected) {
              case 1:
                return <UserList store={store} handleOpen={handleOpen} />;
              case 3:
                return <RankingList />;
              default:
                null;
            }
          })()}
        </ShowMenu>
      </SelectDiv>
    );
  }
}
export default GameSelectDivComponent;
