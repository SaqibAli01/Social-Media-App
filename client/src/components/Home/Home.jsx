import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  Hidden,
  Input,
  InputBase,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loading";
import { useDispatch, useSelector } from "react-redux";
import avatarBg from "../../images/bgAvatar.png";
import { createPost, getAllPosts } from "../../ReduxToolKit/postSlice";
import { toast } from "react-toastify";
import PostList from "./PostList";
import LeftSidebar from "./LeftList";
import FriendList from "./FriendList";
// import MoreVertIcon from '@mui/icons-material/MoreVert';

const Home = () => {
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

  return (
    <>
      <Loading isLoading={loading} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          // border: "1px solid red",
          px: 2,
        }}
      >
        <Grid container>
          <Hidden lgDown>
            <Grid item xs={2.5} md={2.5}>
              <Box>
                <LeftSidebar />
              </Box>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                // boxShadow: theme.palette.background.boxShadow,
                // border: "1px solid red",
                width: "100%",
                // width: { md: "70%", sm: "80%", xs: "100%" },
                // py: { md: 8, sm: 6, xs: 4 },
                // px: { md: 6, sm: 4, xs: 2 },
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    px: 2,
                    // flexDirection: "column",
                  }}
                >
                  {imgAvatar ? (
                    <Avatar
                      src={`${imageUrl}${imgAvatar}`}
                      sx={{ width: 50, height: 50, my: 2 }}
                    />
                  ) : (
                    <Avatar
                      src={avatarBg}
                      sx={{ width: 60, height: 60, my: 2 }}
                    />
                  )}

                  <InputBase
                    placeholder={`What on your Mind, ${
                      data ? ` ${F_Name} ${L_Name} ` : "?"
                    }`}
                    value={text}
                    onChange={(e) => setTextValue(e.target.value)}
                    sx={{
                      background: theme.palette.background.grayBg,
                      border: `1px solid ${theme.palette.background.borderLight}`,
                      px: 5,
                      borderRadius: "20px",
                      width: "100%",
                      py: 0.7,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  {image ? (
                    <Box>
                      {/* Display the selected file based on its type */}
                      {fileType === "image" && (
                        <img
                          src={filePreview}
                          alt="Selected"
                          style={{ width: "200px" }}
                        />
                      )}
                      {fileType === "video" && (
                        <video
                          src={filePreview}
                          controls
                          style={{ width: "200px" }}
                        />
                      )}
                      {fileType === "pdf" && (
                        <embed src={filePreview} width="200px" height="200px" />
                      )}
                      <br />
                      <Button onClick={handleClearImage}>Clear Image</Button>
                    </Box>
                  ) : (
                    <div>
                      <FormControl>
                        <Input
                          id="file-input"
                          type="file"
                          accept=".jpg, .jpeg, .png, .pdf, .mp4"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                        <Button
                          component="label"
                          htmlFor="file-input"
                          sx={{
                            color: theme.palette.text.navBtnText,
                            background: theme.palette.background.navBtn,
                            px: 4,
                          }}
                        >
                          Select File
                        </Button>
                      </FormControl>

                      {file && (
                        <div>
                          <h4>Selected File:</h4>
                          <p>Name: {file.name}</p>
                          {/* <p>Type: {file.type}</p>
                          <p>Size: {file.size} bytes</p> */}
                        </div>
                      )}
                    </div>
                  )}
                </Box>

                <Button
                  variant="gradient"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{
                    // width: { md: "50%", sm: "60%" },
                    mx: { md: 20, sm: 15, xs: 10 },
                  }}
                >
                  Post
                </Button>
              </Box>

              {/* Post List  */}
              <PostList />
            </Box>
          </Grid>

          <Hidden lgDown>
            <Grid item xs={3} md={3}>
              <Box>
                <FriendList />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
