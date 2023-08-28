import { Schema, model } from "mongoose";

const groupMemberSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
    status: {
        type: "String",
        default: "pending",
    }
});

const GroupMember = model('GroupMember', groupMemberSchema);

export default GroupMember;
