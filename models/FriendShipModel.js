import { Schema, model } from "mongoose";

const friendshipSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    user2: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Friendship = model('Friendship', friendshipSchema);

export default Friendship;

