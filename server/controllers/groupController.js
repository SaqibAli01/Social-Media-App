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
        console.log("🚀 ~ groupsd:", groups)

        res.status(200).json({ success: true, groups });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error Group ", error: error.message });
    }
};