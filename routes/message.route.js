import {Router} from "express";
import {
  allMessages,
  sendMessage,
} from "../controllers/messageControllers.js"
import { authorizeRoles } from "../middlewares/auth.middleware.js"
import { ROLES } from "../constants/role.constants.js"

const router = Router();
const path = "/message"

router.post(`${path}/send`, authorizeRoles([ROLES.SELLER]), sendMessage);
router.get(`${path}/get/:chatId`, authorizeRoles([ROLES.SELLER]), allMessages);

export default router