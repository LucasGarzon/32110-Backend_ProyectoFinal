import { Router } from "express";
import { createUser, getUsers, deleteUser, updateUser } from "../controllers/user.controller.js";

const router = new Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

const userRouter = router;
export { userRouter };