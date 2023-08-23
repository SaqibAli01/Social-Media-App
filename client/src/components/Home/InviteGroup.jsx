import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

// import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelFriendRequest,
  getAllUser,
  sendFriendRequest,
  acceptFriendRequest,
  statusCheckRequest,
} from "../../ReduxToolKit/friendList";
import ReceivedRequests from "./ReceivedRequests";

const useStyles = makeStyles((theme) => ({
  friendList: {
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

const InviteGroup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const data = useSelector((state) => state?.user?.user?.user);
  const { users } = useSelector((state) => state?.friend);
  // console.log("users", users);
  const friendRequestsState = useSelector(
    (state) => state?.friend?.statusCheckRequest
  );
  const friendRequests = friendRequestsState?.friendRequests || [];

  const [userId, setUserId] = useState(data?._id);
  // const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    dispatch(getAllUser());
    setUserId(data?._id);
    dispatch(statusCheckRequest(userId));
  }, [dispatch, data, userId]);

  const handleSendRequest = (receiverId) => {
    const data = {
      requesterId: userId,
      receiverId: receiverId,
    };

    dispatch(sendFriendRequest(data));
    setTimeout(() => {
      dispatch(getAllUser());
    }, 3000);
  };

  const handleCancelRequest = (receiverId) => {
    dispatch(cancelFriendRequest({ requesterId: userId, receiverId }));
    setTimeout(() => {
      dispatch(getAllUser());
    }, 3000);

    // setSentRequests((prevSentRequests) =>
    //   prevSentRequests.filter((id) => id !== receiverId)
    // );
  };

  const handleAcceptRequest = (requestId) => {
    alert(requestId);
    // console.log("userId: " + userId);
    // console.log("Request Id: " + requestId);

    const data = {
      requesterId: requestId,
      receiverId: userId,
    };
    dispatch(acceptFriendRequest(data));

    setTimeout(() => {
      dispatch(getAllUser());
    }, 3000);
  };

  const imgUrl = "http://localhost:8000/";

  if (!friendRequests) {
    return <p>Loading friend requests...</p>;
  }

  return (
    <div className={classes.friendList}>
      {/* <ReceivedRequests /> */}

      <h2>
        <Button onClick={() => dispatch(getAllUser())}>Invite Member</Button>
      </h2>

      <List>
        {users ? (
          users?.map((friend) => {
            const isCurrentUser = friend?._id === userId;
            if (isCurrentUser) {
              return null;
            }

            const pendingRequest = friend?.status?.find(
              (item) =>
                item?.requesterId === userId &&
                item?.sendRequestStatus === "pending"
            );

            const acceptedRequest = friend?.status?.find(
              (item) =>
                (item?.receiverId === userId || item?.requesterId === userId) &&
                item?.acceptRequestStatus === "accepted"
            );

            return (
              <ListItem key={friend?._id} className={classes?.listItem}>
                <ListItemAvatar>
                  <Avatar
                    src={`${imgUrl}${friend?.avatar}`}
                    alt={friend?.name}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${friend?.firstName} ${friend?.lastName}`}
                />
                {console.log("pendingRequest", pendingRequest)}
                {pendingRequest ? (
                  <Button
                    variant="contained"
                    onClick={() => handleCancelRequest(friend?._id)}
                  >
                    Cancel Request
                  </Button>
                ) : acceptedRequest ? (
                  // Friend request is accepted
                  <Button variant="contained" disabled>
                    Friend
                  </Button>
                ) : // Add Friend
                isCurrentUser ? (
                  // Accept Request
                  <Button
                    variant="contained"
                    onClick={() => handleAcceptRequest(friend?._id)}
                  >
                    Accept Request
                  </Button>
                ) : (
                  // Show "Add Friend" button if there's no request sent
                  <Button
                    variant="contained"
                    onClick={() => handleSendRequest(friend?._id)}
                  >
                    Add Friend
                  </Button>
                )}
              </ListItem>
            );
          })
        ) : (
          <p>Loading users...</p>
        )}
      </List>
    </div>
  );
};

export default InviteGroup;
