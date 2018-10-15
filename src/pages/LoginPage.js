import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import logo from "../media/logo.svg";
import axios from "axios";
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
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
  width: 300px;
  height: 206px;
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
const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
`;
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      response: "",
      id: "",
      password: "",
      re: false
    };
  }
  componentDidMount() {
    /*const data = localStorage.getItem("userInfo");
    if (data !== null) {
      this.setState({ redirect: true });
    }*/
  }
  handleOnClick = () => {
    // some action...
    // then redirect
    /*const url = "https://bbam.tk/getProblem";
    axios
      .post(url, {
        PID: this.props.match.params.id,
        UID: "PSB"
      })
      .then(response => {
        this.setState({
          problemValue: response.data[0].PRB_CNT,
          problemHint: response.data[0].PRB_HNT,
          problemCaseIn: response.data[0].PRB_IN,
          problemCaseOut: response.data[0].PRB_OUT,
          problemXml: response.data[0].PRB_XML,
          problemDiff: response.data[0].PRB_DIFF
        });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });*/
    const url = "https://bbam.tk/login";
    axios
      .post(url, {
        ID: this.state.id,
        PW: this.state.password
      })
      .then(response => {
        localStorage.setItem(
          `userInfo`,
          JSON.stringify({ id: this.state.id, name: this.state.id })
        );
        console.log(response);
        this.setState({ redirect: true });
      })
      .catch(error => {
        this.setState({ re: true });
        console.log(error);
      });
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
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
          <Text>
            <TextField
              value={this.state.id}
              onChange={this.handleChange("id")}
              placeholder="Enter your Username"
              label="Username"
              className={classes.textField}
              margin="normal"
              fullWidth
            />
            <TextField
              fullWidth
              value={this.state.password}
              onChange={this.handleChange("password")}
              placeholder="Enter your Password"
              id="password-input"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
          </Text>
          {this.state.re === false ? (
            <div />
          ) : (
            <div style={{ color: "#ff1616" }}>
              아이디 또는 비밀번호를 다시 확인하세요.
            </div>
          )}
        </LoginCard>
        <LoginButton onClick={this.handleOnClick}>로그인</LoginButton>
      </Div>
    );
  }
}
export default withStyles(styles)(LoginPage);
