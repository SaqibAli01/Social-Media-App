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
import {
  CancelGroupInvitation,
  getUserCreateGroup,
  sendGroupInvitation,
} from "../../ReduxToolKit/groupSlice";

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

const InviteGroup = ({ id }) => {
  // console.log("my Id", id);
  const groupId = id;
  const classes = useStyles();
  const dispatch = useDispatch();

  const data = useSelector((state) => state?.user?.user?.user);
  const { users } = useSelector((state) => state?.friend);
  // console.log("users-------", users);

  const [userId, setUserId] = useState(data?._id);

  // const [groups, setGroup] = useState([]);
  const { group } = useSelector((state) => state?.group);
  // console.log("~ group:", group);

  useEffect(() => {
    // setGroup(group?.groups);
    dispatch(getAllUser());
    setUserId(data?._id);
    // dispatch(statusCheckRequest(userId));
    dispatch(getUserCreateGroup(userId));
  }, [dispatch, group, data, userId]);

  const handleSendRequest = (receiverId) => {
    const data = {
      senderId: userId,
      receiverId: receiverId,
      groupId: id,
    };

    // console.log("Invite Member", data);
    dispatch(sendGroupInvitation(data));
    setTimeout(() => {
      dispatch(getAllUser());
    }, 3000);
  };

  const handleCancelRequest = (receiverId) => {
    const data = {
      senderId: userId,
      receiverId: receiverId,
      groupId: id,
    };

    dispatch(CancelGroupInvitation(data));
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

  return (
    <div className={classes.friendList}>
      {/* <ReceivedRequests /> */}

      <h2>
        <Button onClick={() => dispatch(getAllUser())}>Invite Member</Button>
      </h2>

      <List>
        {users ? (
          users?.map((friend) => {
            // console.log("friend", friend);
            const isCurrentUser = friend?._id === userId;
            // console.log("friend?._id=== userId", friend?._id, "=== ", userId);

            if (isCurrentUser) {
              return null;
            }

            const pendingRequest = friend?.groupInvite?.find(
              (item) =>
                item?.senderUser === userId &&
                item?.senderGroup === groupId &&
                item?.sendInviteStatus === "pending"
            );
            // console.log("pendingRequest", pendingRequest);
            // item?.requesterId === userId &&
            // item?.sendRequestStatus === "pending"

            const acceptedRequest = friend?.groupInvite?.find(
              (item) =>
                (item?.receiverUser === userId ||
                  item?.senderUser === userId) &&
                item?.acceptInviteStatus === "accepted"
            );
            // console.log("acceptedRequest", acceptedRequest);

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
                {/* {console.log("pendingRequest", pendingRequest)} */}
                {pendingRequest ? (
                  <Button
                    variant="contained"
                    onClick={() => handleCancelRequest(friend?._id)}
                  >
                    Cancel Invite
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
                    variant="gradient"
                    onClick={() => handleAcceptRequest(friend?._id)}
                  >
                    Accept Request
                  </Button>
                ) : (
                  // Show "Add Friend" button if there's no request sent
                  <Button
                    variant="gradient"
                    onClick={() => handleSendRequest(friend?._id)}
                  >
                    Invite Member
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
