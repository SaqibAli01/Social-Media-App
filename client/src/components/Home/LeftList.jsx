import React, { useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import VideoIcon from "@mui/icons-material/VideoLibrary";
import PeopleIcon from "@mui/icons-material/People";
import GamesIcon from "@mui/icons-material/Games";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";

const LeftSidebar = () => {
  const [name, setName] = useState();
  const [lName, setLName] = useState();
  const [imgAvatar, setImgAvatar] = useState();

  const data = useSelector((state) => state?.user?.user?.user);

  useEffect(() => {
    setName(data?.firstName);
    setLName(data?.lastName);
    setImgAvatar(data?.avatar);
  }, [data]);

  const imageUrl = "http://localhost:8000/";

  return (
    <>
      <Box
        sx={{
          // border: "1px solid red",
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          flexDirection: "column",
        }}
      >
        <List>
          <ListItem>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            Home
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <Avatar src={`${imageUrl}${imgAvatar}`} sx={{ mr: 1 }} />
            <ListItemText
              primary={`${name} ${lName}`}
              secondary="View Profile"
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            Friends
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <VideoIcon />
            </ListItemIcon>
            Videos
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            Groups
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <GamesIcon />
            </ListItemIcon>
            Games
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ArrowForwardIcon />
            </ListItemIcon>
            See All
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            Pages
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default LeftSidebar;
