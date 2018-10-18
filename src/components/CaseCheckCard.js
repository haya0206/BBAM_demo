import React, { Component } from "react";
import styled from "styled-components";
import CheckIcon from "../media/check.svg";
import ErrorIcon from "../media/error.svg";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Div = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100000;
  display: ${props => {
    if (props.visible === false) return "none";
    else return "block";
  }};
  background-color: white;
`;
const ChapterCardBox = styled.div`
  border-radius: 10px;
  border: 1.5px solid #e2e2e2;
  height: 10%;
  width: 60%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 3px 20px #e2e2e2;
  margin-top: 15%;
  margin-left: 5%;
`;
const ChapterCardText = styled.div`
  float: left;
  font-size: 30px;
  color: #519cfe;
  width: 54px;
  height: 1px;
`;
const ChapterCardText2 = styled.div`
  float: left;
  font-size: 17px;
  color: #519cfe;
  margin-top: 5%;
  margin-left: 3%;
`;
const ChapterCardText3 = styled.div`
  float: left;
  font-size: 15px;
  color: #000000;
  margin-top: 6%;
  margin-left: 5%;
`;
const ChapterCardTextBox = styled.div`
  height: 36px;
  width: 160px;
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
    if (props.yes) return "#519CFE";
    else return "#ff0000";
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
    else return `url(${ErrorIcon})`;
  }};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  float: left;
  margin-right: 5px;
`;
const Button = styled.div`
  text-decoration: none;
  width: 100px;
  height: 30px;
  border-radius: 15px;
  background-color: #519cfe;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonDiv = styled.div`
  position: absolute;
  background-color: white;
  height: 10%;
  width: 100%;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BackButton = styled.div`
  position: absolute;
  font-size: 20px;
  color: #e2e2e2;
`;
const List = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
`;
const HintModal = styled.div`
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
const TextFild = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
`;
const CircularProgressbarText = styled.div`
  display: flex;
  justify-content: center;
  width: 70px;
  font-size: 15px;
  color: #3e98c7;
`;
const CircularProgressbarCustom = styled(CircularProgressbar)`
  width: 70px !important;
  height: 70px;
`;
class CaseCheckCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      caseData: null
    };
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  handleOpen = caseData => {
    this.setState({ open: true, caseData: caseData });
  };
  render() {
    const {
      visible,
      caseList,
      difficultyNum,
      problemNum,
      onBackButton,
      submitData
    } = this.props;
    const difficulty = ["아무것도 업지롱", "초급", "중급", "고급"];
    const { caseData, open } = this.state;
    return (
      <Div visible={visible}>
        <BackButton onClick={onBackButton}>x</BackButton>
        <List>
          <ChapterCardBox>
            <ChapterCardTextBox>
              <ChapterCardText>{difficulty[difficultyNum]}</ChapterCardText>
              <ChapterCardText2>난이도</ChapterCardText2>
              <ChapterCardText3>{`${problemNum}`}</ChapterCardText3>
            </ChapterCardTextBox>
          </ChapterCardBox>
          <ProblemList>
            {caseList === null
              ? ""
              : caseList.map((id, index, list) => (
                  <Problem
                    last={index + 1 === list.length ? true : false}
                    key={index}
                    onClick={() => {
                      this.handleOpen(id);
                    }}
                  >
                    <ProblemTitle>{`Case ${index + 1}
                `}</ProblemTitle>

                    {id.crct === 1 ? (
                      <ProblemCheck yes>
                        <CheckIconDiv yes />
                        성공!
                      </ProblemCheck>
                    ) : (
                      <ProblemCheck>
                        <CheckIconDiv />
                        실패...
                      </ProblemCheck>
                    )}

                    <Hr />
                  </Problem>
                ))}
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
        </List>
        <div
          style={{
            position: "absolute",
            top: "85%",
            left: "50%",
            transform: "translate(-50%, -85%)"
          }}
        >
          {submitData === null || submitData.LENGTH === undefined ? (
            <div />
          ) : (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <CircularProgressbarText>Length</CircularProgressbarText>
              <CircularProgressbarText>Much</CircularProgressbarText>
              <CircularProgressbarText>Repeat</CircularProgressbarText>
              <CircularProgressbarText>Stop</CircularProgressbarText>
              <CircularProgressbarText>Time</CircularProgressbarText>
            </div>
          )}
          {submitData === null || submitData.LENGTH === undefined ? (
            <div />
          ) : (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <CircularProgressbarCustom
                initialAnimation={true}
                percentage={submitData.LENGTH * 6.666}
                text={`${submitData.LENGTH === 0 ? 0 : 100}점`}
              />
              <CircularProgressbarCustom
                initialAnimation={true}
                percentage={submitData.MUCH * 6.666}
                text={`${submitData.MUCH === 0 ? 0 : 100}점`}
              />
              <CircularProgressbarCustom
                initialAnimation={true}
                percentage={submitData.REPEAT * 5}
                text={`${submitData.REPEAT === 0 ? 0 : 100}점`}
              />
              <CircularProgressbarCustom
                bottom
                initialAnimation={true}
                percentage={submitData.STOP * 5}
                text={`${submitData.STOP === 0 ? 0 : 100}점`}
              />
              <CircularProgressbarCustom
                bottom
                initialAnimation={true}
                percentage={submitData.TIME * 3.333}
                text={`${submitData.TIME === 0 ? 0 : 100}점`}
              />
            </div>
          )}
        </div>
        <ButtonDiv>
          <Link
            style={{ textDecoration: "none" }}
            to={{ pathname: `/problemList/1/${difficultyNum}/0` }}
          >
            <Button>문제 목록</Button>
          </Link>
        </ButtonDiv>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{ zIndex: 100001 }}
          open={open}
          onClose={this.handleClose}
        >
          <HintModal>
            <div style={{ fontSize: "20px" }}>케이스 정보</div>
            {caseData !== null ? (
              <TextFild>
                <div>{`IN : ${
                  caseData.casein === null ? `없음` : `${caseData.casein}`
                }`}</div>
                <div>{`OUT: ${caseData.caseout}`}</div>
                <div>{`Result: ${caseData.result}`}</div>
              </TextFild>
            ) : (
              ``
            )}
          </HintModal>
        </Modal>
      </Div>
    );
  }
}
export default CaseCheckCard;
