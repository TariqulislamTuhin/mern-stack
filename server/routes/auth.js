import express from "express";
import { currentUser, forgotPassword, login, register } from "../controllers/authController";
import { requireSignin } from "../middleware/auth";
const router = express.Router();

//routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/current-user", requireSignin, currentUser);

module.exports = router;
