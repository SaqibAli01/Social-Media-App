import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import { sendVerificationCode } from "../utils/sendEmailSignUp.js";
import generateVerificationCode from "../utils/VerificationCode.js";
import { sendOTPNo } from "../utils/SendOtpPhoneNo.js";
// import crypto from "crypto"

// ___________________________Sign Up________________________



// const generateVerificationCode = () => {
//     return Math.random().toString(36).substr(2, 6).toUpperCase();
// };



const signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phoneNumber, dob, gender } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registered' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload your image' });
        }

        const avatarPath = req.file.path;
        const encPassword = await bcrypt.hash(password, 12);

        // Generate a verification code for email
        const verificationCode = generateVerificationCode();
        const verificationCodeExpiresAt = new Date(Date.now() + 120000); // 120,000 milliseconds = 2 minute (adjust as needed)

        // Generate a verification code for phone number
        // const isVerificationCode = generateVerificationCode();
        // const isVerificationCodeExpiresAt = new Date(Date.now() + 120000); // 900,000 milliseconds = 15 minute (adjust as needed)


        // console.log('verificationCode', verificationCode);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: encPassword,
            phoneNumber,
            dob,
            gender,
            avatar: avatarPath,
            verified: false, //for email
            verificationCode,
            verificationCodeExpiresAt,
            // isVerified: false, //for Phone No
            // isVerificationCode,
            // isVerificationCodeExpiresAt,
        });
        // console.log('newUser', newUser);
        await newUser.save();

        // Send the verification code to the user's email
        // console.log('email, verificationCode', email, verificationCode);
        await sendVerificationCode(email, verificationCode);
        // await sendOTPNo(phoneNumber, isVerificationCode)

        return res.status(201).json({
            success: true,
            message: "User created successfully. Please verify your Email.",
            email,
        });
    }
    catch (error) {
        console.error('Error in signUp:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default signUp;


export const verifyCode = async (req, res) => {
    try {

        const { email, verificationCode } = req.body;

        // const user = await User.findOne({ email });
        const user = await User.findOne({ verificationCode });


        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the verification code has expired
        if (user.verificationCodeExpiresAt < new Date()) {
            return res.status(400).json({ message: 'Verification code has expired' });
        }

        if (user.verificationCode === verificationCode) {
            // Update the user's record to mark it as verified
            await User.findByIdAndUpdate(user._id, { verified: true });
            user.verificationCode = undefined;
            user.verificationCodeExpiresAt = undefined;
            await user.save();
            return res.status(200).json({ message: 'Verification successful' });
        } else {
            return res.status(400).json({ message: 'Invalid verification code' });
        }
    } catch (error) {
        console.error('Error in verifyCode:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const resendVerificationCode = async (req, res) => {
    try {

        const { email } = req.body;

        const user = await User.findOne({ email });


        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.verified) {
            return res.status(400).json({ message: 'User is already verified' });
        }

        // Check if the verification code has expired
        if (user.verificationCodeExpiresAt && user.verificationCodeExpiresAt < new Date()) {
            // Generate a new verification code
            const verificationCode = generateVerificationCode();


            // Update the user's verification code and expiration time in the database
            user.verificationCode = verificationCode;
            user.verificationCodeExpiresAt = new Date(Date.now() + 60000); // 60,000 milliseconds = 1 minute (adjust as needed)
            await user.save();

            // Send the new verification code to the user's email
            await sendVerificationCode(email, verificationCode);

            return res.status(200).json({ message: 'Verification code resent successfully' });
        }
        else {
            return res.status(400).json({ message: 'Verification code is still valid' });
        }


    } catch (error) {
        console.error('Error in resendVerificationCode:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// verify phone number
export const verifyCodePhoneNo = async (req, res) => {
    try {
        const { phoneNumber, isVerificationCode } = req.body;


        // const user = await User.findOne({ email });
        const user = await User.findOne({ isVerificationCode });


        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the verification code has expired
        // if (user.isVerificationCodeExpiresAt < new Date()) {
        //     return res.status(400).json({ message: 'Verification code has expired' });
        // }

        // if (user.isVerificationCode === isVerificationCode) {
        //     // Update the user's record to mark it as verified
        //     await User.findByIdAndUpdate(user._id, { isVerified: true });
        //     user.isVerificationCode = undefined;
        //     user.isVerificationCodeExpiresAt = undefined;
        //     await user.save();
        //     return res.status(200).json({ message: 'Verification successful' });
        // } else {
        //     return res.status(400).json({ message: 'Invalid verification code' });
        // }
    } catch (error) {
        console.error('Error in verifyCode:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const resendOtpNo = async (req, res) => {
    try {
        const { email, phoneNumber } = req.body;


        const user = await User.findOne({ email });



        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User is already verified' });
        }

        // Check if the verification code has expired
        if (user.isVerificationCodeExpiresAt && user.isVerificationCodeExpiresAt < new Date()) {

            const isVerificationCode = generateVerificationCode();



            // Update the user's verification code and expiration time in the database
            // user.isVerificationCode = isVerificationCode;
            // user.isVerificationCodeExpiresAt = new Date(Date.now() + 120000) // 900000 milliseconds = 15 minutes (adjust as needed)
            // await user.save();

            // Send the new verification code to the user's phone number
            await sendVerificationCode(phoneNumber, isVerificationCode);

            return res.status(200).json({ message: 'Verification code resent successfully' });
        }
        else {
            return res.status(400).json({ message: 'Verification code is still valid' });
        }
    } catch (error) {
        console.error('Error in resendOtpNo:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        if (!user.verified) {
            return res.status(403).json({ message: "Account not verified. Please verify your email first." });
        }

        // if (!user.phoneNumber || !user.isVerified) {
        //     return res.status(401).json({ message: "Account not verified. Please verify your PhoneNo first." });
        //     // await res.status(201).json({ message: "Account not verified. Please verify your PhoneNo first." });
        // }

        const token = generateToken(email);

        res.status(200).json({ message: 'User signed in successfully . Please verify your PhoneNo first.', token, user });

    } catch (error) {
        console.error('Error in signIn User:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// ___________________________Forget password email________________________

export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const resetToken = generateToken(email);
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 3600000;

        await user.save();

        const verifyUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
        const message = `Your password reset token is ttemp :- \n\n${verifyUrl}\n\nIf you have not requested this email, please ignore it.`;

        await sendEmail({
            email: user.email,
            subject: 'My App Password Reset',
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
};


// ___________________________Reset Password________________________
export const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        const encPassword = await bcrypt.hash(password, 12);

        // Update the user's password and clear the reset token fields
        user.password = encPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        // Respond with a success message
        res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {

        console.error('Error in resetPassword:', error);
        res.status(500).json({ message: 'Failed to reset password' });
    }
};


// ___________________________User Auth________________________
export const userAuth = (req, res) => {

    res.status(200).json({ message: 'Authentication Successfully', user: req.user });
};


// ___________________________Update Password________________________
// export const updatePassword = async (req, res, next) => {
//     try {
//         const user = await User.findById(req.user._id);
//         const isPasswordMatched = await bcrypt.compare(
//             req.body.oldPassword.toString(),
//             user.password.toString()
//         );

//         if (!isPasswordMatched) {
//             return res.status(404).json({ message: 'Old password is incorrect' });
//         }

//         if (req.body.newPassword !== req.body.confirmPassword) {
//             return res.status(400).json({ message: 'Passwords do not match' });
//         }

//         const encPassword = await bcrypt.hash(req.body.newPassword, 12);
//         user.password = encPassword;
//         await user.save();

//         res.status(200).json({ success: true, message: 'Password updated successfully' });
//     } catch (error) {
//         console.error('Error in updatePassword:', error);
//         res.status(500).json({ message: 'Failed to update password' });
//     }
// };

export const updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        const isPasswordMatched = await bcrypt.compare(req.body.oldPassword, user.password,);


        if (!isPasswordMatched) {
            return res.status(404).json({ message: 'Old password is incorrect' });
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(400).json({ message: 'Password do not match' });
        }

        // Password bcrypt
        const encPassword = await bcrypt.hash(req.body.newPassword, 12);
        // user.password = req.body.newPassword;
        user.password = encPassword;
        await user.save();

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error in updatePassword:', error);
        res.status(500).json({ message: 'Failed to update password' });
    }
};

// ___________________________Update Profile________________________
export const updateProfile = async (req, res) => {
    try {
        // Find the user by ID
        const userId = req.user.id;


        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's avatar if provided
        if (req.file) {
            user.avatar = req.file.path;
        }

        // Save the updated user to the database
        await user.save();

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error in updateProfile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ___________________________Update User Info________________________

export const updateUserInfo = async (req, res) => {
    try {
        const { firstName, lastName, dob, gender, phoneNumber, email } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        if (user.email !== email) {

            const verificationCode = generateVerificationCode();
            const verificationCodeExpiresAt = new Date(Date.now() + 120000);
            user.newEmail = email;
            user.newEmailVerified = false;
            user.verificationCode = verificationCode;
            user.verificationCodeExpiresAt = verificationCodeExpiresAt;
            await sendVerificationCode(email, verificationCode);
        } else {
            user.newEmail = null;
            user.verificationCode = null;
            user.verificationCodeExpiresAt = null;
        }

        // Update the user's firstName, lastName, dob, and gender
        user.firstName = firstName;
        user.lastName = lastName;
        user.phoneNumber = phoneNumber;
        user.dob = dob;
        user.gender = gender;

        await user.save();

        res.status(201).json({ message: 'User Info updated successfully' });
    } catch (error) {
        console.error('Error in update user info:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const verifyEmail = async (req, res) => {


    try {
        const { userId, verificationCode } = req.body;


        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the verification code matches the one stored in the user document
        if (user.verificationCode === verificationCode) {

            user.email = user.newEmail;
            user.newEmail = null;
            user.verificationCode = null;
            user.verificationCodeExpiresAt = null;
            user.newEmailVerified = true;
            await user.save();

            return res.status(200).json({ message: 'Email verified successfully' });
        } else {
            return res.status(401).json({ message: 'Invalid verification code' });
        }
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




// export const updateUserInfo = async (req, res) => {
//     try {
//         const { firstName, lastName, dob, gender, phoneNumber, email } = req.body;
//         const userId = req.user.id;
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         if (user.email !== email) {
//             const verificationCode = generateVerificationCode();
//             const verificationCodeExpiresAt = new Date(Date.now() + 120000);

//             // Update the user's email and other fields
//             user.email = email;
//             user.verified = false;
//             user.verificationCode = verificationCode;
//             user.verificationCodeExpiresAt = verificationCodeExpiresAt;

//             // Send the verification code email
//             await sendVerificationCode(email, verificationCode);
//         } else {
//             // Update other fields without sending a new verification code
//             user.firstName = firstName;
//             user.lastName = lastName;
//             user.phoneNumber = phoneNumber;
//             user.dob = dob;
//             user.gender = gender;
//         }

//         await user.save();

//         res.status(201).json({ message: 'User Info updated successfully' });
//     } catch (error) {
//         console.error('Error in update user info:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
// export const verifyEmail = async (req, res) => {
//     console.log("first verification");

//     try {
//         const { userId, verificationCode } = req.body;
//         console.log("first userId", userId);
//         console.log("first verification", verificationCode);

//         // Find the user by ID
//         const user = await User.findById(verificationCode);
//         console.log("user verification", user.verificationCode);
//         console.log("user", user);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Check if the verification code matches the one stored in the user document
//         if (user.verificationCode === verificationCode) {
//             console.log("Verify True")
//             // user.email = user.newEmail;
//             // user.newEmail = null;
//             user.verificationCode = null;
//             user.verificationCodeExpiresAt = null;
//             user.verified = true;
//             await user.save();

//             return res.status(200).json({ message: 'Email verified successfully' });
//         } else {
//             return res.status(401).json({ message: 'Invalid verification code' });
//         }
//     } catch (error) {
//         console.error('Error verifying email:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// export const verifyEmail = async (req, res) => {
//     console.log("first verification",)

//     try {
//         const { userId, verificationCode } = req.body;
//         console.log("first verification", verificationCode)
//         // Find the user by ID
//         const user = await User.findById(verificationCode);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Check if the verification code matches the one stored in the user document
//         if (user.verificationCode === verificationCode) {
//             // Update the email with the new email and mark it as verified
//             user.email = user.newEmail;
//             user.newEmail = null;
//             user.verificationCode = null;
//             user.verificationCodeExpiresAt = null;
//             user.newEmailVerified = true;
//             await user.save();

//             return res.status(200).json({ message: 'Email verified successfully' });
//         } else {
//             return res.status(401).json({ message: 'Invalid verification code' });
//         }
//     } catch (error) {
//         console.error('Error verifying email:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// ___________________________Logout________________________

export const logout = (req, res) => {
    res.clearCookie('token'); // Clear the token cookie
    res.status(200).json({ message: 'Logged out successfully' });
};

//get all user
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find()
            .populate({
                path: "author",
                select: ["firstName", "lastName", "avatar"],
            });

        res.status(200).json(users);
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: "An error occurred while retrieving users." });
    }
};
