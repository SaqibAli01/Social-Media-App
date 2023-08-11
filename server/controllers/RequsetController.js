import Friendship from "../models/FriendShipModel.js";
import FriendRequest from "../models/requestSend.js";
import User from "../models/userModel.js";

// Sending Friend Request
// export const sendFriendRequest = async (req, res) => {
//     try {
//         const { requesterId, receiverId } = req.body;
//         const requester = await User.findById(requesterId);
//         const receiver = await User.findById(receiverId);

//         if (!requester || !receiver) {
//             return res.status(404).json({ message: 'Requester or receiver not found.' });
//         }
//         const existingRequest = await FriendRequest.findOne({
//             requester: requesterId,
//             receiver: receiverId,
//             status: 'pending',
//         });

//         if (existingRequest) {
//             return res.status(400).json({ message: 'Friend request already sent.' });
//         }
//         const newFriendRequest = new FriendRequest({
//             requester: requesterId,
//             receiver: receiverId,
//             status: 'pending',
//         });
//         await newFriendRequest.save();

//         res.status(200).json({ message: 'Friend request sent.' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };
export const sendFriendRequest = async (req, res) => {
    try {
        const { requesterId, receiverId } = req.body;

        console.log(' requesterId, receiverId', requesterId, receiverId)


        const requester = await User.findById(requesterId);
        const receiver = await User.findById(receiverId);

        if (!requester || !receiver) {
            return res.status(404).json({ message: 'Requester or receiver not found.' });
        }

        // Check if users are already friends
        const areFriends = await Friendship.exists({
            users: { $all: [requesterId, receiverId] },
        });

        if (areFriends) {
            return res.status(400).json({ message: 'Users are already friends.' });
        }

        const existingRequest = await FriendRequest.findOne({
            requester: requesterId,
            receiver: receiverId,
            status: 'pending',
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already sent.' });
        }

        const newFriendRequest = new FriendRequest({
            requester: requesterId,
            receiver: receiverId,
            status: 'pending',
        });
        await newFriendRequest.save();

        requester.StatusRequest = "pending";
        requester.StatusAccept = "Send Request";
        await requester.save();
        receiver.StatusRequest = "Pending Request";
        receiver.StatusAccept = "Accepted Request";
        await receiver.save();


        res.status(200).json({ message: 'Friend request sent.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};







// Accept Friend Request
//userId === requesterId && status === 'pending' then show buttons Sent request
//userId === receiverId && status === 'pending' then show buttons Accept request
// otherwise show buttons Add Friend request

export const AcceptFriend = async (req, res) => {
    try {
        const { requesterId, receiverId } = req.body;
        console.log('requesterId, receiverId--', requesterId, receiverId)

        const requester = await User.findById(requesterId);
        const receiver = await User.findById(receiverId);

        // if (!requester || !receiver) {
        //     return res.status(404).json({ message: 'Requester or receiver not found.' });
        // }
        if (!requester) {
            return res.status(404).json({ message: 'Requester not found.' });
        }
        if (!receiver) {
            return res.status(404).json({ message: ' receiver not found.' });
        }

        const existingRequest = await FriendRequest.findOne({
            requester: requesterId,
            receiver: receiverId,
            status: 'pending',
        });

        if (!existingRequest) {
            return res.status(400).json({ message: 'Friend request not found or already accepted.' });
        }

        if (existingRequest.status === 'accepted') {
            return res.status(400).json({ message: 'Friend request has already been accepted.' });
        }


        existingRequest.status = 'accepted';
        await existingRequest.save();



        const newFriendship = new Friendship({
            user1: requesterId,
            user2: receiverId,
        });


        await newFriendship.save();

        requester.StatusRequest = "Friend";
        requester.StatusAccept = "Accepted Request";
        await requester.save();
        receiver.StatusRequest = "UnFriend";
        receiver.StatusAccept = "Friend";
        await receiver.save();

        res.status(200).json({ message: 'Friend request accepted and friendship created.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//findOneAndUpdate 
// export const cancelFriendRequest = async (req, res) => {
//     try {
//         const { requesterId, receiverId } = req.body;

//         // Find and update the existing pending FriendRequest to 'cancelled'
//         const existingRequest = await FriendRequest.findOneAndUpdate(
//             {
//                 requester: requesterId,
//                 receiver: receiverId,
//                 status: 'pending',
//             },
//             { status: 'cancelled' }
//         );

//         if (existingRequest) {
//             res.status(200).json({ message: 'Friend request cancelled.' });
//         } else {
//             res.status(404).json({ message: 'No pending friend request found.' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

// Sending Friend Request Cancelling 
export const cancelFriendRequest = async (req, res) => {
    try {
        const { requesterId, receiverId } = req.body;

        const requester = await User.findById(requesterId);
        const receiver = await User.findById(receiverId);
        if (!requester || !receiver) {
            return res.status(404).json({ message: 'Requester or receiver not found.' });
        }

        // Find and delete the existing pending FriendRequest
        const deletedRequest = await FriendRequest.findOneAndDelete({
            requester: requesterId,
            receiver: receiverId,
            status: 'pending',
        });




        requester.StatusRequest = "Add Friend";
        requester.StatusAccept = "Accept Request";
        await requester.save();
        receiver.StatusRequest = "Add Friend";
        receiver.StatusAccept = "Accept Request";
        await receiver.save();

        if (deletedRequest) {
            res.status(200).json({ message: 'Friend request cancelled.' });
        } else {
            res.status(404).json({ message: 'No pending friend request found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
//request send 
export const statusCheck = async (req, res) => {
    try {

        const { userId } = req.params;
        // console.log("🚀 ~ file: :", userId)


        const friendRequests = await FriendRequest.find({ userId })
        // console.log('friendRequests', friendRequests)
        // .populate({
        //     path: "requester",
        //     select: ["_id", "firstName", "lastName", "avatar"],
        // });


        // const filteredFriendRequests = friendRequests.filter(request => request.status !== 'pending');
        // const requestedUsers = filteredFriendRequests.map((request) => request.requester);

        res.status(200).json({ message: "Successfully Get Status", friendRequests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Backend - Retrieve requested users
export const getAllRequestedUsers = async (req, res) => {
    try {

        const { userId } = req.params;

        const friendRequests = await FriendRequest.find({
            receiver: userId,
            status: "pending",
        })
            .populate({
                path: "requester",
                select: ["_id", "firstName", "lastName", "avatar"],
            });



        const filteredFriendRequests = friendRequests.filter(request => request.status !== 'accepted');


        const requestedUsers = filteredFriendRequests.map((request) => request.requester);

        res.status(200).json(requestedUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};






//get All FriendShip Members


// export const getAllFriendShip = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         const friendRequests = await Friendship.find({
//             $or: [
//                 { user1: userId },
//                 { user2: userId }
//             ]
//         })
//             .populate({
//                 path: "user1",
//                 select: ["_id", "firstName", "lastName", "avatar"],
//             });

//         const friendships = friendRequests.map((friendship) => {
//             const friendId = (friendship.user1.toString() === userId) ? friendship.user2 : friendship.user1;
//             return {
//                 _id: friendship._id,
//                 friend: friendId,
//             };
//         });

//         res.status(200).json(friendships);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };
