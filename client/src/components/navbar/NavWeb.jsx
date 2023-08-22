import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../images/facebook.png";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

//theme

import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useSelector } from "react-redux";
import SearchBar from "../Home/SearchBar";

const NavWeb = ({ themeToggler, mode }) => {
  const [name, setName] = useState();
  const [imgAvatar, setImgAvatar] = useState();

  // const { user, loadings, error, data } = useSelector(
  //   (state) => state.user
  // );

  const data = useSelector((state) => state?.user?.user?.user);

  // console.log("name", name);
  // console.log(`http://localhost:8000/${imgAvatar}`);
  useEffect(() => {
    setName(data?.firstName);
    setImgAvatar(data?.avatar);
  }, [data]);

  const imageUrl = "http://localhost:8000/";

  // const logo = "";
  const theme = useTheme();
  // const [searchValue, setSearchValue] = useState("");

  // const handleSearch = (event) => {
  //   const value = event.target.value;
  //   setSearchValue(value);
  //   console.log("Search value:", value);
  // };
  const array = data
    ? [
        { name: "Home", link1: "/", icon: <HomeIcon /> },
        { name: "About", link1: "/about", icon: <ViewTimelineIcon /> },
        { name: "Friend", link1: "/contact", icon: <GroupIcon /> },
        { name: "Profile", link1: "/profile", icon: <PersonIcon /> },
        { name: "Logout", link1: "/logout", icon: <LogoutIcon /> },
      ]
    : [
        { name: "Home", link1: "/", icon: <HomeIcon /> },
        { name: "About", link1: "/about", icon: <ViewTimelineIcon /> },
        { name: "Friend", link1: "/contact", icon: <GroupIcon /> },
        { name: "Login", link1: "/login", icon: <LoginIcon /> },
        { name: "Sign Up", link1: "/signup", icon: <AppRegistrationIcon /> },
      ];

  // const MyThemeComponent = styled('div')(({ theme }) => ({
  //   color: theme.palette.primary.contrastText,
  //   backgroundColor: theme.palette.primary.main,
  //   padding: theme.spacing(1),
  //   borderRadius: theme.shape.borderRadius,
  // }));

  const styledactivelink = ({ isActive }) => {
    return {
      FontFamily: "Poppins",
      textDecoration: "none",
      textTransform: "uppercase",
      // padding: "10px 20px",
      padding: "12px 12px",

      // borderRadius: "50%",
      borderRadius: "5px",
      fontSize: isActive ? "30px" : "20px",
      // color: isActive ? "#FEFEFE" : "#242323",
      color: isActive
        ? theme.palette.text.navBtnText
        : theme.palette.text.primary,
      // color: isActive
      //   ? theme.palette.text.secondary
      //   : theme.palette.text.primary,
      display: "flex",
      gap: "20px",
      alignItems: "center",
      // background: isActive ? " #00aee6" : "",
      // background: isActive ? "theme.palette.background.secondary" : "",
      background: isActive ? theme.palette.background.navBtn : "",
    };
  };
  return (
    <>
      <Box
        sx={{
          p: 1,
          // mt: 2,
          width: "95%",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
          // sx={{
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          //   gap: 2,
          // }}
          >
            {/* <img
              src={logo}
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
              alt="logo"
            /> */}
            {/* <FacebookIcon /> */}

            {/* <Avatar alt="" src={`${imageUrl}${imgAvatar}`} /> */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <img
                src={logo}
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
                alt="logo"
              />
              {/* <Typography
                sx={{
                  fontSize: { md: "36px", sm: "30px", xs: "30px" },
                  fontWeight: "bold",
                }}
              >
                {data ? `${name}` : "Logo"}
              </Typography> */}
              <SearchBar />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              height: "40px",
              gap: "20px",
            }}
          >
            {array.map((item, index) => {
              return (
                <NavLink to={item.link1} style={styledactivelink} key={index}>
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* <Avatar
                      sx={{
                        color: theme.palette.background.navBtn,
                      }}
                    >
                      {item.icon}
                    </Avatar> */}
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        FontSize: "22px",
                        FontStyle: "Medium",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </NavLink>
              );
            })}
            <Box>
              {/* <Avatar alt="Remy Sharp" src={`${imageUrl}${imgAvatar}`} /> */}
            </Box>
          </Box>

          <Box
          // sx={{
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          //   gap: 2,
          // }}
          >
            {/* <img
              src={logo}
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
              alt="logo"
            /> */}
            {/* <FacebookIcon /> */}

            {/* <Avatar alt="" src={`${imageUrl}${imgAvatar}`} /> */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar alt="Remy Sharp" src={`${imageUrl}${imgAvatar}`} />

              <Typography
                sx={{
                  fontSize: { md: "36px", sm: "30px", xs: "30px" },
                  fontWeight: "bold",
                }}
              >
                {data ? `${name}` : "Logo"}
              </Typography>

              <Button sx={{ ml: 2 }} onClick={themeToggler} color="inherit">
                {mode ? <Brightness7 /> : <Brightness4 />}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NavWeb;
