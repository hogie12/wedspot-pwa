import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  items: {
    fontSize: "1.3rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    cursor: "pointer",
  },
}));

export function Sort({ change }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div onClick={handleClick}>
        <p className={classes.items}>Sort</p>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div onClick={handleClose}>
          <MenuItem
            onClick={() => {
              change("content");
            }}
          >
            content
          </MenuItem>
          <MenuItem
            onClick={() => {
              change("content2");
            }}
          >
            content 2
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
}

export function Filter({ change }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div onClick={handleClick}>
        <p className={classes.items}>Filter</p>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div onClick={handleClose}>
          <MenuItem
            onClick={() => {
              change("content");
            }}
          >
            content
          </MenuItem>
          <MenuItem
            onClick={() => {
              change("content2");
            }}
          >
            content 2
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
}
