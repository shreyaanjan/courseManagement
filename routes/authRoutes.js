import express from "express";
import { getLoginPage, getRegisterPage, login, logout, register } from "../controller/authController.js";
const router = express.Router();

router.get("/register", getRegisterPage)
router.get('/login', getLoginPage)
router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)

export default router;