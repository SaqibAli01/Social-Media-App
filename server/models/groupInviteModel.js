import { Schema, model } from "mongoose";

const groupInvitationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
    requestStatus: {
        type: String,
        default: "pending",
        // enum: ["pending", "accepted", "rejected"],
    },
});

const GroupInvitation = model("GroupInvitation", groupInvitationSchema);
export default GroupInvitation;


