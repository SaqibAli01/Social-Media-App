import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  InputBase,
  Tab,
  Typography,
  useTheme,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loading";
import grpBg from "../../images/grpBackGround.PNG";

import { useDispatch, useSelector } from "react-redux";
import avatarBg from "../../images/bgAvatar.png";
import { createPost, getAllPosts } from "../../ReduxToolKit/postSlice";
import { toast } from "react-toastify";
import PostList from "./PostList";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Public } from "@mui/icons-material";

const GroupPost = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  // _______________Loading State________________
  const [loading, setLoading] = useState(false);

  // _______________
  const [F_Name, setFName] = useState("");
  const [L_Name, setLName] = useState("");
  const [imgAvatar, setImgAvatar] = useState();
  //loadings, error,
  // const { user, successMessage } = useSelector((state) => state.user);
  const data = useSelector((state) => state?.user?.user?.user);
  useEffect(() => {
    setFName(data?.firstName);
    setLName(data?.lastName);
    setImgAvatar(data?.avatar);
  }, [data]);

  const imageUrl = "http://localhost:8000/";

  const [image, setImage] = useState(null);
  // const [file, selectedFile] = useState(null);
  const [text, setTextValue] = useState("");

  const [file, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState(""); // Added to keep track of the file type

  const [filePreview, setFilePreview] = useState(""); // Added to keep track of the file preview

  const handleFileChange = (event) => {
    const myFile = event.target.files[0];

    // if (myFile) {
    //   console.log("File name:", myFile.name);
    //   console.log("File type:", myFile.type);
    //   console.log("File size:", myFile.size, "bytes");
    // }
    setSelectedFile(myFile);
    if (myFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(myFile);

      // Determine the file type
      if (myFile.type.startsWith("image")) {
        setFileType("image");
      } else if (myFile.type.startsWith("video")) {
        setFileType("video");
      } else if (myFile.type === "application/pdf") {
        setFileType("pdf");
      } else {
        // Handle other file types if needed
        setFileType("unknown");
      }
    }
  };

  const handleClearImage = () => {
    setImage(null);
  };

  const handleSubmit = () => {
    setLoading(true);
    if (!text || !file) {
      toast.success("Kindly Selected  Text or File");
      setLoading(false);
      return;
    }
    // const formData = new FormData();
    // formData.append("text",text);
    // formData.append("file",selectedFile)

    dispatch(createPost({ text, file }));
    setSelectedFile("");
    setTimeout(() => {
      setTextValue("");
      setImage(null);
      setLoading(false);
      dispatch(getAllPosts());
    }, 3000);
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

  return (
    <>
      <Loading isLoading={loading} />

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
          <img src={grpBg} alt="bg" style={{ width: "100%", height: "100%" }} />
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
            {"Group Name"}
            {/* {groupName ? groupName : "Group Name"} */}
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
            <Public /> {"Public Group"}
            {/* <Public /> {privacy ? privacy : "Public Group"} */}
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
                <GroupPost />{" "}
              </TabPanel>
              <TabPanel value="3">Member</TabPanel>
              <TabPanel value="4">Events</TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default GroupPost;
