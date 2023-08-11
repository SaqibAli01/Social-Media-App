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
//   acceptFriendRequest,
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

// const AcceptReq = () => {
//   const classes = useStyles();
//   const dispatch = useDispatch();

//   const data = useSelector((state) => state?.user?.user?.user);
//   const { users } = useSelector((state) => state?.friend);

//   const { friendRequests } = useSelector(
//     (state) => state?.friend?.statusCheckRequest
//   );

//   const [userId, setUserId] = useState(data?._id);

//   useEffect(() => {
//     dispatch(getAllUser());
//     setUserId(data?._id);
//     dispatch(statusCheckRequest(userId));
//   }, [dispatch, data, userId]);

//   const handleSendRequest = (receiverId) => {
//     dispatch(sendFriendRequest({ requesterId: userId, receiverId }));
//   };

//   const handleCancelRequest = (receiverId) => {
//     dispatch(cancelFriendRequest({ requesterId: userId, receiverId }));
//   };

//   const handleAcceptRequest = (requestId) => {
//     dispatch(acceptFriendRequest(requestId));
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

//                 {friendRequests.map((request) => {
//                   if (request.requester === friend?._id) {
//                     console.log("Friend Request Receiver:", request.receiver);
//                   }

//                   return null;
//                 })}

//                 {friendRequest &&
//                 friendRequest.receiver === userId &&
//                 friendRequest.status === "pending" ? (
//                   <Button
//                     variant="outlined"
//                     onClick={() => handleAcceptRequest(friendRequest?._id)}
//                   >
//                     Accept
//                   </Button>
//                 ) : (
//                   <>{/* Render other buttons or text as needed */}</>
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

// export default AcceptReq;
