import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "../media/Menu.svg";
import InfoIcon from "../media/info.svg";
import LogoutIcon from "../media/logout.png";
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
  background-image: url(${LogoutIcon});
  height: 19.5px;
  width: 26px;
`;
const InfoIconDiv = styled.div`
  background-image: url(${InfoIcon});
  height: 23px;
  width: 22.5px;
`;
class MenuAppBar extends React.Component {
  render() {
    const { classes, goTo } = this.props;

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
              <MenuIconDiv />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              BBAM
            </Typography>
            <IconButton
              className={classes.accountButton}
              color="inherit"
              aria-label="Menu"
              onClick={() => {
                goTo("mypage");
              }}
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
