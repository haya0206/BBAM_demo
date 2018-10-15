import React, { Component } from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import EmptyAvatar from "../media/emptyAvatar.png";
import { observer } from "mobx-react";

const UserAvatar = styled(Avatar)`
  width: 40px !important;
  height: 40px !important;
  float: left;
  margin-left: 20px;
`;
const User = styled.div`
  position: relative;
  width: 100%;
  height: 5%;
  ${props => {
    if (props.last === true) return "margin-bottom: 15%";
  }};
`;
const UserList = styled.div`
  overflow: auto;
  margin-top: 10%;
`;
const UserCheck = styled.div`
  font-size: 13px;
  color: #b2b2b2;
  margin-left: 35%;
`;
const UserTitle = styled.div`
  font-size: 18px;
  color: #000000;
  margin-bottom: 3%;
  margin-left: 35%;
`;
const Hr = styled.hr`
  background-color: #cccccc;
  height: 1px;
  border: 0;
  width: 85%;
  margin-bottom: 5%;
`;
const List = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
`;
@observer
class UserListComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { store, handleOpen } = this.props;
    const userList = store.userList;
    return (
      <List>
        <UserList>
          {userList === null
            ? "asdf"
            : Object.keys(userList).map((key, index, list) => (
                <User
                  key={index}
                  last={index + 1 === list.length ? true : false}
                  onClick={() => {
                    handleOpen(userList[key], key);
                  }}
                >
                  <UserAvatar alt="Remy Sharp" src={EmptyAvatar} />
                  <UserTitle>{`${userList[key].name}`}</UserTitle>
                  <UserCheck>{`랭킹 ${userList[key].rank}위 승점 ${
                    userList[key].rating
                  }점`}</UserCheck>
                  <Hr />
                </User>
              ))}
        </UserList>
      </List>
    );
  }
}
export default UserListComponent;
