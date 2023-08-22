import mongoose from 'mongoose';

const { Schema } = mongoose;

const userStatusSchema = new Schema({
    requesterId: {
        type: String,
        default: "Add Friend",
    },
    receiverId: {
        type: String,
        default: "",
    },
    sendRequestStatus: {
        type: String,
        default: "pending",
    },
    acceptRequestStatus: {
        type: String,
        default: "pending",
    },
    status: {
        type: String,
        default: "Add Friend",
    }
});

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    newEmail: { type: String, default: null },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'],
    },
    avatar: {
        type: String,
    },
    roles: {
        type: [String],
        enum: ["user", "admin",],
        default: ["user"],
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    //email verification
    verified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        default: null,
    },
    verificationCodeExpiresAt: {
        type: Date,
        default: null,
    },
    // New fields for phone verification
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    // Use the statusArray 
    // status: [new Schema({
    //     name: String,
    //     type: String,
    //     default: String,
    // })],
    statusChecked: {
        type: String,
        default: "Add Friend",
    },
    status: [userStatusSchema],



    // isVerificationCode: {
    //     type: String,
    //     default: null,
    // },
    // isVerificationCodeExpiresAt: {
    //     type: Date,
    //     default: null,
    // },

    //newEmail updates the email
    newEmailVerified: {
        type: Boolean,
        default: true,
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },



    resetPasswordToken: String,
    resetPasswordExpire: Date,


});

const User = mongoose.model('User', userSchema);

export default User;

