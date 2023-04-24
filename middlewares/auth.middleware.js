import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const authorizeRoles = (roles) =>
  async (req, res, next) => {
    console.log('roles: ',roles)

    const token =
      (req.header("Authorization") &&
        req.header("Authorization").split("Bearer ")[1]) ||
      null;

    if (!token) {
      return res
        .status(401)
        .send({ message: "Access denied. No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const user = await userModel.findOne({ _id: decoded._id });

      if (!user) {
        return res.status(400).send({ message: "Invalid user" });
      }

      const authorizedRole = roles.find((role) => user.role === role );

      if (!authorizedRole) {
        return res
          .status(403)
          .send({ message: "Access denied. Not an authorized role" });
      }

      req.body.user = user;
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Invalid token" });
    }
  };


