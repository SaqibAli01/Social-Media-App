import express from "express";
import { AcceptFriend, cancelFriendRequest, getAllRequestedUsers, sendFriendRequest, statusCheck } from "../controllers/RequsetController.js";

// import { verifyLoginUser } from '../middleware/auth.js';

const router = express.Router();
router.post('/send-request', sendFriendRequest)
router.post('/acceptRequest', AcceptFriend)
router.post('/request-cancel', cancelFriendRequest);
router.post('/request/:userId', getAllRequestedUsers);
// router.post('/getFriendShip/:userId', getAllFriendShip);

router.get('/status/:userId', statusCheck);


export default router;
