import mongoose,{Schema,model} from "mongoose";
import { EMAIL_PROVIDER, ROLES } from "../constants/role.constants.js"
import { isValidEmail, isValidMobileNumber } from '../utils/util.js'


export const userSchema = new Schema({
  username: {
    type: mongoose.Schema.Types.String,
    // required: true,
    lowercase: [true, "Please enter lowercases"],
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    maxLength: [225, "Your password cannot exceed 225 characters"],
    minLength: [6, "Your password should be contain minimum 6 characters"],
  },
  confirmPassword: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function(value) {
        return value === this.password;
      },
      message: 'Passwords do not match'
    }
  },
  name: {
    type: String,
    // required: true,
  },
  mobileNo: {
    type: String,
    // required: true,
    validate: {
      validator: (v)=> isValidMobileNumber(v),
      message: 'Invalid mobile number'
  }
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v)=> isValidEmail(v),
      message: 'Invalid mobile email address'
  }
  },

  token:{
    type:String
      },

      resetPasswordToken:{
        type:String
      },

      resetPasswordExpires:{
        type:Number
      },
      photos: [{
        publicId: String,
        url: String,
        // required: true,
      }],
      defaultPhoto:{
        url: {
          type: String,
          default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
      },
      role: {
        type:String,
        default:ROLES.SELLER,
        enum:[ROLES.ADMIN,ROLES.SELLER]
      },
      provider: {
        type: String,
        required: true,
        default: EMAIL_PROVIDER.Email
      }, 
      googleId: {
        type: String
      },
      avatar: {
        type: String
      },  
  
});

const user = model("User", userSchema);
export default user;


//..................default image ......................//
// photos: [{
//   publicId:{
//     type:String
//   },
//   url:{
//     type:String,
//     default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
//   },
// }],