import React from "react";
import { Dialog, Button, makeStyles, Container } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  close: {
    position: "absolute",
    zIndex: "1",
    right: "7%",
    top: "2%",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    margin: "1em",
    height: "55px",
    paddingTop: "10px",
  },
  flex: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "10px",
  },
  box: {
    padding: "45px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    color: "#80848D",
    fontSize: "14px",
    textAlign: "center",
  },
  title: {
    fontFamily: "Cormorant",
    fontSize: "28px",
  },
}));

export default function FirstModal({ show, close }) {
  const classes = useStyles();
  return (
    <Dialog open={show} onClose={close}>
      <div className={classes.box}>
        <img
          src="https://images.unsplash.com/photo-1609151162377-794faf68b02f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MjkyMDk1NjQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=450"
          height="300px"
          width="450px"
          justifyContent="center"
          alt="Logo"
        />
        <Container>
          <div className={classes.flex}>
            <h3 className={classes.title}>Welcome to Wedspot!</h3>
            <p className={classes.text}>
              First thing first, you have to tell customers of what you’re
              doing. And tell us the details
            </p>
          </div>
          <Link to="/edit">
            <Button
              onClick={close}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Fill in my details
            </Button>
          </Link>
        </Container>
      </div>
    </Dialog>
  );
}
