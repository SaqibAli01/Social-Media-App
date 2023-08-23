import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Tab,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Public } from "@mui/icons-material";

import grpBg from "../../images/grpBackGround.PNG";
import GroupPost from "./GroupPost";
import InviteGroup from "./InviteGroup";
import { createGroup } from "../../ReduxToolKit/groupSlice";

const CreateGroup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [lName, setLName] = useState();
  const [imgAvatar, setImgAvatar] = useState();

  const data = useSelector((state) => state?.user?.user?.user);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(data?._id);
    setName(data?.firstName);
    setLName(data?.lastName);
    setImgAvatar(data?.avatar);
  }, [data]);

  const imageUrl = "http://localhost:8000/";
  const [groupName, setGroupName] = useState("");
  const [privacy, setPrivacy] = useState("Public");

  const handleCreateGroup = () => {
    const myData = {
      name: groupName,
      privacy: privacy,
      admin: userId,
    };
    dispatch(createGroup(myData));

    // console.log("Group created:", groupName, privacy);
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabStyles = {
    // border: "1px solid #0DF17F",
    borderRadius: "10px",
    mr: 1,
    mb: 1,
    height: "20px",
    fontSize: { md: "14px", xs: "12px" },
    backgroundColor: "transparent",
    color: "text.primary",
    "&.Mui-selected": {
      color: "white",
      backgroundColor: "#1976D2",
    },

    borderBottom: "none",
    "&.MuiTab-root": {
      minHeight: "40px",
    },
  };

  const CloseHandler = (e) => {
    navigate("/");
  };

  const [grpShown, setGrpShown] = useState(false);

  const invitMembersGrp = () => {
    setGrpShown(!grpShown);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F0F2F5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // border: "1px solid red",
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        // alignItems={"center"}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              boxShadow: theme.palette.background.NavShadow,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                py: 1,
                px: 2,
                boxShadow: theme.palette.background.NavShadow,
              }}
            >
              <Avatar
                onClick={CloseHandler}
                sx={{
                  cursor: "pointer",
                }}
              >
                <CloseIcon />
              </Avatar>
              <Avatar sx={{ bgcolor: "#1877F2" }}>
                <FacebookIcon />
              </Avatar>
            </Box>

            <Box
              sx={{
                py: 1,
                px: 2,
                // border: "1px solid red",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#65676B",
                }}
              >
                Groups › Create group
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    md: "24px",
                    sm: "20px",
                    xs: "16px",
                    fontWeight: "bold",
                  },
                  color: "#050505",
                }}
              >
                Create group
              </Typography>
            </Box>
            <Box>
              <List>
                <ListItem sx={{ py: 1, px: 2 }}>
                  <Avatar src={`${imageUrl}${imgAvatar}`} sx={{ mr: 1 }} />
                  <ListItemText
                    primary={`${name} ${lName}`}
                    secondary="Admin"
                  />
                </ListItem>
              </List>
            </Box>

            <Box
              sx={{
                py: 1,
                px: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                label="Facebook Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                fullWidth
                margin="normal"
                variant="filled"
              />
              {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}

              <FormControl fullWidth margin="normal" variant="filled">
                <InputLabel>Choose Privacy</InputLabel>
                <Select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value)}
                >
                  <MenuItem value="public">Public</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Invite Friends (Optional)"
                fullWidth
                margin="normal"
                variant="filled"
                onClick={invitMembersGrp}
              />

              {grpShown && (
                <Box
                  sx={{
                    color: "#1877F2",
                    backgroundColor: "#E7F3FF",
                    width: "90%",
                  }}
                >
                  <InviteGroup />
                </Box>
              )}

              <Button
                variant="gradient"
                onClick={handleCreateGroup}
                sx={{ mt: 2 }}
              >
                Create Group
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={7}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              boxShadow: theme.palette.background.NavShadow,
              overflowY: "scroll",
              p: 2,
              // maxHeight: "400",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
              }}
            >
              <img
                src={grpBg}
                alt="bg"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
            <Box
              sx={{
                p: 1,
              }}
            >
              <Typography
                sx={{
                  color: groupName ? "black" : "#BCC0C4",
                  fontWeight: "bold",
                  fontSize: { md: "24px", sm: "20px", xs: "16px" },
                }}
              >
                {groupName ? groupName : "Group Name"}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  color: privacy ? "black" : "#65676B",
                  py: 1,
                  fontWeight: 400,
                }}
              >
                <Public /> {privacy ? privacy : "Public Group"}
                <Typography
                  sx={{
                    color: "#65676B",
                    fontWeight: 500,
                  }}
                >
                  - 1 Member
                </Typography>
              </Box>
              <Divider sx={{ py: 1 }} />

              <Box sx={{ width: "100%", typography: "body1", mt: 1 }}>
                <TabContext value={value}>
                  {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}> */}
                  <Box>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="About" value="1" sx={{ ...tabStyles }} />
                      <Tab label="Post" value="2" sx={{ ...tabStyles }} />
                      <Tab label="Member" value="3" sx={{ ...tabStyles }} />
                      <Tab label="Events" value="4" sx={{ ...tabStyles }} />
                    </TabList>
                  </Box>
                  <TabPanel value="1">About</TabPanel>
                  <TabPanel value="2">
                    {/* <GroupPost /> */}
                    Post
                  </TabPanel>
                  <TabPanel value="3">Member</TabPanel>
                  <TabPanel value="4">Events</TabPanel>
                </TabContext>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateGroup;
