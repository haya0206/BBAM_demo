import React, { Component } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
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
const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
`;
class LoginCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      response: "",
      id: "",
      password: "",
      re: false
    };
    this.goTo = this.goTo.bind(this);
  }
  componentDidMount() {
    /*const data = localStorage.getItem("userInfo");
        if (data !== null) {
          this.setState({ redirect: true });
        }*/
  }
  handleOnClick = () => {
    const url = "https://bbam.study/login";
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
        this.goTo();
      })
      .catch(error => {
        this.setState({ re: true });
        console.log(error);
      });
  };
  goTo = () => {
    this.props.history.push("/appfirst");
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <LoginCard>
        <Text>
          <TextField
            value={this.state.id}
            onChange={this.handleChange("id")}
            placeholder="Enter your Username"
            label="Username"
            style={{ width: 200 }}
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
            style={{ width: 200 }}
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
    );
  }
}
export default LoginCardComponent;
