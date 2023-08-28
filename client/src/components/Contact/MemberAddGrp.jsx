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
import { useSelector } from "react-redux";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  // Your makeStyles definitions
}));

const MemberAddGrp = () => {
  const classes = useStyles();
  const [allFriends, setAllFriends] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const data = useSelector((state) => state?.user?.user?.user);
  const userId = data?._id;

  const { users } = useSelector((state) => state?.friend);

  const combinedData = [{ ...userData, ...allFriends }];
  useEffect(() => {
    setUserData(users);
    const fetchRequestedUsers = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8000/get-all-member/${userId}`
        );
        setLoading(true);
        setLoading(false);
        setAllFriends(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRequestedUsers();
  }, [userId]);

  const imgUrl = "http://localhost:8000/";

  // const renderUsers = (users) => (
  //   <Box>
  //     {users.map((friend) => {
  //       // console.log("friend", friend?.groupInvite);
  //       return (
  //         <React.Fragment key={friend?._id}>
  //           {friend?.groupInvite?.map((invite) => {
  //             const senderUserId = invite?.senderUser;
  //             const receiverUserId = invite?.receiverUser;
  //             const senderGroupId = invite?.senderGroup;
  //             const sendInviteStatus = invite?.sendInviteStatus;

  //             // Now you can use senderUserId, receiverUserId, and senderGroupId as needed

  //             return (
  //               <div key={invite?._id}>
  //                 SenderUser ID: {senderUserId} <br />
  //                 ReceiverUser ID: {receiverUserId} <br />
  //                 SenderGroup ID: {senderGroupId} <br />
  //                 sendInviteStatus ID: {sendInviteStatus} <br />
  //               </div>
  //             );
  //           })}
  //         </React.Fragment>
  //       );
  //     })}
  //   </Box>
  // );
  // (invite?.senderUser === request?.group?.admin &&
  //   invite?.user?._id)
  const renderAllFriends = (allFriends) => (
    <Box>
      <List>
        {allFriends ? (
          combinedData.map((invite, index) => {
            console.log("invite", invite);
            return (
              <Box
                key={index}
                sx={{
                  my: 1,
                  background: theme.palette.background.btnBg,
                }}
              >
                <ListItem key={index} className={classes?.listItem}>
                  <ListItemAvatar>
                    <Avatar
                      src={`${imgUrl}${invite?.group?.avatar}`}
                      alt={invite?.group?.name}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={`${invite?.group?.name} `} />
                </ListItem>

                <Box sx={{ ml: 2, pb: 1, color: "#1976D2" }}>
                  Group Invite Accept
                </Box>
                <ListItem key={invite?.user?._id} className={classes?.listItem}>
                  <ListItemAvatar>
                    <Avatar
                      src={`${imgUrl}${invite?.user?.avatar}`}
                      alt={invite?.user?.firstName}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${invite?.user?.firstName} ${invite?.user?.lastName}`}
                  />
                  <Button variant="contained" color="primary">
                    Accept Invite
                  </Button>
                </ListItem>
              </Box>
            );
          })
        ) : (
          <p>No pending Add Member Requests.</p>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <Loading isLoading={loading} />
      <Container>
        <Box>
          Render the users
          {/* Render the allFriends */}
          {renderAllFriends(allFriends)}
        </Box>
      </Container>
    </>
  );
};

export default MemberAddGrp;

// import React, { useEffect, useState } from "react";
// import Loading from "../Loader/Loading";
// import { makeStyles } from "@mui/styles";
// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   useTheme,
// } from "@mui/material";
// import { useSelector } from "react-redux";
// import axios from "axios";
// // import FriendList from "../Home/FriendList";

// const useStyles = makeStyles((theme) => ({
//   receivedRequests: {
//     width: "100%",
//     padding: theme.spacing(2),
//     borderLeft: `1px solid ${theme.palette.divider}`,
//     display: "flex",
//     flexDirection: "column",
//   },
//   listItem: {
//     marginBottom: theme.spacing(2),
//     background: theme.palette.background.btnBg,
//     display: "flex",
//     alignItems: "center", // Centering items vertically
//   },
// }));

