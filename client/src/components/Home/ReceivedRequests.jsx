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

const ReceivedRequests = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.user?.user?.user);
  console.log("data", data);
  const [userId, setUserId] = useState(data?._id);
  const { users } = useSelector((state) => state?.friend);

  const imgUrl = "http://localhost:8000/";

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

  return (
    <Box>
      ReceivedRequests
      <Box>
        <List>
          {users ? (
            users.map((friend) => {
              const isCurrentUser = friend?._id === userId;
              if (isCurrentUser) {
                return null;
              }

              const filteredStatus = friend?.status?.filter(
                (item) => item?.receiverId === userId
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
                      {item?.acceptRequestStatus === "pending" && (
                        <Button
                          variant="outlined"
                          onClick={() => handleAcceptRequest(friend?._id)}
                        >
                          Accept
                        </Button>
                      )}

                      {item?.acceptRequestStatus === "accepted" && (
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

export default ReceivedRequests;

// <h2>Received Friend Requests</h2>
// <List>
//   {requestedUsers ? (
//     requestedUsers?.map((request) => (
//       <ListItem key={request?._id} className={classes?.listItem}>
//         <ListItemAvatar>
//           <Avatar
//             src={`${imgUrl}${request?.avatar}`}
//             alt={request?.requester?.name}
//           />
//         </ListItemAvatar>
//         <ListItemText
//           primary={`${request?.firstName} ${request?.lastName}`}
//         />
//         <Button
//           onClick={(e) => RequestAccpectHandler(request?._id)}
//           variant="contained"
//           color="primary"
//         >
//           Accept
//         </Button>
//       </ListItem>
//     ))
//   ) : (
//     <p>No pending friend requests.</p>
//   )}
// </List>
