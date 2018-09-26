import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import styled from "styled-components";

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
const TextBox = styled.div`
  display: table-cell;
  vertical-align: middle;
`;
const MainTypography = styled(Typography)``;
class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

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
              <MenuIcon />
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
            >
              <AccountCircle />
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
