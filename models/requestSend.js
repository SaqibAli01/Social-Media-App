import { Schema, model } from "mongoose";

const requestSchema = new Schema({
    requester: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sendRequest: {
        type: String,
        default: "Cancel Request",
    },
    AcceptRequest: {
        type: String,
        default: "Friend",
    },

    status: {
        type: String,
        default: 'pending',
    },
});

const FriendRequest = model("FriendRequest", requestSchema);
export default FriendRequest;
