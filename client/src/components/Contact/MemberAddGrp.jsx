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
import { AcceptGroupInvitation } from "../../ReduxToolKit/groupSlice";
import { getAllUser } from "../../ReduxToolKit/friendList";

const useStyles = makeStyles((theme) => ({
  // Your makeStyles definitions
}));

const MemberAddGrp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [allFriends, setAllFriends] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const data = useSelector((state) => state?.user?.user?.user);
  const userId = data?._id;
  // console.log("userId", userId);

  const { users } = useSelector((state) => state?.friend);

  const handleAcceptRequestGroup = (item) => {
    // console.log("group", item?._id);
    const data = {
      senderId: item?.admin,
      receiverId: userId,
      groupId: item?._id,
    };
    console.log("data", data);

    dispatch(AcceptGroupInvitation(data));

    setTimeout(() => {
      dispatch(getAllUser());
    }, 3000);
  };

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
  }, []);

  const imgUrl = "http://localhost:8000/";

  const renderAllFriends = (allFriends) => (
    <Box>
      <List>
        {allFriends ? (
          allFriends.map((invite, index) => {
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

                  {invite?.group?.admin === userId && (
                    <Button variant="contained" color="primary">
                      Send Invite
                    </Button>
                  )}

                  {invite?.receiver?._id === userId && (
                    <Button
                      variant="gradient"
                      color="primary"
                      onClick={() => handleAcceptRequestGroup(invite?.group)}
                    >
                      Accept Invite
                    </Button>
                  )}
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
          All Groups
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
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { getAllUser } from "../../ReduxToolKit/friendList";
// import { AcceptGroupInvitation } from "../../ReduxToolKit/groupSlice";

// const useStyles = makeStyles((theme) => ({
//   // Your makeStyles definitions
// }));

// const MemberAddGrp = () => {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const [allFriends, setAllFriends] = useState();
//   const [userData, setUserData] = useState();
//   const [groupId, setGroupId] = useState();
//   const [loading, setLoading] = useState(false);
//   const theme = useTheme();
//   const data = useSelector((state) => state?.user?.user?.user);
//   const userId = data?._id;
//   // console.log("30 ~ MemberAddGrp ~ userId:", userId);

//   const { users } = useSelector((state) => state?.friend);

//   const combinedData = [{ ...userData, ...allFriends }];
//   useEffect(() => {
//     setUserData(users);
//     const fetchRequestedUsers = async () => {
//       try {
//         const response = await axios.post(
//           `http://localhost:8000/get-all-member/${userId}`
//         );
//         setLoading(true);
//         setLoading(false);
//         setAllFriends(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchRequestedUsers();
//   }, [userId]);

//   const imgUrl = "http://localhost:8000/";

//   // const renderUsers = (users) => (
//   //   <Box>
//   //     {users.map((friend) => {
//   //       // console.log("friend", friend?.groupInvite);
//   //       return (
//   //         <React.Fragment key={friend?._id}>
//   //           {friend?.groupInvite?.map((invite) => {
//   //             const senderUserId = invite?.senderUser;
//   //             const receiverUserId = invite?.receiverUser;
//   //             const senderGroupId = invite?.senderGroup;
//   //             const sendInviteStatus = invite?.sendInviteStatus;

//   //             // Now you can use senderUserId, receiverUserId, and senderGroupId as needed

//   //             return (
//   //               <div key={invite?._id}>
//   //                 SenderUser ID: {senderUserId} <br />
//   //                 ReceiverUser ID: {receiverUserId} <br />
//   //                 SenderGroup ID: {senderGroupId} <br />
//   //                 sendInviteStatus ID: {sendInviteStatus} <br />
//   //               </div>
//   //             );
//   //           })}
//   //         </React.Fragment>
//   //       );
//   //     })}
//   //   </Box>
//   // );
//   // (invite?.senderUser === request?.group?.admin &&
//   //   invite?.user?._id)
//   const handleAcceptRequestGroup = (receiverId) => {
//     const data = {
//       senderId: userId,
//       receiverId: receiverId,
//       groupId: groupId,
//     };
//     console.log("data", data);

//     dispatch(AcceptGroupInvitation(data));

//     setTimeout(() => {
//       dispatch(getAllUser());
//     }, 3000);
//   };

//   const allMemberList = (allFriends) => (
//     <>
//       <Box>
//         <List
//           sx={{
//             background: theme.palette.background.btnBg,
//             display: "flex",
//             justifyContent: "center",
//           }}
//         >
//           {combinedData?.map((invite, index) => (
//             <Box key={index}>
//               {Object.values(invite).map((item, innerIndex) => (
//                 <Box key={innerIndex}>
//                   {item.group && item.user && (
//                     <Box
//                       key={innerIndex}
//                       sx={{
//                         my: 1,
//                         background: theme.palette.background.btnBg,
//                       }}
//                     >
//                       <ListItem className={classes?.listItem}>
//                         <ListItemText
//                           sx={{
//                             fontWeight: "bold",
//                             fontSize: "16px",
//                           }}
//                           primary={`Groupe Name : ${item.group.name}`}
//                         />
//                       </ListItem>

//                       <ListItem className={classes?.listItem}>
//                         <ListItemAvatar>
//                           <Avatar
//                             src={`${imgUrl}${item.group.avatar}`}
//                             alt={item.group.name}
//                           />
//                           {/* {setGroupId(item?.group?.name)} */}
//                         </ListItemAvatar>
//                         <ListItemText primary={item.group.name} />
//                       </ListItem>

//                       <Box sx={{ ml: 2, pb: 1, color: "#1976D2" }}>
//                         Group Invite Accept
//                       </Box>
//                       <ListItem className={classes?.listItem}>
//                         <ListItemAvatar>
//                           <Avatar
//                             src={`${imgUrl}${item.user.avatar}`}
//                             alt={`${item.user.firstName} ${item.user.lastName}`}
//                           />
//                         </ListItemAvatar>
//                         <ListItemText
//                           primary={`${item.user.firstName} ${item.user.lastName}`}
//                         />
//                       </ListItem>
//                     </Box>
//                   )}

//                   {item.groupInvite && (
//                     <Box>
//                       {item.groupInvite.map(
//                         (innerGrp, i) =>
//                           console.log(
//                             "innerGrp?.acceptInviteStatus",
//                             innerGrp?.acceptInviteStatus
//                           ) || (
//                             <React.Fragment key={i}>
//                               <p>{innerGrp.someProperty}</p>
//                               {innerGrp?.receiverUser === userId &&
//                                 innerGrp?.acceptInviteStatus === "pending" && (
//                                   <Box
//                                     key={i}
//                                     sx={{
//                                       width: "100%",
//                                       display: "flex",
//                                       justifyContent: "center",
//                                     }}
//                                   >
//                                     <Button
//                                       variant="contained"
//                                       onClick={() =>
//                                         handleAcceptRequestGroup(
//                                           innerGrp?.receiverUser
//                                         )
//                                       }
//                                     >
//                                       Accept Invite
//                                     </Button>
//                                   </Box>
//                                 )}
//                               {console.log(
//                                 "innerGrp?.senderUser === userId",
//                                 innerGrp?.senderUser === userId
//                               )}
//                               {innerGrp?.senderUser === userId &&
//                                 innerGrp?.sendInviteStatus === "pending" && (
//                                   <Box
//                                     key={i}
//                                     sx={{
//                                       width: "100%",
//                                       display: "flex",
//                                       justifyContent: "center",
//                                     }}
//                                   >
//                                     <Button
//                                       variant="contained"
//                                       onClick={() =>
//                                         handleAcceptRequestGroup(
//                                           innerGrp?.receiverUser
//                                         )
//                                       }
//                                     >
//                                       Send Invites
//                                     </Button>
//                                   </Box>
//                                 )}
//                             </React.Fragment>
//                           )
//                       )}
//                     </Box>
//                   )}
//                 </Box>
//               ))}
//             </Box>
//           ))}
//         </List>
//       </Box>
//     </>
//   );

//   return (
//     <>
//       <Loading isLoading={loading} />
//       <Container>
//         <Box>
//           Group Request Accept
//           {allMemberList(allFriends)}
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default MemberAddGrp;
