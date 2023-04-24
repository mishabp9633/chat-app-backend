import userModel from '../models/user.model.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {HttpException} from '../exceptions/exceptions.js';

export async function login(loginData){
   const user = await  userModel.findOne({username:loginData.username})
   
   console.log("user: ", user);

   if (!user) 
    throw new HttpException(404, "username or password is invalid");
   

     const validpassword = await bcrypt.compare(loginData.password, user.password);
     console.log("validpassword :", validpassword);

     if (!validpassword)
     throw new HttpException(404, "username or password is invalid");
     
     let token = jwt.sign(
       { _id: user._id },
       process.env.TOKEN_KEY
     ); 
     let tokenRole={
      role:user.role,
      token
     }
     return {tokenRole}
}

