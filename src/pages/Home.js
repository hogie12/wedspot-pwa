import { Grid } from "@material-ui/core";
import React from "react";
import SignUp from "../components/Login";

const Home = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <img
          src="https://images.unsplash.com/photo-1609151162377-794faf68b02f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=560&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MjkyMDk1NjQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=600"
          height="100%"
          width="100%"
          justifyContent="center"
          alt="Logo"
        />
      </Grid>
      <Grid item xs={6}>
        <SignUp />
      </Grid>
    </Grid>
  );
};

export default Home;
