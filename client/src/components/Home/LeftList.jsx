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
import { Box, Container, ListItemText, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getUserCreateGroup } from "../../ReduxToolKit/groupSlice";
import { toast } from "react-toastify";
import axios from "axios";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [lName, setLName] = useState();
  const [imgAvatar, setImgAvatar] = useState();
  const [userId, setUserId] = useState();

  const [groupData, setGroupData] = useState([]);
  const data = useSelector((state) => state?.user?.user?.user);
  const { group } = useSelector((state) => state?.group);
  // console.log("🚀 r ~ group: list", group);

  useEffect(() => {
    dispatch(getUserCreateGroup(userId));
    setUserId(data?._id);
    setName(data?.firstName);
    setLName(data?.lastName);
    setImgAvatar(data?.avatar);
    setGroupData(group?.groups || []);
    // setGroup([...group, group?.groups]);
  }, [dispatch, userId, data]);

  const imageUrl = "http://localhost:8000/";

  const [grpShown, setGrpShown] = useState(false);

  const handleShowGroup = () => {
    dispatch(getUserCreateGroup(userId));

    setGrpShown(!grpShown);
  };

  const handleNavigateGroup = () => {
    navigate("/createGroup");
  };

  const handleNavigateGroupPost = (id) => {
    // toast.success(id);
    // navigate("/GroupPost");
    navigate(`/GroupPost/${id}`);
  };

  const handleClickFriend = () => {
    navigate("/contact");
  };

  const [groups, setGroups] = useState([]);
  console.log("🚀  groups:", groups);

  useEffect(() => {
    const url = "http://localhost:3000/get-All-groups";

    axios
      .get(url)
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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
          <ListItem button onClick={handleClickFriend}>
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
          <ListItem button onClick={handleShowGroup}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            Groups
          </ListItem>
          {grpShown && (
            <Box>
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
              >
                Groups You Manage
              </Typography>
              {groupData?.map((item, index) => (
                <ListItem
                  button
                  onClick={() => handleNavigateGroupPost(item._id)}
                  key={item?._id}
                  sx={{
                    width: "90%",
                  }}
                >
                  <ListItemIcon>
                    <GroupsIcon />
                  </ListItemIcon>

                  {item?.name}
                </ListItem>
              ))}

              {/* <ListItem
                button
                onClick={handleNavigateGroup}
                sx={{
                  color: "#1877F2",
                  backgroundColor: "#E7F3FF",
                  width: "90%",
                }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                Create Group
              </ListItem> */}
            </Box>
          )}

          {grpShown && (
            <Box>
              <ListItem
                button
                onClick={handleNavigateGroup}
                sx={{
                  color: "#1877F2",
                  backgroundColor: "#E7F3FF",
                  width: "90%",
                }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                Create Group
              </ListItem>
            </Box>
          )}

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
