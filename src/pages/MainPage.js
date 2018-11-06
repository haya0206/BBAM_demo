import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import styled from "styled-components";
import AppBar from "../components/MainPageAppBar";
import Avatar from "@material-ui/core/Avatar";
import EmptyAvatar from "../media/emptyAvatar.png";
import solveIcon from "../media/solveIcon.svg";
import sandboxIcon from "../media/sandboxIcon.svg";
import peopleIcon from "../media/peopleIcon.svg";
import fightIcon from "../media/fightIcon.svg";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import { observer } from "mobx-react";
const MainTopGradient = styled.div`
  z-index: -1;
  width: 100vw;
  height: 40vh;
  background: linear-gradient(270deg, #c291fe, #519cfe);
  background-size: 400% 400%;

  -webkit-animation: AnimationName 8s ease infinite;
  -moz-animation: AnimationName 8s ease infinite;
  animation: AnimationName 8s ease infinite;

  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 51%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 51%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 51%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 51%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 51%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 51%;
    }
  }
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
`;
const MainAppBar = styled(AppBar)`
  z-index: 1;
`;
const MainAvatar = styled(Avatar)`
  margin-left: 20px;
  width: 130px !important;
  height: 130px !important;
`;
const TextFiled = styled.div`
  float: left;
  margin-left: 170px;
  margin-top: -120px;
`;
const Name = styled.p`
  color: #000000;
  font-size: 25px;
  font-weight: 400;
  line-height: 20px;
`;
const Level = styled.p`
  color: #636363;
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
`;
const MainItemSquere = styled.div`
  position: relative;
  float: left;
  width: calc(50vw - 1.5px);
  height: 30vh;
  border: 1.5px solid #e2e2e2;
  ${props => {
    if (props.TopLeft) {
      return `border-left: none; border-top: none; background-image: url(${solveIcon})`;
    }
    if (props.TopRight) {
      return `border-right: none; border-top: none; background-image: url(${sandboxIcon})`;
    }
    if (props.BottomLeft) {
      return `border-left: none; border-bottom: none; background-image: url(${peopleIcon})`;
    }
    if (props.BottomRight) {
      return `border-right: none; border-bottom: none; background-image: url(${fightIcon})`;
    } else return ``;
  }};
  background-size: 50% 50%;
  background-repeat: no-repeat;
  background-position: 50% 40%;
`;
const MainItemText = styled.div`
  font-size: 15px;
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -90%);
`;
const Div = styled.div`
  height: 100vh;
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
@observer
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      url: "",
      user: null
    };
    this.goTo = this.goTo.bind(this);
  }
  componentWillMount() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const url = "https://bbam.study/mainPage";
    axios
      .post(url, {
        ID: userInfo.id
      })
      .then(response => {
        const user = {
          ...userInfo,
          level: response.data[0].GM_LV,
          exp: response.data[0].GM_EXP,
          rating: response.data[0].GM_RTN,
          rank: 1
        };
        console.log(user);
        localStorage.setItem(`userInfo`, JSON.stringify(user));
        this.props
          .login({ id: user.id, name: user.name, rating: user.rating, rank: 1 })
          .then(problemNum => {
            this.props.history.push(
              `/battlepage/${this.props.store.roomId}/${problemNum}`
            );
          });
        this.setState({ user });

        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    //socket.emit("userConnect", { id: userInfo.id, name: userInfo.name });
  }
  handleOnClick = url => {
    // some action...
    // then redirect
    this.goTo(url);
  };
  goTo = url => {
    this.props.history.push(`${url}`);
  };
  handleClose = () => {
    this.props.toInvite(this.props.store.inviteUser, false);
  };
  handleBattle = () => {
    this.props.toInvite(this.props.store.inviteUser, true);
  };
  render() {
    const { store } = this.props;
    const { user } = this.state;
    return (
      <Div>
        <MainTopGradient />
        <div
          style={{
            width: "100vw",
            height: "40vh"
          }}
        >
          <MainAppBar goTo={this.goTo} />
          <MainAvatar alt="Remy Sharp" src={EmptyAvatar} />
          <TextFiled>
            <Name>{user === null ? "Loading" : user.name}</Name>
            <Level>
              LV.
              {user === null ? "Loading" : user.level}
            </Level>
            <Level>
              EXP:
              {user === null ? "Loading" : ` ${user.exp}`}
            </Level>
          </TextFiled>
        </div>
        <div
          styled={{
            width: "100vw",
            height: "60vh"
          }}
        >
          <MainItemSquere
            TopLeft
            onClick={() => {
              this.handleOnClick("/problemList/0/0/0");
            }}
          >
            <MainItemText>문제풀이</MainItemText>
          </MainItemSquere>
          <MainItemSquere
            TopRight
            onClick={() => {
              this.handleOnClick("/sandbox");
            }}
          >
            <MainItemText>샌드박스</MainItemText>
          </MainItemSquere>
          <MainItemSquere BottomLeft style={{ clear: "left" }}>
            <MainItemText>커뮤니티</MainItemText>
          </MainItemSquere>
          <MainItemSquere
            BottomRight
            onClick={() => {
              this.handleOnClick("/battle");
            }}
          >
            <MainItemText>전국대전</MainItemText>
          </MainItemSquere>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={store.isInviting}
          onClose={this.handleClose}
        >
          <ModalDiv>
            {store.inviteUser !== null ? (
              <CenterAlignDiv>
                <UserAvatar alt="Remy Sharp" src={EmptyAvatar} />
                <UserTitle>{`${store.inviteUser.name}`}</UserTitle>
                {/* <UserRankRating>{`랭킹 ${user.inviteUser.rank}위 승점 ${
                  user.inviteUser.rating
                }점`}</UserRankRating> */}
              </CenterAlignDiv>
            ) : (
              ""
            )}
            <div>대전을 수락하시겠습니까?</div>
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
        </Modal>
      </Div>
    );
  }
}
export default withRouter(MainPage);
