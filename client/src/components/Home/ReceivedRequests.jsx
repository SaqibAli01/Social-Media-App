import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { getRequestedUsers } from "../../ReduxToolKit/friendList";

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
  },
}));

const ReceivedRequests = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const [uId, setUId] = useState();

  const data = useSelector((state) => state?.user?.user?.user);
  const userId = data?._id;

  const res = useSelector((state) => state?.friend);
  // console.log("🚀 ~ file: res:_______", res);

  const imgUrl = "http://localhost:8000/";

  const RequestAccpectHandler = (requesterUserId) => {
    // alert(requesterUserId);requesterId, receiverId
    // dispatch(
    //   receiveFriendRequest({ requesterId: requesterUserId, receiverId: uId })
    // );
  };

  const getAllRequestUsera = (userId) => {
    dispatch(getRequestedUsers(userId));
  };
  const requestedUsers = null;
  return (
    <div className={classes.receivedRequests}>
      <h2>Received Friend Requests</h2>
      <List>
        {requestedUsers ? (
          requestedUsers?.map((request) => (
            <ListItem key={request?._id} className={classes?.listItem}>
              <ListItemAvatar>
                <Avatar
                  src={`${imgUrl}${request?.avatar}`}
                  alt={request?.requester?.name}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${request?.firstName} ${request?.lastName}`}
              />
              <Button
                onClick={(e) => RequestAccpectHandler(request?._id)}
                variant="contained"
                color="primary"
              >
                Accept
              </Button>
            </ListItem>
          ))
        ) : (
          <p>No pending friend requests.</p>
        )}
      </List>

      <Button variants="variants" onClick={getAllRequestUsera()}>
        {" "}
        Get ALL USER
      </Button>
    </div>
  );
};

export default ReceivedRequests;
