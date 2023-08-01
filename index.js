
import database from "./config/database.js"
//_________App.js_________
import express from "express";

import cors from 'cors';
import path from "path";
// import user from './routes/userRoutes.js';
import post from './routes/postRoutes.js';
import comments from './routes/commentRoutes.js';
import likes from './routes/likeRoutes.js';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

//______App.js end_____________



//call to config file 
import { config } from 'dotenv';
import signUp, { forgotPassword, logout, resendOtpNo, resendVerificationCode, resetPassword, updatePassword, updateProfile, updateUserInfo, userAuth, userLogin, verifyCode, verifyCodePhoneNo } from "./controllers/userController.js";
import { upload } from "./middleware/multer.js";
import { verifyLoginUser } from "./middleware/auth.js";
config();

//call to database
database()

//________App.js_____________
const app = express()
app.use(cors());
app.use(express.json());

// Routes
// app.use(user);
app.use(post);
app.use(comments);
app.use(likes);
//________________________________________________________________

const router = express.Router();
router.post('/api/v1/signup', upload.single('avatar'), signUp);

router.post('/api/v1/verify', verifyCode);
router.post('/api/v1/resend-verification', resendVerificationCode);
router.post('/api/v1/isVerify', verifyLoginUser, verifyCodePhoneNo);
router.post('/api/v1/re-send-Otp', verifyLoginUser, resendOtpNo);
router.post('/api/v1/login', userLogin);
router.post("/api/v1/forgotPassword", forgotPassword)
router.post('/api/v1/password/reset/:token', resetPassword);
router.get('/api/v1/auth', verifyLoginUser, userAuth);
router.put('/api/v1/update/password', verifyLoginUser, updatePassword);
router.put('/api/v1/updateProfile', upload.single('avatar'), verifyLoginUser, updateProfile);
router.put('/api/v1/updateUserInfo', verifyLoginUser, updateUserInfo);
router.get('/api/v1/logout', verifyLoginUser, logout);
//________________________________________________________________

// app.use((req, res) => {
//     res.status(200).json({ message: "Success!" });
// })

//multer //image frontend
app.use("/uploads", express.static("uploads"));
//frontend connect 
app.use(express.static(path.join(path.resolve(), "static")));

//______end app.js ____

//frontend connect







// if (process.env.NODE_ENV === 'production') {
//     // Serve the frontend build files
//     app.use(express.static(clientBuildDir2));

//     // Serve the frontend's index.html for all other routes
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(clientBuildDir2));
//     });
// }






//         const __filename = fileURLToPath(import.meta.url);
//         const currentDir = dirname(__filename);
//         const parentDir = dirname(currentDir);
//         const clientBuildDir = join(parentDir, 'client', 'build', 'index.html');
//         const clientBuildDir2 = join(parentDir, 'client', 'public', 'index.html');
// app.use(express.static(clientBuildDir));

// app.get('*', (req, res) => {
//     res.sendFile(clientBuildDir2);
// });




// if (process.env.NODE_ENV === "production") {
//     app.get("/", (req, res) => {
//       app.use(express.static(path.resolve(__dirname, "frontend", "build")));
//       res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//     });
//   }


const PORT = process.env.PORT;
app.listen(process.env.PORT, () => {
    console.log(`-------------------------------------------`);
    console.log(`Server is working on http//localhost:${PORT}`)
});
