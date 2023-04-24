import express from "express";
import {
  signIn,
  logoutUser,
  googleData,
  googleCheck,
} from "../controllers/auth.controller.js";
import { loginValidator } from "../middlewares/login.validation.middleware.js";
import passport from "passport";


const router = express.Router();
const path = "/auth";

//........user login and log out...........//
router.post(`${path}/user-signin`, loginValidator, signIn);
router.post(`${path}/user-logout`, logoutUser);

//.........google sign in.........//
router.get(`${path}/google`, passport.authenticate('google', {
  session: false,
  scope: ['profile', 'email'],
  accessType: 'offline',
  approvalPrompt: 'force'
}), googleData)

router.get(`${path}/google/callback`, passport.authenticate('google', {
  failureRedirect: '/login',
  session: false
}),googleCheck)



export default router;
