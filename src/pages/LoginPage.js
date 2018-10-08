import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import styled, { injectGlobal } from "styled-components";
import logo from "../media/logo.svg";
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
  button: {
    margin: theme.spacing.unit
  },
  menu: {
    width: 200
  }
});
const Div = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(to bottom, #519cfe, #8da1fe, #c291fe 60%);
`;
const LogoSvg = styled.div`
  height: 50vh;
  width: 100vw;
  background-image: url(${logo});
  background-size: 30% 30%;
  background-repeat: no-repeat;
  background-position: 48% 50%;
`;
const LoginCard = styled.div`
  border-radius: 25px;
  width: 80%;
  height: 31%;
  background: #ffffff;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -70%);
  box-shadow: 5px 5px 20px #aaaaaa;
`;
const BottomCard = styled.div`
  background: #ffffff;
  height: 50vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;
const LoginButton = styled.a`
  margin: 10px;
  font-size: 20px;
  padding: 15px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: #f7f7f7;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  width: 200px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  display: inline-block;
  border-radius: 25px;
  background-image: linear-gradient(
    to right,
    #519cfe 0%,
    #c395fa 51%,
    #519cfe 100%
  );
  &:active {
    background-position: right center;
  }
  position: absolute;
  top: 83%;
  left: 48%;
  transform: translate(-48%, -83%);
`;
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      response: ""
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
      return <Redirect push to="/appfirst" />;
    }
    return (
      <Div>
        <LogoSvg />
        <BottomCard />
        <LoginCard>
          <TextField
            placeholder="Enter your Username"
            label="Username"
            className={classes.textField}
            margin="normal"
            fullWidth
          />
          <TextField
            fullWidth
            placeholder="Enter your Password"
            id="password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
          <br />
          <br />
        </LoginCard>
        <LoginButton onClick={this.handleOnClick}>로그인</LoginButton>
      </Div>
    );
  }
}
export default withStyles(styles)(LoginPage);
