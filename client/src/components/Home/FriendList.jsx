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
import { useDispatch, useSelector } from "react-redux";
import {
  cancelFriendRequest,
  getAllUser,
  sendFriendRequest,
  acceptFriendRequest,
  statusCheckRequest,
} from "../../ReduxToolKit/friendList";

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

const FriendList = () => {
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
  const [sentRequests, setSentRequests] = useState([]);

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

    // setSentRequests((prevSentRequests) => [...prevSentRequests, receiverId]);
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
      <h2>
        <Button onClick={() => dispatch(getAllUser())}>Friend List</Button>
      </h2>
      <List>
        {users ? (
          users?.map((friend) => {
            // console.log("friend", friend);
            const isCurrentUser = friend?._id === userId;
            if (isCurrentUser) {
              return null;
            }

            const friendRequest = friendRequests.find(
              (request) =>
                request?.requester === friend?._id &&
                request?.status !== "accepted"
            );

            const isFriendRequestSent = sentRequests.includes(friend?._id);

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

                {/* {console.log(
                  "Sent Request friend?.friendStatus",
                  friend?.StatusAccept
                )} */}

                {userId !== friend?._id &&
                  friend?.StatusRequest === "Add Friend" && (
                    <Button
                      variant="contained"
                      onClick={() => handleSendRequest(friend?._id)}
                    >
                      {/* Add Friend */}
                      {friend?.StatusRequest}
                    </Button>
                  )}

                {/* {console.log("User Id", userId)}
                {console.log("friend?.StatusAccept", friend?.StatusAccept)} */}

                {friend?._id && friend?.StatusRequest === "Pending Request" && (
                  <Button
                    variant="outlined"
                    onClick={() => handleCancelRequest(friend?._id)}
                  >
                    Sent Request
                    {/* {friend?.friendStatus} */}
                  </Button>
                )}

                {/* {console.log("friend?.friendStatus", friend?.friendStatus)} */}

                {/* {console.log("userId === friend?._id", userId === friend?._id)}
                {console.log("userId", userId)}
                {console.log("friend?._id", friend)} */}

                {friend?.StatusAccept === "Send Request" && (
                  <Button
                    variant="outlined"
                    onClick={() => handleAcceptRequest(friend?._id)}
                  >
                    Accept
                  </Button>
                )}

                {friend?.StatusRequest === "Friend" && (
                  <Button
                    variant="contained"
                    // onClick={() => handleAcceptRequest(friend?._id)}
                  >
                    Friend
                  </Button>
                )}
              </ListItem>
            );
          })
        ) : (
          <p>Loading users...</p>
        )}
      </List>

      <Button onClick={() => dispatch(statusCheckRequest(userId))}>
        Check Status
      </Button>
    </div>
  );
};

export default FriendList;

// import React, { useState, useEffect } from "react";
// import { makeStyles } from "@mui/styles";
// import {
//   Avatar,
//   Button,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   cancelFriendRequest,
//   getAllUser,
//   sendFriendRequest,
//   statusCheckRequest,
// } from "../../ReduxToolKit/friendList";

// const useStyles = makeStyles((theme) => ({
//   friendList: {
//     width: "100%",
//     padding: theme.spacing(2),
//     borderLeft: `1px solid ${theme.palette.divider}`,
//     display: "flex",
//     flexDirection: "column",
//   },
//   listItem: {
//     marginBottom: theme.spacing(2),
//     background: theme.palette.background.btnBg,
//   },
// }));

// const FriendList = () => {
//   const classes = useStyles();
//   const dispatch = useDispatch();

//   const data = useSelector((state) => state?.user?.user?.user);
//   const { users } = useSelector((state) => state?.friend);

//   const { friendRequests } = useSelector(
//     (state) => state?.friend?.statusCheckRequest
//   );

//   const [userId, setUserId] = useState(data?._id);
//   const [sentRequests, setSentRequests] = useState([]);

//   useEffect(() => {
//     dispatch(getAllUser());
//     setUserId(data?._id);
//     dispatch(statusCheckRequest(userId)); // Fetch friend requests when component mounts
//   }, [dispatch, data, userId]);

//   const handleSendRequest = (receiverId) => {
//     dispatch(sendFriendRequest({ requesterId: userId, receiverId }));
//     setSentRequests((prevSentRequests) => [...prevSentRequests, receiverId]);
//   };

//   const handleCancelRequest = (receiverId) => {
//     dispatch(cancelFriendRequest({ requesterId: userId, receiverId }));
//     setSentRequests((prevSentRequests) =>
//       prevSentRequests.filter((id) => id !== receiverId)
//     );
//   };

//   const imgUrl = "http://localhost:8000/";

//   return (
//     <div className={classes.friendList}>
//       <h2>
//         <Button onClick={() => dispatch(getAllUser())}>Friend List</Button>
//       </h2>
//       <List>
//         {users ? (
//           users?.map((friend) => {
//             const isCurrentUser = friend?._id === userId;
//             if (isCurrentUser) {
//               return null;
//             }

//             const friendRequest = friendRequests.find(
//               (request) =>
//                 request?.requester === friend?._id &&
//                 request?.status !== "accepted"
//             );

//             const isFriendRequestSent = sentRequests.includes(friend?._id);

//             return (
//               <ListItem key={friend?._id} className={classes?.listItem}>
//                 <ListItemAvatar>
//                   <Avatar
//                     src={`${imgUrl}${friend?.avatar}`}
//                     alt={friend?.name}
//                   />
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary={`${friend?.firstName} ${friend?.lastName}`}
//                 />

//                 {isFriendRequestSent || friendRequest ? (
//                   <Button
//                     variant="outlined"
//                     onClick={() => handleCancelRequest(friend?._id)}
//                   >
//                     Send Request
//                   </Button>
//                 ) : (
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleSendRequest(friend?._id)}
//                   >
//                     Add Friend
//                   </Button>
//                 )}
//               </ListItem>
//             );
//           })
//         ) : (
//           <p>Loading users...</p>
//         )}
//       </List>

//       <Button onClick={() => dispatch(statusCheckRequest(userId))}>
//         Check Status
//       </Button>
//     </div>
//   );
// };

// export default FriendList;
