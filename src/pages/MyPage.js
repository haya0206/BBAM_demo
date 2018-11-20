import React, { Component } from "react";
import { RadarChart } from "react-vis";
import styled, { injectGlobal } from "styled-components";
import AppBar from "../components/MainAppBar";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import red from "@material-ui/core/colors/red";
import EmptyAvatar from "../media/emptyAvatar.png";
import UserInfoList from "../components/UserInfoList";
import axios from "axios";
injectGlobal`
  .MuiTypography-body2-67{
    font-family: Youth !important;
  }
`;
const DATA = [
  {
    name: "Spider5",
    Time: 5,
    Length: 5,
    Repeat: 5,
    Stop: 5,
    Much: 5,
    fill: "white",
    stroke: "#cccccc"
  },
  {
    name: "Spider4",
    Time: 4,
    Length: 4,
    Repeat: 4,
    Stop: 4,
    Much: 4,
    fill: "white",
    stroke: "white"
  },
  {
    name: "Spider3",
    Time: 3,
    Length: 3,
    Repeat: 3,
    Stop: 3,
    Much: 3,
    fill: "white",
    stroke: "white"
  },
  {
    name: "Spider2",
    Time: 2,
    Length: 2,
    Repeat: 2,
    Stop: 2,
    Much: 2,
    fill: "white",
    stroke: "white"
  },
  {
    name: "Spider1",
    Time: 1,
    Length: 1,
    Repeat: 1,
    Stop: 1,
    Much: 1,
    fill: "white",
    stroke: "white"
  },
  {
    name: "Spider0",
    Time: 0.1,
    Length: 0.1,
    Repeat: 0.1,
    Stop: 0.1,
    Much: 0.1,
    fill: "white",
    stroke: "white"
  }
];
const CenterAlignDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const myDate = new Date();
const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "thursday",
  "Friday",
  "Saturday"
];
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const list = {
  rank: 123,
  submit: 2234,
  yes: 1223,
  no: 1232
};
class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "Mercedes",
        Time: 0,
        Length: 0,
        Repeat: 0,
        Stop: 0,
        Much: 0,
        fill: "rgba(194,145,254,0.5)",
        stroke: "rgba(194,145,254,0.2)"
      },
      ranking: "",
      submit: "",
      yes: "",
      no: "",
      userInfo: {
        name: ""
      }
    };
    this.goBack = this.goBack.bind(this);
  }
  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.setState({ userInfo });
    const url = "https://bbam.study/feedback";
    axios
      .post(url, {
        ID: userInfo.id
      })
      .then(response => {
        console.log(response);
        let yes = 0,
          no = 0;
        for (var i = 0; i < response.data.submitList.length; i++) {
          if (response.data.submitList[i].UP_CRCT === 1) {
            yes++;
          } else {
            no++;
          }
        }
        this.setState({
          data: {
            name: "Mercedes",
            Time: ((response.data.TIME / response.data._TIME) * 100) / 20,
            Length: ((response.data.LENGTH / response.data._LENGTH) * 100) / 20,
            Repeat: ((response.data.REPEAT / response.data._REPEAT) * 100) / 20,
            Stop: ((response.data.STOP / response.data._STOP) * 100) / 20,
            Much: ((response.data.MUCH / response.data._MUCH) * 100) / 20,
            fill: "rgba(194,145,254,0.5)",
            stroke: "rgba(194,145,254,0.2)"
          },
          ranking: response.data.ranking.split("/")[0],
          submit: response.data.submitList.length,
          yes: yes,
          no: no
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  goBack = () => {
    this.props.history.push("/mainpage");
  };
  handleBack = () => {
    this.goBack();
  };
  render() {
    const { data, ranking, submit, yes, no, userInfo } = this.state;
    return (
      <div>
        <AppBar backArrow={true} handleBack={this.handleBack} />
        <CardHeader
          avatar={<Avatar alt="Remy Sharp" src={EmptyAvatar} />}
          title={userInfo.name}
          subheader={`${day[myDate.getDay()]}, ${
            month[myDate.getMonth()]
          } ${myDate.getDate()}`}
        />
        <CenterAlignDiv>
          <RadarChart
            data={[...DATA, data]}
            tickFormat={t => {
              return "";
            }}
            domains={[
              {
                name: "Time",
                domain: [0, 5]
              },
              {
                name: "Length",
                domain: [0, 5],
                getValue: d => d.Length
              },
              { name: "Repeat", domain: [0, 5], getValue: d => d.Repeat },
              { name: "Stop", domain: [0, 5], getValue: d => d.Stop },
              { name: "Much", domain: [0, 5], getValue: d => d.Much }
            ]}
            width={250}
            height={250}
            style={{
              polygons: {
                strokeWidth: 1,
                strokeOpacity: 0.8,
                fillOpacity: 0.8
              },
              labels: {
                textAnchor: "middle",
                fontSize: "15px"
              },
              axes: {
                line: {
                  fillOpacity: 0.8,
                  strokeWidth: 0.5,
                  strokeOpacity: 0.8
                },
                ticks: {
                  fillOpacity: 0,
                  strokeOpacity: 0
                },
                text: {}
              }
            }}
            margin={{ left: 50, right: 50, top: 50, bottom: 50 }}
            animation
            colorRange={["transparent"]}
            hideInnerMostValues={false}
            renderAxesOverPolygons={true}
          />
          <UserInfoList list={[ranking, submit, yes, no]} />
        </CenterAlignDiv>
      </div>
    );
  }
}
export default MyPage;
