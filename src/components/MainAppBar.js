import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowIcon from "../media/arrow_back.svg";
import MenuIcon from "../media/MenuBlack.svg";
import InfoIcon from "../media/infoBlack.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";
const styles = {
  grow: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "25px",
    fontWeight: "bolder",
    color: "#595959",
    fontFamily: "Youth"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  accountButton: {
    marginRight: -12,
    marginLeft: 20
  }
};
const Root = styled.div`
  flex-grow: 1;
`;
const MenuIconDiv = styled.div`
  background-image: ${props => {
    if (props.backArrow === true) return `url(${ArrowIcon}) `;
    else return `url(${MenuIcon})`;
  }};
  height: ${props => {
    if (props.backArrow === true) return `37.5px`;
    else return `19.5px`;
  }};
  width: ${props => {
    if (props.backArrow === true) return `35px`;
    else return `26px`;
  }};
`;
const InfoIconDiv = styled.div`
  height: 23px;
  width: 22.5px;
`;
class MenuAppBar extends React.Component {
  render() {
    const { classes, backArrow, link, handleBack } = this.props;

    return (
      <Root>
        <AppBar
          position="static"
          style={{ background: "transparent", boxShadow: "none" }}
        >
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              {link === undefined ? (
                <MenuIconDiv backArrow={backArrow} onClick={handleBack} />
              ) : (
                <Link to={{ pathname: `${link}` }}>
                  <MenuIconDiv backArrow={backArrow} />
                </Link>
              )}
            </IconButton>
            <Typography variant="title" className={classes.grow}>
              BBAM
            </Typography>
            <IconButton
              className={classes.accountButton}
              color="inherit"
              aria-label="Menu"
            >
              <InfoIconDiv />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Root>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuAppBar);
