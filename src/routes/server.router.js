import { Router } from "express";
import { getInformation } from "../controllers/server.controller.js";
import { logChecker } from "../controllers/user.controller.js";

const router = new Router();

router.get('/', logChecker ,getInformation)

const serverRouter = router;
export { serverRouter }; 