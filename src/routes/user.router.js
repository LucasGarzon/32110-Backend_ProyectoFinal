import { Router } from "express";
import { createUser, deleteUser, updateUser, userAuth, userLogOut, logChecker, outlineChecker} from "../controllers/user.controller.js";

const router = new Router();

router.get("/", logChecker, (req, res) => {
  res.redirect("/productos")
})
router.post("/", createUser);
router.put("/:id", logChecker, updateUser);
router.delete("/:id", logChecker, deleteUser);
router.get("/signup", outlineChecker, (req, res) => {
  res.render('signup')
});
router.get("/login", outlineChecker, (req,res) => {
  res.render('login')
});
router.post('/login', outlineChecker,userAuth);
router.get('/logout', logChecker, userLogOut);

const userRouter = router;
export { userRouter };