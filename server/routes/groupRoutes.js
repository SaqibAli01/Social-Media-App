import express from "express";
import { createGroup, getGroupsCreatedByUser } from "../controllers/groupController.js";


const router = express.Router();

router.post("/create-group", createGroup);
router.get("/user-groups/:userId", getGroupsCreatedByUser);
export default router;
