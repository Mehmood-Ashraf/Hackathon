import express from "express";
import { login, logout, register, verifyOTP } from "../controllers/auth.controllers.js";
import upload from "../middlewares/multer.js";

const router = express.Router()

router.post('/register', upload.single("img"), register)
router.post('/verifyEmail', verifyOTP)
router.post('/login', login)
router.post('/logout', logout)

export default router