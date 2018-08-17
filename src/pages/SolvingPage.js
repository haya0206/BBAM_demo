import React, { Component } from "react";
import Blocks from "../components/Blocks/Blocks";
import SimpleAppBar from "../components/SimpleAppBar/SimpleAppBar";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
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
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Div>
        <SimpleAppBar
          ida={this.props.match.params.id}
          history={this.props.history}
          OnClick={this.handleOpen}
        />
        <Blocks grow={1} />
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
