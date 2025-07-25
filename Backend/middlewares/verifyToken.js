import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req?.cookies?.access_token || req.headers?.["authorization"]?.replace("Bearer ", "")
  console.log(req.headers)
  if (!token) {
    console.log("Not token")
    return errorHandler(res, 401, "You are not authenticated!");
  }
  try {
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(verifiedUser)
    req.user = verifiedUser;
    next();
  } catch (error) {
    console.log(error)
    return errorHandler(res, 400, "Token not verified");
  }
};