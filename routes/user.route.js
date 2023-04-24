import express from "express";
import {
  getuser,
  getusers,
  updateData,
  userData,
  forgot,
  reset,
  getUserByToken,
  updateUserByToken,
  deleteUserByToken,
  deleteUserByAdminData,
  checkUsername,
} from "../controllers/user.controller.js";

import { userMiddleware } from "../middlewares/user.middleware.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";
import { ROLES } from "../constants/role.constants.js";

const router = express.Router();
const path = "/user";

//..............seller..............//
router.post(`${path}/signup`, userMiddleware, userData);
router.post(`${path}/forgotpassword`, forgot);
router.post(`${path}/resetpassword/:id`, reset);
router.get(`${path}/get`, authorizeRoles([ROLES.SELLER,ROLES.ADMIN]), getUserByToken)
router.post(`${path}/update`, authorizeRoles([ROLES.ADMIN,ROLES.SELLER]), updateUserByToken);
router.post(`${path}/delete`, authorizeRoles([ROLES.SELLER]), deleteUserByToken);

//............admin...............//
router.get(`${path}/user-all`, authorizeRoles([ROLES.ADMIN]), getusers);
router.get(`${path}/user-single/:id`, authorizeRoles([ROLES.ADMIN, ROLES.SELLER]), getuser);
router.put(`${path}/user-update/:id`, authorizeRoles([ROLES.ADMIN]), updateData);
router.delete(`${path}/user-delete/:id`, authorizeRoles([ROLES.ADMIN]), deleteUserByAdminData);

//.................username check...........//
router.post(`${path}/username/check`, checkUsername);

export default router;
