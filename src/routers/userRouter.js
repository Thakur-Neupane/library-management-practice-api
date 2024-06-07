import express from "express";
import { createNewUser } from "../models/user/UserModel.js";
import { hashPassword } from "../utils/bcrypt.js";
import { newUserValidation } from "../middlelwares/joivalidation.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "todo GET",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", newUserValidation, async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const user = await createNewUser(req.body);

    user?._id
      ? res.json({
          status: "success",
          message: "Your account has been created successfully.",
        })
      : res.json({
          status: "error",
          message: "Unable to create account, try again later",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      error.message =
        "Another user already exist with this email, change your details and try again later. ";
      error.status = 200;
    }
  }
});
export default router;
