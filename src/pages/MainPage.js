import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  divIn: {
    marginButton: "300px"
  }
});
const Div = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  handleOnClick = () => {
    // some action...
    // then redirect
    this.setState({ redirect: true });
  };
  render() {
    const { classes } = this.props;
    if (this.state.redirect) {
      return <Redirect push to="/problemList" />;
    }
    return (
      <Div>
        <div className={classes.divIn}>
          <h1>Login</h1>
          <hr />
          <TextField
            placeholder="Enter your Username"
            label="Username"
            className={classes.textField}
            margin="normal"
          />
          <br />
          <TextField
            placeholder="Enter your Password"
            id="password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
          <br />
          <Button onClick={this.handleOnClick}>Login</Button>
        </div>
      </Div>
    );
  }
}
export default withStyles(styles)(MainPage);
