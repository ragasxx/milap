import {User} from"../models/User.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "Please Login First",
      });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode._id);
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
