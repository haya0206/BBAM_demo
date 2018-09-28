import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "../pages/MenuBlack.svg";
import InfoIcon from "../pages/infoBlack.svg";
import styled, { injectGlobal } from "styled-components";
const styles = {
  grow: {
    flexGrow: 1,
    textAlign: "center",
    fontFamily: "Youth",
    fontSize: "25px",
    marginTop: 4,
    fontWeight: "bold"
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
  flexgrow: 1;
`;
const MenuIconDiv = styled.div`
  background-image: url(${MenuIcon});
  height: 19.5px;
  width: 26px;
`;
const InfoIconDiv = styled.div`
  background-image: url(${InfoIcon});
  height: 23px;
  width: 23px;
`;
class MenuAppBar extends React.Component {
  render() {
    const { classes } = this.props;

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
            <Typography variant="title" color="Black" className={classes.grow}>
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
