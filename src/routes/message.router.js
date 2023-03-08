import { Router } from "express";
import { createMessage, getAllMessages } from "../controllers/message.controller.js";

const router = new Router();

router.get('/', getAllMessages); 
router.post('/', createMessage); 

const messageRouter = router;
export { messageRouter }