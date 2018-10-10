import React, { Component } from "react";
import Blocks from "../components/Blocks";
import AppBar from "../components/ProblemListPageAppBar";
import ProblemCard from "../components/ProblemCard";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";
import { Provider } from "mobx-react";
import ObservableStore from "../mobx/Store";
import brace from "brace";
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
  background-color: #519cfe;
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
  bottom: 20px;
  left: 10px;
  z-index: 40;
`;
class SolvingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isChange: false,
      value: "",
      problemValue: "",
      problemHint: ""
    };
  }
  componentDidMount() {
    this.getProblem();
  }
  getProblem = () => {
    const url = "http://13.125.181.57:5000/problem";
    axios
      .post(url, {
        id: this.props.match.params.id
      })
      .then(response => {
        this.setState({
          problemValue: response.data[0].PRB_CNT,
          problemHint: response.data[0].PRB_HNT
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
  fromCode = () => {
    ObservableStore.workspace.clear();
    console.log(this.state.value);
    if (this.state.value === "") return;
    const xml = BBAMblocks.Python.revert(this.state.value);
    BBAMblocks.Xml.domToWorkspace(
      BBAMblocks.Xml.textToDom(xml),
      ObservableStore.workspace
    );
  };
  setValue = text => {
    this.setState({ value: text });
  };
  isChangeAction = () => {
    this.setState({ isChange: !this.state.isChange });
    ObservableStore.workspace.setVisible(this.state.isChange);
    this.state.isChange === false
      ? this.setValue(
          BBAMblocks.Python.workspaceToCode(ObservableStore.workspace)
        )
      : this.fromCode();
  };

  render() {
    const { classes } = this.props;
    const { problemHint, problemValue } = this.state;
    return (
      <Div>
        {/*
        <Provider store={ObservableStore}>
          <SimpleAppBar
            ida={this.props.match.params.id}
            history={this.props.history}
            OnClick={this.handleOpen}
            isChange={this.isChangeAction}
            nowChange={this.state.isChange}
          />
      </Provider>*/}
        <AppBar />
        <ProblemDiv>
          <ProblemCard value={problemValue} />
          <HintButton onClick={this.handleOpen}>힌트</HintButton>
        </ProblemDiv>
        <Provider store={ObservableStore}>
          <Blocks
            grow={1}
            nowChange={this.state.isChange}
            value={this.state.value}
            setValue={this.setValue}
            userName={"PSB"}
            problmeNum={this.props.match.params.id}
          />
        </Provider>
        <div
          className={cx({
            Text: !this.state.isChange
          })}
        >
          <Provider store={ObservableStore}>
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
      </Div>
    );
  }
}
export default SolvingPage;
