import bcrypt from "bcrypt";
import { successHandler } from "../utils/successHandler.js";
import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/User.js";
import { generateOTP } from "../utils/generateOTP.js";
import { sendMail } from "../utils/sendMail.js";
import { generateToken } from "../utils/generateToken.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { userName, email, password, country, city } = req.body;
  const imagePath = req.file ? req.file.path : null;
  if (!userName || !email || !password || !country || !city) {
    return errorHandler(res, 400, "Missing Fields!");
  }

  const isExist = await User.findOne({
    $or: [{ email: email }, { userName: userName }],
  });
  if (isExist) {
    return errorHandler(
      res,
      400,
      "Username or Email already taken retry with another Name or Email"
    );
  }

  try {
    const otp = generateOTP();

    const emailSent = await sendMail(email, otp);
    if (!emailSent) {
      return errorHandler(res, 500, "Failed to send mail!");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      userName: userName,
      email: email,
      password: hashPassword,
      country: country,
      city: city,
      otp: otp,
      otpExpires: Date.now() + 600000,
      img: imagePath,
    });

    if (newUser) {
      const { password, otp, ...otherDetails } = newUser._doc;
      return successHandler(res, 201, "Email sent to user", otherDetails);
    } else {
      console.log("Error in sending mail");
      return errorHandler(res, 400, "Email not send");
    }
  } catch (error) {
    console.log(error.message);
    return errorHandler(res, 400, "Something went wrong!");
  }
};

export const verifyOTP = async (req, res) => {
  console.log("Verify otp chala")
  const { otp, _id } = req.body;
  if (!otp || !_id) {
    return errorHandler(res, 400, "Please provide both user id and OTP ");
  }

  try {
    const user = await User.findById(_id);

    if (!user) {
      return errorHandler(res, 400, "User not found by given ID");
    }

    if (user.otp !== otp) {
      return errorHandler(res, 400, "Invalid OTP");
    }

    if (user.otpExpires < Date.now()) {
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();
      return errorHandler(
        res,
        400,
        "OTP has expired. Please request a new one."
      );
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const { password, ...userWithoutPassword } = user._doc;
    return successHandler(
      res,
      200,
      "Email verified successfully!",
      userWithoutPassword
    );
  } catch (error) {
    return errorHandler(
      res,
      500,
      "Something went wrong during email verification!"
    );
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return errorHandler(res, 400, "Email and Password are required");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return errorHandler(res, 400, "Invalid credentials!");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return errorHandler(res, 400, "Invalid credentials!");
    }

    if (!user.isVerified) {
      return errorHandler(
        res,
        400,
        "Your account is not Verified. Please verify your email to login"
      );
    }

    const token = generateToken(user);

    const {
      password: userPassword,
      otp,
      otpExpires,
      isAdmin,
      ...otherDetails
    } = user._doc;
    otherDetails.token = token
    res.cookie("access_token", token, { httpOnly: true });

    return successHandler(
      res,
      200,
      "User logged in successfully!",
      otherDetails
    );
  } catch (error) {
    console.error("Error during login", error.message);
    return errorHandler(res, 400, "Something went wrong during Login!");
  }
};

export const logout = (req, res) => {
  console.log("Run logout handler")
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });
    return successHandler(res, 200, "Logged out successfully!");
  } catch (error) {
    return errorHandler(res, 500, "Logout Failed!")
  }
};


export const updatePassword = (req, res) => {
  
}