import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loading";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  receivedRequests: {
    width: "100%",
    padding: theme.spacing(2),
    borderLeft: `1px solid ${theme.palette.divider}`,
    display: "flex",
    flexDirection: "column",
  },
  listItem: {
    marginBottom: theme.spacing(2),
    background: theme.palette.background.btnBg,
    display: "flex",
    alignItems: "center", // Centering items vertically
  },
}));

const Contact = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [allFriends, setAllFriends] = useState([]);
  const [uId, setUId] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const data = useSelector((state) => state?.user?.user?.user);
  const userId = data?._id;

  // useEffect(() => {
  //   // Update the user ID state
  //   setUId(userId);

  //   const fetchRequestedUsers = async () => {
  //     try {
  //       const response = await axios.post(
  //         `http://localhost:8000/getFriendShip/${userId}`
  //       );
  //       setAllFriends(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchRequestedUsers();
  // }, [userId]);

  const imgUrl = "http://localhost:8000/";

  return (
    <>
      <Loading isLoading={loading} />
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            border: "1px solid",
            //  flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
              width: "100%",

              flexDirection: "column",
              // width: { md: "60%", sm: "70%", xs: "100%" },

              boxShadow: theme.palette.background.boxShadow,

              p: 4,
            }}
          >
            <Button>Friend List</Button>

            <Box>
              <List>
                {allFriends.length > 0 ? ( // Check if there are pending friend requests
                  allFriends?.map((request) => (
                    <ListItem key={request?._id} className={classes?.listItem}>
                      <ListItemAvatar>
                        <Avatar
                          src={`${imgUrl}${request?.friend?.avatar}`}
                          alt={request?.requester?.name}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${request?.friend?.firstName} ${request?.friend?.lastName}`}
                      />
                      <Button variant="contained" color="primary">
                        Friend
                      </Button>
                      {/* <Button variant="outlined" color="secondary">
                Reject
              </Button> */}
                    </ListItem>
                  ))
                ) : (
                  <p>No pending friend requests.</p>
                )}
              </List>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Contact;
