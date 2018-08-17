import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function SimpleAppBar(props) {
  const { classes, history, OnClick } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => {
              history.goBack();
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {`${props.ida}`}
          </Typography>
          <Button onClick={OnClick} color="inherit">
            문제보기
          </Button>
          <Button color="inherit">제출</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  ida: PropTypes.string
};

export default withStyles(styles)(SimpleAppBar);
