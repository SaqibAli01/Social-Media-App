import { Group } from "../models/CreateGroup.js";



// --------------------------- Create a new group ------------------------------
export const createGroup = async (req, res) => {
    try {
        const { name, privacy, admin, inviteFriends, avatar } = req.body;
        const newGroup = new Group({
            name,
            privacy,
            admin,
            inviteFriends,
            avatar,
        });

        await newGroup.save();

        res.status(201).json({ success: true, message: "Group created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create group", error: error.message });
    }
};

//----------------------------- Get Group Create By User-----------------------------------
export const getGroupsCreatedByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const groups = await Group.find({ admin: userId });

        res.status(200).json({ success: true, groups });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error Group ", error: error.message });
    }
};


//------------------------------------ Group Image Change --------------------------------
export const groupProfileChange = async (req, res) => {
    try {
        const groupId = req.body.groupId;

        const groupFind = await Group.findById(groupId);


        if (!groupFind) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (req.file) {
            groupFind.avatar = req.file.path;
        }

        await groupFind.save();

        res.status(200).json({ message: 'Profile updated successfully' });

    } catch (error) {

        console.error('An error occurred while updating group profile.', error);

        res.status(500).json({ message: 'Failed to update group profile' });
    }
};

//get all user
export const getAllGroup = async (req, res) => {
    try {
        const group = await Group.find()
            .populate({
                path: "admin",
                select: ["firstName", "lastName", "avatar"],
            });
        res.status(200).json(group);


    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: "An error occurred while retrieving Group." });
    }
};