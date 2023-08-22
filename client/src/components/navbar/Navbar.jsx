import React from "react";
import NavWeb from "./NavWeb";
import NavMob from "./NavMob";
import { Box, Hidden, useTheme } from "@mui/material";

const Navbar = ({ themeToggler, mode }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        // top: 0,
        // position: "fixed",
        // border: "1px solid red",
        width: "100%",
        boxShadow: theme.palette.background.NavShadow,
        zIndex: 1000,
        background: theme.palette.background.hard,
      }}
    >
      <Box sx={{}}>
        <Hidden lgDown>
          <NavWeb mode={mode} themeToggler={themeToggler} />
        </Hidden>
        <Hidden lgUp>
          <NavMob />
        </Hidden>
      </Box>
    </Box>
  );
};

export default Navbar;
