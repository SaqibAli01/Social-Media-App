import { Box, Grid } from "@mui/material";
import React from "react";

const MainHome = () => {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{
          border: "1px solid red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ backgroundColor: "#F0F2F5" }}>xs=8</Box>
        </Grid>
        <Grid item xs={12} sm={12} md={7.5}>
          <Box sx={{ backgroundColor: "#F0F2F5" }}>4</Box>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Box sx={{ backgroundColor: "#F0F2F5" }}>xs=4</Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainHome;
