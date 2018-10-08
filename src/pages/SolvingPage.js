import React, { Component } from "react";
import Blocks from "../components/Blocks";
import AppBar from "../components/ProblemListPageAppBar";
import ProblemCard from "../components/ProblemCard";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Provider } from "mobx-react";
import ObservableStore from "../mobx/Store";
import brace from "brace";
import AceEditor from "react-ace";
import style from "./SolvingPage.css";
import classNames from "classnames/bind";
import BBAMblocks from "BBAM_Blocks";
import axios from "axios";
import "brace/mode/python";
import "brace/theme/monokai";
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
  top: 90%;
  left: 90%;
  border-radius: 2px;
  height: 3vh;
  width: 7vh;
  color: #fff;
  background-color: #519cfe;
  transform: translate(-90%, -90%);
`;
const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
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
          <HintButton>힌트</HintButton>
        </ProblemDiv>
        <Provider store={ObservableStore}>
          <Blocks
            grow={1}
            nowChange={this.state.isChange}
            value={this.state.value}
            setValue={this.setValue}
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
              theme="monokai"
              value={this.state.value}
              onChange={this.onChange}
              name="UNIQUE_ID_OF_DIV"
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              height="calc(85vh - 56px)"
              width="100%"
              editorProps={{ $blockScrolling: true }}
            />
          </Provider>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              {`문제${this.props.match.params.id}`}
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              {`문제${this.props.match.params.id}`}
            </Typography>
          </div>
        </Modal>
        <script type="text/javascript" src="../brython/brython.js" />
        <script type="text/javascript" src="../brython/brython_stdlib.js" />
      </Div>
    );
  }
}
export default withStyles(styles)(SolvingPage);
