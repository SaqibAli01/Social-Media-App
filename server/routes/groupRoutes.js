import express from "express";
import { createGroup, getGroupsCreatedByUser, groupProfileChange } from "../controllers/groupController.js";
import { upload } from '../middleware/multer.js';
import { acceptInviteRequest, cancelInviteRequest, getAllRequestedMember, inviteStatusCheck, sendInviteRequest } from "../controllers/InviteGroupController.js";

const router = express.Router();

router.post("/create-group", createGroup);
router.get("/user-groups/:userId", getGroupsCreatedByUser);
router.post("/api/v1/change-profile", upload.single("avatar"), groupProfileChange);

router.post('/send-invite', sendInviteRequest);
router.post('/invite-cancel', cancelInviteRequest);
router.post('/invite-accept', acceptInviteRequest)
router.get('/invite-status/:userId', inviteStatusCheck);
router.post('/get-all-member/:userId', getAllRequestedMember);



// router.post('/getFriendShip/:userId', getAllFriendShip);




export default router;
