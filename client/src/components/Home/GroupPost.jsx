import React, { useEffect, useRef, useState } from "react";
import Loading from "../Loader/Loading";
import grpBg from "../../images/grpBackGround.PNG";
import { useSelector } from "react-redux";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Public } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import InviteGroup from "./InviteGroup";
import {
  Box,
  Button,
  Container,
  Divider,
  Tab,
  Typography,
  useTheme,
} from "@mui/material";
import MemberAddGrp from "../Contact/MemberAddGrp";
import GroupRequestAccept from "./GroupRequests";

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

const GroupPost = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);

  // console.log("🚀  groups:", groups);
  const { group } = useSelector((state) => state?.group);

  // console.log("🚀 ~  GroupPost ~ group:123", group);

  const userGroup = groups?.find((group) => group?._id === id);

  // console.log("🚀  ~ userGroup:", userGroup);

  const imageUrl = "http://localhost:8000/";

  const profile = imageUrl + userGroup?.avatar;

  useEffect(() => {
    setGroups(group?.groups);
  }, [userGroup, group]);

  const groupName = userGroup?.name || "Default Group Name";
  const groupPrivacy = userGroup?.privacy || "Public";

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleEditButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChangeButtonClick = async () => {
    if (!selectedImage) {
      toast.error("Please select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", selectedImage);
      formData.append("groupId", id);

      const response = await axios.post(
        "http://localhost:8000/api/v1/change-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response?.data);
      toast.success(response?.data?.message);
    } catch (error) {
      console.error("Error changing profile:", error);
    }
  };

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <Loading isLoading={loading} />
      <Container>
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            boxShadow: theme.palette.background.NavShadow,

            p: 2,
            mt: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              position: "relative",
            }}
          >
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : userGroup?.avatar
                  ? profile
                  : grpBg
              }
              alt="Selected"
              style={{ width: "100%", maxHeight: 400 }}
            />

            {/* <img
              src={grpBg}
              alt="bg"
              style={{ width: "100%", height: "100%" }}
            /> */}
            <Box
              sx={{
                position: "absolute",
                bottom: { md: 20, sm: 15, xs: 10 },
                right: { md: 20, sm: 15, xs: 10 },
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Button
                variant="gradient"
                onClick={handleEditButtonClick}
                component="label"
                sx={{
                  mr: 2,
                }}
              >
                Edit
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </Button>
              {selectedImage ? (
                <Button onClick={handleChangeButtonClick} variant="gradient">
                  Update
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleChangeButtonClick}
                    variant="gradient"
                    disabled
                  >
                    Update
                  </Button>
                </>
              )}

              {/* {selectedImage ? (
                <Button onClick={handleChangeButtonClick}>Change Img</Button>
              ) : (
                <Button
                  variant="variants"
                  onClick={handleEditButtonClick}
                  sx={{
                    backgroundColor: "#E4E6EB",
                  }}
                >
                  <EditIcon sx={{ fontSize: "16px" }} />
                  Edit
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </Button>
              )} */}

              {/* Button to trigger file input */}
              {/* <button onClick={handleEditButtonClick}>Edit Image</button> */}
            </Box>
          </Box>
          <Box
            sx={{
              p: 1,
            }}
          >
            <Typography
              sx={{
                color: "black",
                // color: groupName ? "black" : "#BCC0C4",
                fontWeight: "bold",
                fontSize: { md: "24px", sm: "20px", xs: "16px" },
              }}
            >
              {groupName}

              {/* {userGroup ? userGroup[0]?.name : "Group Name"} */}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                color: "black",
                // color: privacy ? "black" : "#65676B",
                py: 1,
                fontWeight: 400,
              }}
            >
              <Public /> {groupPrivacy}
              {/* {userGroup ? userGroup[0]?.privacy : "Public Group"} */}
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
                <TabPanel value="3">
                  <MemberAddGrp />
                  <GroupRequestAccept id={id} />
                  <InviteGroup id={id} />
                </TabPanel>
                <TabPanel value="4">Events</TabPanel>
              </TabContext>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default GroupPost;
