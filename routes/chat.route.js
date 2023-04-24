import {Router} from "express";
import {  
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,} from "../controllers/chatControllers.js"

import { authorizeRoles } from "../middlewares/auth.middleware.js"
import { ROLES } from "../constants/role.constants.js"

const router = Router();
const path = "/chat"

router.post(`${path}/user`, authorizeRoles([ROLES.SELLER]), accessChat);
router.get(`${path}/get`, authorizeRoles([ROLES.SELLER]), fetchChats);
router.post(`${path}/group/create`, authorizeRoles([ROLES.SELLER]), createGroupChat);
router.put(`${path}/group/rename`, authorizeRoles([ROLES.SELLER]), renameGroup);
router.put(`${path}/group/user/remove`, authorizeRoles([ROLES.SELLER]), removeFromGroup);
router.put(`${path}/group/user/add`, authorizeRoles([ROLES.SELLER]), addToGroup);

export default router
