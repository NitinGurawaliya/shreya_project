import express from "express";
import { signin, signup } from "../controllers/user.Controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter  = express.Router();

userRouter.post("/signup",signup)
userRouter.post("/signin",signin)


export default userRouter