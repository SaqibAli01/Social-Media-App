import Friendship from "../models/FriendShipModel.js";
import FriendRequest from "../models/requestSend.js";
import User from "../models/userModel.js";

// Sending Friend Request
export const sendFriendRequest = async (req, res) => {
    try {
        const { requesterId, receiverId } = req.body;

        const requester = await User.findById(requesterId);
        const receiver = await User.findById(receiverId);

        if (!requester || !receiver) {
            return res.status(404).json({ message: 'Requester or receiver not found.' });
        }



        //friend find 
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

        const newStatus = {
            requesterId: requesterId,
            receiverId: receiverId,
            sendRequestStatus: 'pending',
            acceptRequestStatus: 'pending',
            status: "Send Request",
        };

        requester.status.push(newStatus);
        receiver.status.push(newStatus);

        await requester.save();
        await receiver.save();

        requester.statusChecked = "pending";
        await requester.save();

        receiver.statusChecked = "pending";
        await receiver.save();




        res.status(200).json({ message: 'Friend request sent.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//Cancel Friend Request
export const cancelFriendRequest = async (req, res) => {
    try {
        const { requesterId, receiverId } = req.body;

        const requester = await User.findById(requesterId);
        const receiver = await User.findById(receiverId);

        if (!requester || !receiver) {
            return res.status(404).json({ message: 'Requester or receiver not found.' });
        }

        const existingRequest = await FriendRequest.findOneAndDelete({
            requester: requesterId,
            receiver: receiverId,
            status: 'pending',
        });

        if (!existingRequest) {
            return res.status(400).json({ message: 'Friend request not found or already accepted.' });
        }

        // Remove the status entry for the canceled request
        requester.status = requester.status.filter(statusEntry =>
            statusEntry.requesterId !== requesterId || statusEntry.receiverId !== receiverId
        );
        await requester.save();

        receiver.status = receiver.status.filter(statusEntry =>
            statusEntry.requesterId !== requesterId || statusEntry.receiverId !== receiverId
        );
        await receiver.save();

        requester.statusChecked = "Add Friend";
        await requester.save();


        receiver.statusChecked = "Add Friend";
        await receiver.save();

        res.status(200).json({ message: 'Friend request canceled.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


//request Accept
export const acceptFriendRequest = async (req, res) => {
    try {
        const { requesterId, receiverId } = req.body;

        const requester = await User.findById(requesterId);
        const receiver = await User.findById(receiverId);

        if (!requester || !receiver) {
            return res.status(404).json({ message: 'Requester or receiver not found.' });
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

        // Update the status for requester and receiver
        requester.status = requester.status.map(statusEntry => {
            if (
                statusEntry.requesterId === requesterId &&
                statusEntry.receiverId === receiverId
            ) {
                return {
                    ...statusEntry,
                    sendRequestStatus: 'accepted',
                    acceptRequestStatus: 'accepted',
                };
            }
            return statusEntry;
        });
        await requester.save();

        receiver.status = receiver.status.map(statusEntry => {
            if (
                statusEntry.requesterId === requesterId &&
                statusEntry.receiverId === receiverId
            ) {
                return {
                    ...statusEntry,
                    sendRequestStatus: 'accepted',
                    acceptRequestStatus: 'accepted',
                };
            }
            return statusEntry;
        });
        await receiver.save();

        const newStatus = {
            requesterId: requesterId,
            receiverId: receiverId,
            sendRequestStatus: 'Accepted',
            acceptRequestStatus: 'Accepted',
            status: "Friend",
        };

        requester.status.push(newStatus);
        receiver.status.push(newStatus);

        await requester.save();
        await receiver.save();

        requester.statusChecked = "Friend";
        await requester.save();

        res.status(200).json({ message: 'Friend request accepted and friendship created.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//request statusCheck 
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

export const getAllFriendShip = async (req, res) => {
    try {
        const { userId } = req.params;

        const friendRequests = await Friendship.find({
            $or: [
                { user1: userId },
                { user2: userId }
            ]
        })
            .populate({
                path: "user1",
                select: ["_id", "firstName", "lastName", "avatar"],
            });

        const friendships = friendRequests.map((friendship) => {
            const friendId = (friendship.user1.toString() === userId) ? friendship.user2 : friendship.user1;
            return {
                _id: friendship._id,
                friend: friendId,
            };
        });

        res.status(200).json(friendships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
