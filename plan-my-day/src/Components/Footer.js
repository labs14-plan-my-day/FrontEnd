import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import "typeface-roboto";

const useStyles = makeStyles(theme => ({
  footerMainContainer: {
    top: "auto",
    bottom: 0,
    left: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    maxWidth: "120px",
    width: "100%",
    padding: ".5rem",
    backgroundColor: "white",
    color: "black",
    borderRadius: "5px",
    "&:hover": {
      cursor: "pointer",
      color: "#512DA8",
      "& $helpIcon": {
        color: "#512DA8"
      },
      "& $helpText": {
        color: "#512DA8"
      }
    }
  },
  helpIcon: {
    color: "grey"
  },
  link: {
    color: "black",
    "&:hover": {
      textDecoration: "none",
      cursor: "pointer",
      color: "#512DA8"
    }
  },
  helpText: {
    color: "grey",
    fontSize: "14px",
    fontWeight: 300
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    // <Tabs className={classes.footerMainContainer}>
    //   <Tab>
    //     Need to report a problem?{" "}
    //     <a href="mailto:slackplanmyday@gmail.com">Contact us</a>
    //   </Tab>
    // </Tabs>
    <Link
      href="mailto:slackplanmyday@gmail.com"
      variant="body2"
      className={classes.link}
    >
      <AppBar position="fixed" className={classes.footerMainContainer}>
        <Icon className={classes.helpIcon}>error</Icon>
        <Typography className={classes.helpText} variant="body2">
          {"Contact Us"}
        </Typography>
      </AppBar>
    </Link>
  );
}