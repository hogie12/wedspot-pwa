import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import {
  Avatar,
  FormControlLabel,
  FormGroup,
  Menu,
  MenuItem,
  Switch,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import FirstModal from "./firstModal";
import QuotationsRouters from "./quotations/routes";
import PackageRoutes from "./package/packageRoutes";
import { Link } from "react-router-dom";
import StoreRoutes from "./mystore/storeRoutes";

const useStylesNav = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#F3F3F3",
    height: "inherit",
    minHeight: "100vh",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#455437",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -99 - drawerWidth,
    marginRight: 12,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: -99,
  },
}));

export default function Sidebar() {
  const classesNav = useStylesNav();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openNav = Boolean(anchorEl);
  const { data } = useSelector((state) => state.vendorData);
  // console.log(data);
  const [firstModal, setFirstModal] = useState(!data.vendor_has_filled_info);
  // console.log(firstModal);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("My Store");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <div className={classes.root}>
      <FirstModal show={firstModal} close={() => setFirstModal(false)} />
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      <CssBaseline />
      <AppBar
        style={{ background: "#f3f3f3" }}
        position="fixed"
        className={clsx(classesNav.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            style={{ color: "#0F120D" }}
            className={clsx(classesNav.menuButton, open && classesNav.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classesNav.title}
            style={{ color: "#0F120D" }}
          >
            {page}
          </Typography>
          {/* <div className={classesNav.sectionDesktop}>
            <IconButton
              aria-label="show 17 new notifications"
              // color="#0F120D"
            >
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </div> */}
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                // color="#0F120D"
              >
                <h4 style={{ paddingTop: "1rem", paddingRight: "0.5rem" }}>
                  {data.vendor_name}
                </h4>
                <Avatar alt={data.vendor_name} src={data.vendor_avatar} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openNav}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText>Sign Out</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <svg
              width="157"
              height="45"
              viewBox="0 0 157 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.262 32.5068H20.6651L15.6748 18.4759L10.2653 32.5068H8.66843L2.73995 16.3227C2.60386 15.9166 2.35045 15.5594 2.01136 15.2956C1.77735 15.1003 1.51487 14.9413 1.23288 14.8243C1.04325 14.7648 0.639032 14.6556 0.0102539 14.4968V13.0977H8.66843V14.4968C8.44168 14.5798 8.20139 14.6202 7.95981 14.6159C7.66947 14.6198 7.38216 14.6752 7.11146 14.7797C6.99998 14.8308 6.90319 14.9089 6.82996 15.0068C6.75672 15.1048 6.70938 15.2194 6.69227 15.3403C6.71111 15.6775 6.77315 16.011 6.87691 16.3326L10.6346 27.2923L15.9942 13.1225H17.5961L22.6313 27.2923L27.0028 16.3475C27.1284 16.039 27.2123 15.7153 27.2523 15.3849V15.3353C27.2523 14.8987 26.5287 14.6209 25.0865 14.4919V13.0928H31.7187V14.4919C30.1816 14.6209 29.1936 15.2262 28.7544 16.3177L22.262 32.5068Z"
                fill="white"
              />
              <path
                d="M51.2054 22.0784H37.7765C37.7765 28.1908 39.7842 31.2471 43.7998 31.2471C46.1286 31.2471 48.1363 30.0613 49.8231 27.6897L51.1854 28.4389C49.2425 31.4951 46.5461 33.0233 43.0961 33.0233C40.2051 33.0233 37.8763 32.0789 36.1097 30.1903C34.3431 28.3016 33.4665 25.9086 33.4798 23.0111C33.41 20.3148 34.3187 17.6836 36.0399 15.5988C37.7532 13.5547 40.0521 12.5326 42.9364 12.5326C44.0998 12.4882 45.2567 12.7245 46.3082 13.2213C47.3597 13.7181 48.2746 14.4606 48.9747 15.3854C50.4648 17.2979 51.252 19.6597 51.2054 22.0784ZM47.0185 20.4411C47.0185 20.4113 47.0185 20.3369 47.0435 20.2278C47.0488 20.1419 47.0488 20.0557 47.0435 19.9698C47.0435 16.1693 45.5996 14.2675 42.7119 14.2642C42.0059 14.2239 41.3017 14.3691 40.6701 14.6853C40.0385 15.0014 39.5018 15.4773 39.1139 16.0651C38.2805 17.3752 37.8328 18.8911 37.8214 20.4411H47.0185Z"
                fill="white"
              />
              <path
                d="M70.7128 15.3406V6.49937C70.7128 4.03851 69.6615 2.79154 67.5589 2.75846V1.30974C69.9343 0.999869 72.2914 0.564298 74.6202 0.00488281V27.3224C74.6202 29.7833 75.6864 31.0302 77.819 31.0633V32.512C76.1223 32.512 74.2243 32.5898 72.125 32.7452C71.7997 32.1478 71.577 31.5005 71.4663 30.8301C69.1375 32.2921 66.8786 33.0247 64.6895 33.028C63.362 33.0755 62.04 32.8366 60.8142 32.3279C59.5884 31.8192 58.4879 31.0526 57.5883 30.081C55.7529 28.0792 54.7739 25.4454 54.8586 22.7381C54.8586 19.8042 55.6903 17.3715 57.3537 15.4398C59.0172 13.5082 61.3077 12.5407 64.2254 12.5374C67.0466 12.5341 69.209 13.4685 70.7128 15.3406ZM70.7128 27.5953V18.0098C69.7679 15.7607 67.7718 14.6377 64.7244 14.641C63.7271 14.6138 62.7441 14.8814 61.8999 15.4101C61.1169 15.9245 60.5027 16.6559 60.1333 17.5137C59.7527 18.3762 59.4763 19.2805 59.3099 20.2078C59.15 21.1653 59.0715 22.1346 59.0754 23.1052C59.035 25.0721 59.5316 27.013 60.5126 28.7215C60.9513 29.4992 61.6004 30.1392 62.3863 30.5689C63.1722 30.9986 64.0634 31.2008 64.959 31.1526C67.4142 31.1526 69.3321 29.9668 70.7128 27.5953Z"
                fill="white"
              />
              <path
                d="M92.166 13.0986V19.5038H91.0831C90.8005 18.1343 90.1778 16.8568 89.2716 15.7877C88.8612 15.2855 88.3407 14.8832 87.75 14.6115C87.1593 14.3397 86.514 14.2058 85.8632 14.2199C85.5034 14.2085 85.1448 14.269 84.8089 14.3976C84.4729 14.5263 84.1662 14.7206 83.907 14.9691C83.6543 15.217 83.456 15.5143 83.3246 15.8422C83.1932 16.1701 83.1315 16.5215 83.1435 16.8743C83.1538 17.2653 83.2519 17.6492 83.4306 17.9977C83.6094 18.3462 83.8642 18.6506 84.1765 18.8886C84.9269 19.5163 85.768 20.0281 86.6717 20.4068C87.6464 20.8302 88.6262 21.2982 89.6109 21.8109C90.5942 22.3226 91.454 23.0403 92.1311 23.9145C92.8262 24.8209 93.1905 25.9354 93.164 27.0749C93.1989 27.8619 93.0751 28.6478 92.8 29.3865C92.5249 30.1252 92.1041 30.8018 91.5621 31.3765C91.01 31.9268 90.3485 32.3567 89.6198 32.6386C88.8912 32.9205 88.1115 33.0483 87.3304 33.0137C85.3378 33.0181 83.4189 32.2656 81.9658 30.9101L81.1674 32.4977H80.0396V25.8048H81.1474C81.301 27.2614 81.9486 28.6227 82.9838 29.6648C83.4757 30.1727 84.0678 30.5741 84.723 30.8439C85.3782 31.1136 86.0824 31.246 86.7914 31.2326C87.6467 31.2503 88.4808 30.9675 89.1468 30.4338C89.4682 30.1861 89.726 29.8665 89.8995 29.5009C90.0729 29.1353 90.157 28.7342 90.1449 28.3302C90.1405 27.9076 90.0456 27.4909 89.8666 27.1077C89.6877 26.7244 89.4287 26.3835 89.1069 26.1074C88.3667 25.435 87.5247 24.8825 86.6118 24.4702C85.637 24.0203 84.6639 23.5374 83.6925 23.0215C82.7278 22.512 81.8786 21.8112 81.1973 20.9625C80.5129 20.1211 80.1473 19.0676 80.1643 17.9856C80.0965 16.5265 80.6112 15.0999 81.5965 14.0165C82.1026 13.5118 82.7098 13.1184 83.3786 12.862C84.0475 12.6056 84.7631 12.4918 85.479 12.5281C87.2056 12.5281 88.7742 13.2772 90.1848 14.7756L91.0781 13.0937L92.166 13.0986Z"
                fill="white"
              />
              <path
                d="M102.376 30.8703V39.8008C102.376 41.2892 102.676 42.2815 103.269 42.7777C103.863 43.2738 104.931 43.5318 106.468 43.5963V44.9954H95.3198V43.5467C96.5075 43.5169 97.3159 43.1944 97.815 42.5891C98.314 41.9838 98.4937 41.0511 98.4937 39.8057V19.2705C98.4937 16.8394 97.444 15.5759 95.3448 15.48V14.0808C97.52 13.792 99.6726 13.3543 101.787 12.771C102.236 13.5856 102.448 14.5079 102.401 15.4353C103.196 14.5281 104.18 13.8032 105.285 13.3107C106.389 12.8181 107.588 12.5697 108.799 12.5825C111.527 12.5825 113.689 13.5566 115.286 15.5048C116.906 17.5085 117.757 20.0197 117.686 22.5897C117.755 25.2531 116.89 27.8574 115.241 29.9574C113.611 32.0015 111.384 33.0235 108.559 33.0235C106.304 33.0759 104.106 32.3105 102.376 30.8703ZM102.376 28.722C103.682 30.1401 105.483 31.0096 107.411 31.1531C108.077 31.1717 108.74 31.0545 109.359 30.8088C109.978 30.5631 110.539 30.1939 111.009 29.7242C111.942 28.8172 112.615 27.6803 112.961 26.4298C113.307 25.1168 113.475 23.7635 113.46 22.4061C113.502 20.4859 113.064 18.5853 112.187 16.8741C111.806 16.1111 111.208 15.476 110.467 15.0474C109.727 14.6189 108.876 14.4156 108.02 14.4629C105.918 14.4629 104.036 15.7413 102.376 18.298V28.722Z"
                fill="white"
              />
              <path
                d="M155.633 12.9544V14.4428H150.413V26.509C150.399 27.4107 150.583 28.3046 150.952 29.1286C151.086 29.4829 151.329 29.7864 151.646 29.9964C151.962 30.2064 152.338 30.3124 152.718 30.2995C153.199 30.2869 153.669 30.1501 154.081 29.9026C154.414 29.7295 154.73 29.5251 155.024 29.2923C155.178 29.1534 155.523 28.821 156.057 28.3L157 29.0939C155.463 31.4952 153.548 32.6958 151.256 32.6958C148.085 32.6958 146.502 30.6368 146.505 26.5189V14.4527H144.2V13.4257C144.947 13.3091 145.654 13.0108 146.257 12.5572C146.86 12.1037 147.342 11.509 147.658 10.8259C148.427 9.34483 148.823 7.70005 148.811 6.0332H150.413V12.9792L155.633 12.9544Z"
                fill="white"
              />
              <path
                d="M131.335 13.9514L132.882 12.582L131.335 13.9514Z"
                fill="white"
              />
              <path
                d="M131.335 13.9512H131.21L131.27 14.0008L131.335 13.9512Z"
                fill="white"
              />
              <path
                d="M126.644 9.92773L129.758 12.6764L131.21 13.9564H131.335L132.882 12.587L133.561 11.9867L135.886 9.9327L126.644 9.92773Z"
                fill="white"
              />
              <path
                d="M139.075 15.3405C137.916 14.1243 136.424 13.2737 134.783 12.8945L134.648 13.0136L133.336 14.1746C133.635 14.2543 133.926 14.3623 134.204 14.4971C134.884 14.8285 135.473 15.3187 135.921 15.9259C136.372 16.5835 136.709 17.3113 136.919 18.0792C137.154 18.8556 137.311 19.6534 137.388 20.4607C137.453 21.195 137.483 22.0285 137.483 22.9414C137.495 24.2957 137.345 25.6465 137.034 26.9651C136.729 28.1981 136.086 29.3231 135.177 30.2148C134.705 30.6885 134.14 31.0596 133.516 31.3047C132.892 31.5498 132.224 31.6636 131.554 31.6387C129.452 31.6387 127.946 30.8118 127.038 29.158C126.085 27.3201 125.616 25.2715 125.676 23.2043C125.676 18.2892 126.918 15.3223 129.404 14.3036L127.976 13.0434C126.534 13.4938 125.232 14.3033 124.194 15.3951C122.357 17.33 121.439 19.8719 121.439 23.0208C121.439 26.1068 122.349 28.5379 124.169 30.314C125.988 32.0902 128.45 32.98 131.554 32.9833C134.568 32.9833 137.015 32.039 138.895 30.1503C140.775 28.2617 141.716 25.8223 141.72 22.8322C141.713 19.7099 140.831 17.2126 139.075 15.3405Z"
                fill="white"
              />
              <path
                d="M125.995 8.4397C126.399 7.77487 126.769 7.14973 127.168 6.54444C127.215 6.49546 127.271 6.45654 127.334 6.43009C127.397 6.40364 127.464 6.39022 127.532 6.39063C130.024 6.39063 132.519 6.39063 135.018 6.39063C135.092 6.39329 135.165 6.41144 135.232 6.44392C135.299 6.47639 135.359 6.52246 135.407 6.57917C135.796 7.17454 136.155 7.78479 136.555 8.4397H125.995Z"
                fill="white"
              />
            </svg>

            {theme.direction === "ltr" ? (
              <ChevronLeftIcon style={{ color: "#B5AF8F" }} />
            ) : (
              <ChevronRightIcon style={{ color: "#B5AF8F" }} />
            )}
          </IconButton>
        </div>
        <List style={{ color: "#B5AF8F" }}>
          <Link
            to="/"
            style={{
              color: "#B5AF8F",
            }}
          >
            <ListItem button onClick={() => setPage("My Store")}>
              <ListItemIcon style={{ color: "#B5AF8F" }}>
                <StorefrontOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="My Store" />
            </ListItem>
          </Link>
          <Link
            to="/"
            style={{
              color: "#B5AF8F",
            }}
          >
            <ListItem button onClick={() => setPage("Quotations")}>
              <ListItemIcon style={{ color: "#B5AF8F" }}>
                <DescriptionOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Quotations" />
            </ListItem>
          </Link>
          <Link
            to="/"
            style={{
              color: "#B5AF8F",
            }}
          >
            <ListItem button onClick={() => setPage("Packages")}>
              <ListItemIcon style={{ color: "#B5AF8F" }}>
                <LocalMallOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Packages" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {page === "My Store" ? (
          <div>
            <StoreRoutes />
          </div>
        ) : page === "Quotations" ? (
          <QuotationsRouters />
        ) : (
          <PackageRoutes />
        )}
      </main>
    </div>
  );
}
