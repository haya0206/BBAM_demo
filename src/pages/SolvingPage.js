import React, { Component } from "react";
import Blocks from "../components/Blocks";
import AppBar from "../components/MainAppBar";
import ProblemCard from "../components/ProblemCard";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";
import { Provider, observer } from "mobx-react";
import AceEditor from "react-ace";
import style from "./SolvingPage.css";
import classNames from "classnames/bind";
import BBAMblocks from "BBAM_Blocks";
import ChangeIcon from "../media/change.svg";
import axios from "axios";
import "brace/mode/python";
import "brace/theme/github";
import "brace/snippets/python";
import "brace/ext/language_tools";
import CaseCheckCard from "../components/CaseCheckCard";
import { Link } from "react-router-dom";
const cx = classNames.bind(style);
const Div = styled.div`
  flex-grow: 1;
  position: relative;
`;
const ProblemDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 15vh;
`;
const HintButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 12px;
  top: 90%;
  left: 85%;
  border-radius: 2px;
  height: 3vh;
  width: 7vh;
  color: #fff;
  background-color: ${props => {
    if (props.stop) {
      return "#808080";
    } else {
      return "#519cfe";
    }
  }};
  transform: translate(-85%, -90%);
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
const HintText = styled.div`
  width: 90%;
  text-align: center;
  word-wrap: break-word;
  word-break: keep-all;
  color: #595959;
`;
const ChangeButton = styled.div`
  background-image: url(${ChangeIcon});
  height: 30px;
  width: 30px;
  position: absolute;
  bottom: 60px;
  left: 10px;
  z-index: 40;
