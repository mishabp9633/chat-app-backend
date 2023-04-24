import {
    getAllData, getSingleData, update, Delete, 
    save, forgotPassword, resetPassword, 
    // getDataUserByToken, 
    getDataAdminByToken,
    usernameCheck,
} from '../services/user.service.js'

import { google } from 'googleapis'
import userModel from "../models/user.model.js"
import { deleteUserProduct } from '../services/product.service.js'


export async function userData(req, res, next) {
    try {

        const userdata = req.body

        const result = await save(userdata)
        res.send(result)
    }
    catch (err) {
        console.log('err', err.statusCode)
        if (err.statusCode) {
            res.send(err.statusCode, err)
        } else {
            next(err)
        }
    }
}


export async function getusers(req, res, next) {
    try {
        const page = req.query.page
        const limit = req.query.limit || '10'
        const result = await getAllData(page, limit)
        res.send(result)
    }
    catch (err) {
        next(err)
    }
}


export async function getUserByToken(req, res, next) {
    try {
        const user = req.body.user
        if(!user){
            res.status(404).send({ message:"user not found"})
        }
       
        // const result = await getDataUserByToken(userId)

        res.send(user)
    }
    catch (err) {
        next(err)
    }
}

export async function getAdminByToken(req, res, next) {
    try {
        const userId = req.body.user._id
        const result = await getDataAdminByToken(userId)

        res.send(result)
    }
    catch (err) {
        next(err)
    }
}



export async function getuser(req, res, next) {
    try {
        const result = await getSingleData(req.params.id)
        res.send(result)
    } catch (err) {
        next(err)
    }
}


export async function updateData(req, res, next) {
    try {
        const userId = req.params.id
        const userdata = req.body

        const result = await update(userId, userdata)
        res.send(result)
    } catch (err) {
        next(err)
    }
}


export async function updateUserByToken(req, res, next) {
    try {
        const userId = req.body.user._id
        const userdata = req.body

        const result = await update(userId, userdata)
        res.send(result)
    } catch (err) {
        next(err)
    }
}


export async function deleteUserByToken(req, res, next) {
    try {
        const userId = req.body.user._id

        await deleteUserProduct(userId)
        const result = await Delete(userId)
        res.send(result)
    } catch (err) {
        next(err)
    }
}


export async function deleteUserByAdminData(req, res, next) {
    try {
        const userId = req.params.id
        
        await deleteUserProduct(userId)
        const result = await Delete(userId)
        res.send({message:"Deleted user"})
    } catch (err) {
        next(err)
    }

}


export async function forgot(req, res, next) {
    try {
        const email = req.body.email
        const CLIENT_ID = process.env.CLIENT_ID
        const CLIENT_SECRETE = process.env.CLIENT_SECRETE
        const REDIRECT_URI = process.env.REDIRECT_URI
        const REFRESH_TOKEN = process.env.REFRESH_TOKEN


        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }

        const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRETE, REDIRECT_URI)
        oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
        const accessToken = await oAuth2Client.getAccessToken()

        const result = await forgotPassword(email, CLIENT_ID, CLIENT_SECRETE, REDIRECT_URI, REFRESH_TOKEN, accessToken)
        let Token = {
            resetToken: user.resetPasswordToken,
            message: 'check your mail and create your new password'
        }

        res.status(200).send({ Token })
    } catch (error) {
        next(error)
    }
}



export async function reset(req, res, next) {

    try {
        const token = req.params.id


        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(404).send({ message: 'Password reset token is invalid or has expired' });
        }


        const confirmPassword = req.body.confirmPassword
        const password = req.body.password

        const result = await resetPassword(confirmPassword, password, token)
        res.status(200).send({ message: 'password updated successfully' })
        console.log(result);

    } catch (err) {
        next( err )
    }
}

export async function checkUsername(req, res, next) {
    try {
      const userId = req.query.userId 
      const username = req.body.username
      const registerUsernameData = await usernameCheck(username, userId);

      res.status(200).json(registerUsernameData);
    } catch (error) {
      next(error);
    }
  }

