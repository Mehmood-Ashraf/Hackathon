import express from "express";
import { login, logout, register, updatePassword, verifyOTP } from "../controllers/auth.controllers.js";
import upload from "../middlewares/multer.js";

const router = express.Router()

router.post('/register',  register) //upload.single("img"),
router.post('/verifyEmail', verifyOTP)
router.post('/login', login)
router.post('/logout', logout)
router.post('forgetPassword', updatePassword)

export default router