// const MemberAddGrp = () => {
//   // const dispatch = useDispatch();
//   const classes = useStyles();
//   const [allFriends, setAllFriends] = useState([]);
//   // console.log("groupUser", groupUser);
//   // const [uId, setUId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const theme = useTheme();
//   const data = useSelector((state) => state?.user?.user?.user);
//   const userId = data?._id;
//   console.log("userId:", userId);

//   const { users } = useSelector((state) => state?.friend);

//   // const { users } = useSelector((state) => state?.friend);

//   useEffect(() => {
//     const fetchRequestedUsers = async () => {
//       try {
//         const response = await axios.post(
//           `http://localhost:8000/get-all-member/${userId}`
//         );
//         setLoading(true);
//         // console.log("response.data Add Member", response.data);
//         setLoading(false);
//         setAllFriends(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchRequestedUsers();
//   }, [userId]);

//   const imgUrl = "http://localhost:8000/";

//   return (
//     <>
//       <Loading isLoading={loading} />
//       <Container>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             width: "100%",
//             border: "1px solid",
//             //  flexDirection: "column",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               // alignItems: "center",
//               width: "100%",

//               flexDirection: "column",
//               // width: { md: "60%", sm: "70%", xs: "100%" },
//               // boxShadow: theme.palette.background.boxShadow,

//               p: 4,
//             }}
//           >
//             <Button>Group Invite List</Button>
//             {users ? (
//               users.map((friend) => {
//                 console.log("friend", friend);
//                 const isCurrentUser = friend?._id === userId;
//                 if (isCurrentUser) {
//                   return null;
//                 }

//                 const filteredStatus = friend?.groupInvite?.filter(
//                   (item) => item?.receiverUser === userId
//                 );

//                 if (filteredStatus.length === 0) {
//                   return null;
//                 }

//                 return <></>;
//               })
//             ) : (
//               <p>Loading users...</p>
//             )}
//             <Box>
//               <List>
//                 {allFriends.length > 0 ? (
//                   allFriends?.map(
//                     (request) =>
//                       console.log("request", request) || (
//                         <Box
//                           key={request?.group?._id}
//                           sx={{
//                             // border: "1px solid red",
//                             my: 1,
//                             background: theme.palette.background.btnBg,
//                           }}
//                         >
//                           <ListItem
//                             key={request?.group?._id}
//                             className={classes?.listItem}
//                           >
//                             <ListItemAvatar>
//                               <Avatar
//                                 src={`${imgUrl}${request?.group?.avatar}`}
//                                 alt={request?.group?.name}
//                               />
//                             </ListItemAvatar>
//                             <ListItemText
//                               primary={`${request?.group?.name} `}
//                             />
//                           </ListItem>

//                           <Box sx={{ ml: 2, pb: 1, color: "#1976D2" }}>
//                             Group Invite Accept
//                           </Box>
//                           <ListItem
//                             key={request?.user?._id}
//                             className={classes?.listItem}
//                           >
//                             <ListItemAvatar>
//                               <Avatar
//                                 src={`${imgUrl}${request?.user?.avatar}`}
//                                 alt={request?.user?.firstName}
//                               />
//                             </ListItemAvatar>
//                             <ListItemText
//                               primary={`${request?.user?.firstName} ${request?.user?.lastName}`}
//                             />
//                             <Button variant="contained" color="primary">
//                               Accept Invite
//                             </Button>
//                           </ListItem>
//                         </Box>
//                       )
//                   )
//                 ) : (
//                   <p>No pending Add Member Requests.</p>
//                 )}
//               </List>
//             </Box>
//           </Box>
//         </Box>
//         {/* <FriendList /> */}
//       </Container>
//     </>
//   );
// };

// export default MemberAddGrp;
