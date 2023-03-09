import { Router } from "express";
import { createMessage, getAllMessages, getMessageByEmail } from "../controllers/message.controller.js";

const router = new Router();

router.get('/', getAllMessages); 
router.get('/:email', getMessageByEmail); 
router.post('/', createMessage); 

const messageRouter = router;
export { messageRouter }