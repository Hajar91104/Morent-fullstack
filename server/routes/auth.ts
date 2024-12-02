import { Router } from "express";

import {
  forgotPasswordSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validation/auth";
import validateSchema from "../middlewares/validator";
import User from "../mongoose/schemas/user";
import { authenticate, authorize } from "../middlewares/user";
import { hashPassword } from "../utils/bcrypt";
import { transporter } from "../utils/mail";
import crypto from "crypto";

const router = Router();

router.post("/login", authenticate, (req, res) => {
  res.json({
    message: "Login successful",
    user: req.user,
  });
});

router.post("/register", validateSchema(registerSchema), async (req, res) => {
  const user = req.matchedData;
  user.password = hashPassword(user.password);

  const userExist = await User.findOne({
    email: user.email,
  });

  if (userExist) {
    res.status(400).json({
      message: "User already exists with this email",
    });
    return;
  }

  const newUser = new User(user);
  await newUser.save();

  const userObj = newUser.toObject();
  delete userObj.password;
  delete userObj.__v;

  res.json({
    message: "Register successful",
    user: userObj,
  });
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }

    res.json({
      message: "Logout successful",
    });
  });
});

router.get("/current-user", authorize({ isAdmin: false }), (req, res) => {
  res.json({
    user: req.user,
  });
});

router.post(
  "/forgot-password",
  validateSchema(forgotPasswordSchema),
  async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "User not found with this email",
      });
      return;
    }
    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordTokenExpires = Date.now() + 3600000;
    await user.save();
    transporter.sendMail({
      from: '"Authentication 👻" <dadasovsuleyman126@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Reset Your Password", // Subject line
      html: `
        <h1>Reset Your Password</h1>
        <p>Click <a href="http://localhost:5173/reset-password/${token}">here</a> to reset your password</p>
        <p>If you didn't request this, please ignore this email</p>
        <p>Your token will expire in 1 hour</p>
        <p>Your token is: ${token}</p>
      `,
    });
    res.json({
      message: "Email sent",
    });
  }
);

router.post(
  "/reset-password",
  validateSchema(resetPasswordSchema),
  async (req, res) => {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    user.password = hashPassword(password);
    user.resetPasswordToken = "";
    user.resetPasswordTokenExpires = null;
    await user.save();

    res.json({
      message: "Password reset successful",
    });
  }
);
export default router;
