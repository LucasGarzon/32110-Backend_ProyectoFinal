import { Router } from "express";
import { adminResponse, createMessage, getAllMessages, getMessageByEmail } from "../controllers/message.controller.js";
import { logChecker } from "../controllers/user.controller.js";

const router = new Router();

router.get('/', logChecker, getAllMessages); 
router.get('/:email', logChecker, getMessageByEmail); 
router.post('/', createMessage); 
router.put('/:id', adminResponse); 

const messageRouter = router;
export { messageRouter }