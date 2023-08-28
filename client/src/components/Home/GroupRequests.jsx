import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptFriendRequest, getAllUser } from "../../ReduxToolKit/friendList";
import { AcceptGroupInvitation } from "../../ReduxToolKit/groupSlice";

const GroupRequestAccept = ({ id }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.user?.user?.user);
  // console.log("data", data);
  const [userId, setUserId] = useState(data?._id);
  const { users } = useSelector((state) => state?.friend);
  // console.log("users", users);
  const imgUrl = "http://localhost:8000/";

  const handleAcceptRequest = (requestId) => {
    // alert(requestId);
    // console.log("userId: " + userId);
    // console.log("Request Id: " + requestId);
    const data = {
      senderId: requestId,
      receiverId: userId,
      groupId: id,
    };
    // const data1 = {
    //   requesterId: requestId,
    //   receiverId: userId,
    // };
    dispatch(AcceptGroupInvitation(data));

    setTimeout(() => {
      dispatch(getAllUser());
    }, 3000);
  };

  return (
    <Box>
      Group Request Accept
      <Box>
        <List>
          {users ? (
            users.map((friend) => {
              // console.log("friend", friend);
              const isCurrentUser = friend?._id === userId;
              if (isCurrentUser) {
                return null;
              }

              const filteredStatus = friend?.groupInvite?.filter(
                (item) => item?.receiverUser === userId
              );

              if (filteredStatus.length === 0) {
                return null;
              }

              return (
                <ListItem key={friend?._id}>
                  <ListItemAvatar>
                    <Avatar
                      src={`${imgUrl}${friend?.avatar}`}
                      alt={friend?.name}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${friend?.firstName} ${friend?.lastName}`}
                  />

                  {filteredStatus.map((item, index) => (
                    <div key={index}>
                      {item?.acceptInviteStatus === "pending" && (
                        <Button
                          variant="gradient"
                          onClick={() => handleAcceptRequest(friend?._id)}
                        >
                          Accept
                        </Button>
                      )}

                      {item?.acceptInviteStatus === "accepted" && (
                        <Button
                          variant="contained"
                          onClick={() => handleAcceptRequest(friend?._id)}
                        >
                          Friend
                        </Button>
                      )}
                    </div>
                  ))}
                </ListItem>
              );
            })
          ) : (
            <p>Loading users...</p>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default GroupRequestAccept;
