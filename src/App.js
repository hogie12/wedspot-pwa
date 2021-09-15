import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";
import Routers from "./routers/router";
import { getVendor } from "./store/action/auth";
import { getLocation, getVenue, getOrganizer } from "./store/action/config";


const theme = createTheme({
  palette: {
    primary: {
      main: "#455437",
    },
    secondary: {
      main: "#C97C68",
    },
  },
});

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVendor())
    dispatch(getVenue())
    dispatch(getLocation())
    dispatch(getOrganizer())
  }, [dispatch]);
  
  return (
    <ThemeProvider theme={theme} className="App">
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