`;
const ToMainButton = styled.div`
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
const SubmitButton = styled.div`
  height: 25px;
  width: 51px;
  position: absolute;
  bottom: 20px;
  left: 1px;
  z-index: 40;
  border-radius: 15px;
  background-color: #519cfe;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 15px;
  color: white;
`;
const SolveDiv = styled.div`
  position: relative;
  height: calc(100vh - 56px);
`;
@observer
class SolvingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isChange: false,
      value: "",
      problemValue: "",
      problemHint: "",
      caseCardvisible: false,
      problemCaseOut: "",
      problemCaseIn: "",
      problemXml: "",
      problemDiff: "",
      caseList: [],
      winModalOpen: false,
      win: null,
      submitData: null
    };
  }
  componentDidMount() {
    const problem = JSON.parse(
      sessionStorage.getItem(`${this.props.match.params.id}`)
    );
    if (problem !== null) {
      this.setState({
        problemValue: problem.PRB_CNT,
        problemHint: problem.PRB_HNT,
        problemCaseIn: problem.PRB_IN,
        problemCaseOut: problem.PRB_OUT,
        problemXml: problem.PRB_XML,
        problemDiff: problem.PRB_DIFF
      });
    } else {
      this.getProblem();
    }
    const { type, startBattle } = this.props;
    if (type !== undefined) {
      startBattle().then(() => {
        this.setState({ winModalOpen: true, win: false });
      });
    }
  }

  postSubmit = submitInfo => {
    const url = "https://bbam.study/submit";
    console.log(submitInfo);
    axios
      .post(url, {
        PID: submitInfo.PID,
        crct: submitInfo.crct,
        xml: submitInfo.xml,
        UID: submitInfo.UID,
        time: submitInfo.time,
        stop: submitInfo.stop,
        much: submitInfo.much
      })
      .then(response => {
        this.setState({ submitData: response.data });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getProblem = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const url = "https://bbam.study/getProblem";
    axios
      .post(url, {
        PID: this.props.match.params.id,
        UID: userInfo.id
      })
      .then(response => {
        this.setState({
          problemValue: response.data[0].PRB_CNT,
          problemHint: response.data[0].PRB_HNT,
          problemCaseIn: response.data[0].PRB_IN,
          problemCaseOut: response.data[0].PRB_OUT,
          problemXml: response.data[0].PRB_XML,
          problemDiff: response.data[0].PRB_DIFF,
          problemPreXml: response.data[1].UP_XML
        });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = newValue => {
    this.setState({ value: newValue });
  };

  inputPapa = (paCode, paInput) => {
    console.log(paInput);
    if (paInput === null) return paCode;
    let ret = paCode;
    let paInputArr = paInput.split(/\s/gm);
    for (let i = 0; i < paInputArr.length; i++)
      ret = ret.replace(/input\(\)/, paInputArr[i]);
    return ret;
  };

  onBackButton = () => {
    this.setState(prevState => ({
      caseCardvisible: !prevState.caseCardvisible
    }));
  };

  callBrython = (cbCode, cbTimeout) => {
    window.isDone = false;

    let cc = cbCode;
    cc = cc.replace(
      /;[\s]*\n/g,
      ";\nif(performance.now() - SUPER_MEGA_TICK_TIMER > " +
        cbTimeout +
        ") return;\n"
    );
    cc = cc.replace(
      /{[\s]*\n/g,
      "{\nif(performance.now() - SUPER_MEGA_TICK_TIMER > " +
        cbTimeout +
        ") return;\n"
    );
    cc = "let SUPER_MEGA_TICK_TIMER = performance.now();" + cc;
    cc =
      "(function(){" +
      cc +
      "if(performance.now() - SUPER_MEGA_TICK_TIMER > " +
      cbTimeout +
      ") return; isDone=true;}());";
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = cc;

    document.body.appendChild(script);

    if (!window.isDone) return false;

    return true;
  };

  handleSubmit = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { store } = this.props;
    BBAMblocks.WidgetDiv.hide(true);
    let code = this.getCode();
    code = this.inputPapa(code, this.state.problemCaseIn[0]);
    const getCode = window.__BRYTHON__
      .py2js(code, "__main__", "__main__")
      .to_js();

    console.logs.length = 0;
    let result = "",
      time = 0;
    const startTime = new Date();
    if (this.callBrython(getCode, 2000)) {
      const endTime = new Date();
      time = endTime - startTime;
      result = Array.prototype.slice.call(console.logs).join("");
    } else {
      result = "시간초과!";
      time = 2000;
    }
    const xmlText = new XMLSerializer().serializeToString(
      BBAMblocks.Xml.workspaceToDom(store.workspace)
    );
    let submitInfo = null;
    if (result === this.state.problemCaseOut[0] && time < 2000) {
      submitInfo = [
        {
          UID: userInfo.id,
          PID: parseInt(this.props.match.params.id, 10),
          crct: 1,
          xml: xmlText,
          time: time,
          stop: store.stop,
          much: store.much,
          result: result,
          casein: this.state.problemCaseIn,
          caseout: this.state.problemCaseOut
        }
      ];
    } else {
      submitInfo = [
        {
          UID: userInfo.id,
          PID: parseInt(this.props.match.params.id, 10),
          crct: 0,
          xml: xmlText,
          time: time,
          stop: store.stop,
          much: store.much,
          result: result,
          casein: this.state.problemCaseIn,
          caseout: this.state.problemCaseOut
        }
      ];
    }
    if (this.props.type === "battle" && submitInfo[0].crct === 1) {
      const { store } = this.props;
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.props.success(store.roomId).then(() => {
        const url = "https://bbam.study/endGame";
        axios
          .post(url, {
            winner: userInfo.id,
            loser: store.anotherUser.id
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
        this.setState({ winModalOpen: true, win: true });
      });
    } else if (this.props.type === "battle" && submitInfo[0].crct === 0) {
      this.setState(prevState => ({
        caseCardvisible: !prevState.caseCardvisible,
        caseList: submitInfo
      }));
    } else {
      this.setState(prevState => ({
        caseCardvisible: !prevState.caseCardvisible
      }));
      this.postSubmit(submitInfo[0]);
      this.setState({
        caseList: submitInfo
      });
    }
  };

  fromCode = () => {
    const { store } = this.props;
    store.workspace.clear();
    console.log(this.state.value);
    if (this.state.value === "") return;
    const xml = BBAMblocks.Python.rebert(this.state.value);
    this.xmlToWorkspace(xml);
  };

  xmlToWorkspace = xml => {
    const { store } = this.props;
    BBAMblocks.Xml.domToWorkspace(
      BBAMblocks.Xml.textToDom(xml),
      store.workspace
    );
  };

  setValue = text => {
    this.setState({ value: text });
  };

  getCode = () => {
    const { store } = this.props;
    if (this.state.isChange === true) {
      return this.state.value;
    }
    return BBAMblocks.Python.workspaceToCode(store.workspace);
  };

  isChangeAction = () => {
    const { store } = this.props;
    this.setState({ isChange: !this.state.isChange });
    store.workspace.setVisible(this.state.isChange);
    this.state.isChange === false
      ? this.setValue(this.getCode())
      : this.fromCode();
  };

  handleMuchModalClose = () => {
    this.props.store.muchModalOpen = false;
  };

  render() {
    const {
      problemHint,
      problemValue,
      caseCardvisible,
      problemXml,
      problemDiff,
      caseList,
      problemPreXml,
      win,
      submitData
    } = this.state;
    const { store, type } = this.props;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return (
      <Div>
        {/*
        <Provider store={store}>
          <SimpleAppBar
            ida={this.props.match.params.id}
            history={this.props.history}
            OnClick={this.handleOpen}
            isChange={this.isChangeAction}
            nowChange={this.state.isChange}
          />
      </Provider>*/}
        <AppBar
          backArrow={true}
          link={
            type === "battle"
              ? `/mainpage`
              : `/problemList/2/${problemDiff}/${this.props.match.params.id}`
          }
        />
        <SolveDiv>
          <CaseCheckCard
            difficultyNum={problemDiff}
            caseList={caseList}
            visible={caseCardvisible}
            onBackButton={this.onBackButton}
            problemNum={this.props.match.params.id}
            submitData={submitData}
          />
          <ProblemDiv>
            <ProblemCard value={problemValue} />
            {store.stop === 1 ? (
              <HintButton onClick={this.handleOpen}>힌트</HintButton>
            ) : (
              <HintButton stop>힌트</HintButton>
            )}
          </ProblemDiv>
          {problemXml === "" ? (
            <div>loading...</div>
          ) : (
            <Provider store={store}>
              <Blocks
                grow={1}
                nowChange={this.state.isChange}
                value={this.state.value}
                setValue={this.setValue}
                id={this.props.match.params.id}
                name={userInfo.id}
                xml={problemXml}
                preXml={problemPreXml}
                type={type}
                height="85vh"
              />
            </Provider>
          )}
          <div
            className={cx({
              Text: !this.state.isChange
            })}
          >
            <Provider store={store}>
              <AceEditor
                mode="python"
                theme="github"
                value={this.state.value}
                onChange={this.onChange}
                name="UNIQUE_ID_OF_DIV"
                showPrintMargin={true}
                showGutter={false}
                highlightActiveLine={true}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2
                }}
                height="calc(85vh - 56px)"
                width="100%"
                editorProps={{ $blockScrolling: true }}
              />
            </Provider>
          </div>
        </SolveDiv>
        <SubmitButton onClick={this.handleSubmit}>제출</SubmitButton>
        <ChangeButton onClick={this.isChangeAction} />
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <HintModal>
            <HintText>{problemHint}</HintText>
          </HintModal>
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.winModalOpen}
        >
          {win === null ? (
            <div />
          ) : win === true ? (
            <HintModal>
              <div style={{ fontSize: "30px" }}>승리!</div>
              <Link
                style={{ textDecoration: "none", marginTop: "50px" }}
                to={{ pathname: `/mainpage` }}
              >
                <ToMainButton>목록으로</ToMainButton>
              </Link>
            </HintModal>
          ) : (
            <HintModal>
              <div style={{ fontSize: "30px" }}>패배..</div>
              <Link
                style={{ textDecoration: "none", marginTop: "50px" }}
                to={{ pathname: `/mainpage` }}
              >
                <ToMainButton>목록으로</ToMainButton>
              </Link>
            </HintModal>
          )}
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={store.muchModalOpen}
          onClose={this.handleMuchModalClose}
        >
          <HintModal>
            <div style={{ fontSize: "20px" }}>너무 많이 움직입니다!</div>
            <ToMainButton
              style={{ marginTop: "50px" }}
              onClick={this.handleMuchModalClose}
            >
              돌아가기
            </ToMainButton>
          </HintModal>
        </Modal>
      </Div>
    );
  }
}
export default SolvingPage;
