import React, { Component } from "react";
import Blocks from "../components/Blocks/Blocks";
import SimpleAppBar from "../components/SimpleAppBar/SimpleAppBar";
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
import "brace/mode/python";
import "brace/theme/monokai";
const cx = classNames.bind(style);
const Div = styled.div`
  flex-grow: 1;
  position: relative;
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
      value: ""
    };
  }
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
    return (
      <Div>
        <Provider store={ObservableStore}>
          <SimpleAppBar
            ida={this.props.match.params.id}
            history={this.props.history}
            OnClick={this.handleOpen}
            isChange={this.isChangeAction}
            nowChange={this.state.isChange}
          />
        </Provider>
        <div>
          <Provider store={ObservableStore}>
            <Blocks
              grow={1}
              nowChange={this.state.isChange}
              value={this.state.value}
              setValue={this.setValue}
            />
          </Provider>
        </div>
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
              height="calc(100vh - 56px)"
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
      </Div>
    );
  }
}
export default withStyles(styles)(SolvingPage);
