import React, { Component } from "react";
import AppBar from "../components/MainAppBar";
import styled from "styled-components";
import SelectDiv from "../components/SelectDivComponent";
import Modal from "@material-ui/core/Modal";
import Avatar from "@material-ui/core/Avatar";
import EmptyAvatar from "../media/emptyAvatar.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";
const UserStatus = styled.div`
  height: 30%;
  border-bottom: 1.5px solid #e2e2e2;
`;
const Div = styled.div`
  position: relative;
  height: calc(100vh - 56px);
`;
const TextBox = styled.div`
  float: right;
  margin-right: 35px;
  margin-top: 40px;
  height: 130px;
  width: 140px;
`;
const Title = styled.div`
  float: left;
  font-size: 25px;
`;
const Level = styled.div`
  float: left;
  font-size: 18px;
  margin-left: 10px;
  margin-top: 5px;
  color: #3194ff;
  font-weight: 700;
`;
const Ranking = styled.div`
  margin-left: 5px;
  color: #636363;
  font-size: 16px;
  margin-top: 60px;
`;
const Rating = styled(Ranking)`
  margin-top: 5px;
`;
const ModalDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -45%);
  width: 80vw;
  height: 40vh;
  background-color: #fff;
  border-radius: 15px;
  &:focus {
    outline: none;
  }
`;
const UserRankRating = styled.div`
  font-size: 13px;
  color: #b2b2b2;
  float: left;
`;
const UserTitle = styled.div`
  font-size: 23px;
  color: #000000;
`;
const UserAvatar = styled(Avatar)`
  width: 60px !important;
  height: 60px !important;
  float: left;
`;
const Button = styled.div`
  width: 84px;
  border-radius: 11px;
  height: 30px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${props => {
    if (props.yes) {
      return `background-color: #519CFE;
  color: #ffffff;`;
    } else {
      return `border: 1.5px solid #519CFE;color: #519CFE; `;
    }
  }};
`;
const CenterAlignDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

class BattlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      user: null,
      isBattle: false,
      isAllowed: true,
      userInfo: null
    };
    this.goBack = this.goBack.bind(this);
    this.goTo = this.goTo.bind(this);
  }
  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.setState({ userInfo });
    this.props.list();
  }
  handleBack = () => {
    this.goBack();
  };
  handleTo = () => {
    this.goTo();
  };
  goBack = () => {
    this.props.history.push("/mainpage");
  };
  goTo = () => {
    this.props.history.push("/battleBlock");
  };
  handleOpen = (user, socketId) => {
    this.setState({ open: true, user: { ...user, socketId } });
  };
  handleClose = () => {
    this.setState({ open: false, isAllowed: true, isBattle: false });
  };
  handleBattle = () => {
    this.setState(state => ({ isBattle: !state.isBattle, isAllowed: true }));
    this.props.toBattle(this.state.user).then(({ bool, problemNum }) => {
      if (bool) {
        this.handleClose();
        this.props.history.push(
          `/battlepage/${this.props.store.roomId}/${problemNum}`
        );
      } else {
        this.setState({ isAllowed: false });
      }
    });
  };
  render() {
    const { user, isBattle, isAllowed, userInfo } = this.state;
    const { store } = this.props;
    return (
      <Div>
        <AppBar backArrow={true} handleBack={this.handleBack} />
        <UserStatus>
          <TextBox>
            <Title>{userInfo === null ? "Loading" : userInfo.name}</Title>
            <Level>
              LV.
              {userInfo === null ? "Loading" : userInfo.Level}
            </Level>
            <Ranking>
              랭킹 {userInfo === null ? "Loading" : userInfo.rank}위
            </Ranking>
            <Rating>
              승점 {userInfo === null ? "Loading" : userInfo.rating}
            </Rating>
          </TextBox>
        </UserStatus>
        <SelectDiv handleOpen={this.handleOpen} store={store} />>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          {isBattle === false ? (
            <ModalDiv>
              {user !== null ? (
                <CenterAlignDiv>
                  <UserAvatar alt="Remy Sharp" src={EmptyAvatar} />
                  <UserTitle>{`${user.name}`}</UserTitle>
                  <UserRankRating>{`랭킹 ${user.rank}위 승점 ${
                    user.rating
                  }점`}</UserRankRating>
                </CenterAlignDiv>
              ) : (
                ""
              )}
              <div>대전을 신청하시겠습니까?</div>
              <CenterAlignDiv
                style={{
                  marginTop: "40px",
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <Button onClick={this.handleBattle} yes>
                  네
                </Button>
                <Button onClick={this.handleClose}>아니요</Button>
              </CenterAlignDiv>
            </ModalDiv>
          ) : isAllowed === true ? (
            <ModalDiv>
              <div style={{ marginBottom: "20px" }}>수락 대기중...</div>
              <CircularProgress />
            </ModalDiv>
          ) : (
            <ModalDiv>
              <div style={{ marginBottom: "20px" }}>상대방이 거절했습니다</div>
            </ModalDiv>
          )}
        </Modal>
      </Div>
    );
  }
}
export default withRouter(BattlePage);
