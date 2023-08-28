import { Group } from "../models/CreateGroup.js";
import GroupInvitation from "../models/groupInviteModel.js";
import GroupMember from "../models/groupMember.js";
import User from "../models/userModel.js";


// Send Invite to Group
export const sendInviteRequest = async (req, res) => {
    try {
        const { senderId, receiverId, groupId } = req.body;

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);
        const group = await Group.findById(groupId);

        if (!sender || !receiver || !group) {
            return res.status(404).json({ message: 'Sender, Receiver, or Group not found.' });
        }

        const existingRequest = await GroupInvitation.findOne({
            sender: senderId,
            receiver: receiverId,
            group: groupId,
            requestStatus: 'pending',
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'Invite request is already sent.' });
        }

        const newInviteRequest = new GroupInvitation({
            sender: senderId,
            receiver: receiverId,
            group: groupId,
            requestStatus: 'pending',
        });
        await newInviteRequest.save();


        const newStatus = {
            senderUser: senderId,
            receiverUser: receiverId,
            senderGroup: groupId,
            sendInviteStatus: 'pending',
            acceptInviteStatus: 'pending',
            status: 'Send Invite',
        };

        sender.groupInvite.push(newStatus);
        receiver.groupInvite.push(newStatus);

        await sender.save();
        await receiver.save();

        sender.inviteStatus = 'pending';
        await sender.save();

        receiver.inviteStatus = 'pending';
        await receiver.save();

        res.status(200).json({ message: 'Invite Request Sent Successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//Cancel Invite to Group
export const cancelInviteRequest = async (req, res) => {
    try {

        const { senderId, receiverId, groupId } = req.body;

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);
        const group = await Group.findById(groupId);



        if (!sender || !receiver || !group) {
            return res.status(404).json({ message: 'Sender, Receiver, or Group not found.' });
        }

        const existingRequest = await GroupInvitation.findOneAndDelete({
            sender: senderId,
            receiver: receiverId,
            group: groupId,
            requestStatus: 'pending',
        });

        if (!existingRequest) {
            return res.status(400).json({ message: 'Invite Group Request not found or Already Cancel Invite.' });
        }

        // Remove the inviteStatus List
        sender.groupInvite = sender.groupInvite.filter(inviteEntry =>
            inviteEntry.senderUser !== senderId || inviteEntry.receiverUser !== receiverId || inviteEntry.senderGroup !== groupId
        );
        await sender.save();

        receiver.groupInvite = receiver.groupInvite.filter(inviteEntry =>
            inviteEntry.senderUser !== senderId || inviteEntry.receiverUser !== receiverId || inviteEntry.senderGroup !== groupId
        );
        await receiver.save();


        sender.inviteStatus = 'Add Member';
        await sender.save();

        receiver.inviteStatus = 'Add Member';
        await receiver.save();

        res.status(200).json({ message: 'Invite Request Canceled.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


//Accept Invite to Group
export const acceptInviteRequest = async (req, res) => {
    try {

        const { senderId, receiverId, groupId } = req.body;
        console.log(" body:", req.body)

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);
        const group = await Group.findById(groupId);


        if (!sender || !receiver || !group) {
            return res.status(404).json({ message: 'Sender, Receiver, or Group not found.' });
        }

        const existingRequest = await GroupInvitation.findOne({
            sender: senderId,
            receiver: receiverId,
            group: groupId,
            requestStatus: 'pending',
        });
        console.log('existingRequest', existingRequest)

        if (existingRequest) {
            return res.status(400).json({ message: 'Invite request not found or already accepted.' });
        }


        if (existingRequest.requestStatus === 'accepted') {
            return res.status(400).json({ message: 'Invite request has already been accepted.' });
        }

        existingRequest.requestStatus = 'accepted';
        await existingRequest.save();

        const newMemberAdd = new GroupMember({
            user: sender,
            group: receiver,
            status: "accepted"
        });
        await newMemberAdd.save();

        // Update the status Sender & Receiver

        sender.groupInvite = sender.groupInvite.map(statusEntry => {
            if (
                statusEntry.senderUser === senderId && statusEntry.receiverUser === receiverId && statusEntry.senderGroup === groupId
            ) {
                return {
                    ...statusEntry,
                    sendInviteStatus: 'accepted',
                    acceptInviteStatus: 'accepted',
                };
            }
            return statusEntry;
        });
        await requester.save();

        receiver.groupInvite = receiver.groupInvite.map(statusEntry => {
            if (
                statusEntry.senderUser === senderId && statusEntry.receiverUser === receiverId && statusEntry.senderGroup === groupId

            ) {
                return {
                    ...statusEntry,
                    sendInviteStatus: 'accepted',
                    acceptInviteStatus: 'accepted',
                };
            }
            return statusEntry;
        });
        await receiver.save();




        const newStatus = {
            senderUser: senderId,
            receiverUser: receiverId,
            senderGroup: groupId,
            sendInviteStatus: 'accepted',
            acceptInviteStatus: 'accepted',
            status: 'Group Member',
        };

        sender.groupInvite.push(newStatus);
        receiver.groupInvite.push(newStatus);

        await sender.save();
        await receiver.save();

        sender.inviteStatus = 'Member';
        await sender.save();

        receiver.inviteStatus = 'Member';
        await receiver.save();


        res.status(200).json({ message: 'Member request accepted & Add Member In Group.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//Invite statusCheck 
export const inviteStatusCheck = async (req, res) => {
    try {

        const { userId } = req.params;
        // console.log("🚀 ~ file: :", userId)


        const GroupMember = await GroupMember.find({ userId })
        // console.log('friendRequests', friendRequests)
        // .populate({
        //     path: "requester",
        //     select: ["_id", "firstName", "lastName", "avatar"],
        // });


        // const filteredFriendRequests = friendRequests.filter(request => request.status !== 'pending');
        // const requestedUsers = filteredFriendRequests.map((request) => request.requester);

        res.status(200).json({ message: "Successfully Get Status Group Member", GroupMember });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get All Member
export const getAllRequestedMember = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('userId', userId);

        const friendRequests = await GroupInvitation.find({
            $or: [
                { sender: userId },
                { receiver: userId },
                { group: userId },
            ],
            requestStatus: "pending"
        })
            .populate({
                path: "sender",
                select: ["_id", "firstName", "lastName", "avatar"],
            })
            .populate({
                path: "receiver",
                select: ["_id", "firstName", "lastName", "avatar"],
            })
            .populate({
                path: "group",
                select: ["_id", "name", "privacy", "avatar", "roles", "admin"],
            })


        const filteredFriendRequests = friendRequests.filter(request => request.requestStatus !== 'accepted');

        const requestedUsers = filteredFriendRequests.map(request => {
            const isSender = request.sender._id.toString() === userId;
            return {
                user: isSender ? request.receiver : request.sender,
                group: request.group
            };
        });

        res.status(200).json(requestedUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

