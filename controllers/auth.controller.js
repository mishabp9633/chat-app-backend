import { login } from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import { ROLES } from "../constants/role.constants.js";

//..........google sso............//
export async function googleData(req,res,next){
  res.status(200).json({
		message:"success"
	})  
}

export async function googleCheck(req, res){

    let token = jwt.sign(
      { _id: req.user.id },
      process.env.TOKEN_KEY
    ); 

    let role = ROLES.SELLER
    let tokenRole={
    role,
    token
    }

      res.send(tokenRole)
  }
//..........google sso............//

//...........login...............// 
export async function signIn(req, res, next) {
  
    const loginData = req.body
  
    try {
      const response = await login(loginData)
      res.status(200).send(response);
      }
    catch (err) {
      console.log(err);
      next(err);
    } 
} 


export async function logoutUser(req, res, next) {
  try {
      res.cookie('x-auth-token')
      res.status(200).send({ message: 'Successfully logged out' });
  
  } catch (err) {
    console.log(err);
    next(err);
  }
}
//...........login...............// 


