import { Router } from "express";
import { createUser, deleteUser, updateUser, userAuth, userLogOut, logChecker} from "../controllers/user.controller.js";

const router = new Router();

router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/signup", (req, res) => {
  res.render('signup')
});
router.get("/login", (req,res) => {
  res.render('login')
});
router.post('/login', userAuth);
router.get('/logout', userLogOut);

const userRouter = router;
export { userRouter };