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
  Tabs,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";

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
import Loading from "../Loader/Loading";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CreateGroup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [lName, setLName] = useState();
  const [imgAvatar, setImgAvatar] = useState();
  const [loading, setLoading] = useState(false);

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

  const handleCreateGroup = async () => {
    const myData = {
      name: groupName,
      privacy: privacy,
      admin: userId,
    };
    setLoading(true);

    const response = await dispatch(createGroup(myData));

    setLoading(false);

    if (response.payload) {
      navigate(`/`);
    }

    // console.log("Group created:", groupName, privacy);
  };

  // const [value, setValue] = React.useState("1");

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const [value, setValue] = React.useState(0);

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
    <>
      <Loading isLoading={loading} />

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

                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab
                        label="About"
                        {...a11yProps(0)}
                        sx={{ ...tabStyles }}
                      />
                      <Tab
                        label="Post"
                        {...a11yProps(1)}
                        sx={{ ...tabStyles }}
                      />
                      <Tab
                        label="Member"
                        {...a11yProps(2)}
                        sx={{ ...tabStyles }}
                      />
                      <Tab
                        label="Events"
                        {...a11yProps(4)}
                        sx={{ ...tabStyles }}
                      />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    About
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    {/* <GroupPost /> */}
                    Post
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={2}>
                    Member
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={4}>
                    Events
                  </CustomTabPanel>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CreateGroup;
