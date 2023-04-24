import Chat from "../models/chat.model.js"
import User from "../models/user.model.js"
import {HttpException} from '../exceptions/exceptions.js';



export async function chatAccess(userId, tokenUser){

    if (!userId) {
        console.log("UserId param not sent with request");
        throw new HttpException(400, "UserId param not sent with request")
      }
    
      var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: tokenUser } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })
        .populate("users", ["-password","-confirmPassword"])
        .populate("latestMessage")
    
      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
      });
    
      if (isChat.length > 0) {
        return isChat[0]
      } else {
        var chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [tokenUser, userId],
        };
    
          const createdChat = await Chat.create(chatData);
          const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            ["-password",
            "-confirmPassword"]
          );
          return FullChat
      }
}

export async function chatFetch(tokenUser){

  let result 
   await Chat.find({ users: { $elemMatch: { $eq: tokenUser} } })
    .populate("users", ["-password","-confirmPassword"])
    .populate("groupAdmin", ["-password","-confirmPassword"])
    .populate("latestMessage")
    .sort({ updatedAt: -1 })

    .then(async (results) => {
      results = await User.populate(results, {
        path: "latestMessage.sender",
        select: "name photos email",
      });
      result = results
    })
    return result
}


export async function groupChatCreate(tokenUser, users, name){

  let user = users

    if (!users || !name) {
        throw new HttpException(404, "Please enter name")
      }
    
      if (users.length < 2) {
          throw new HttpException(404,"More than 2 users are required to form a group chat")
      }
    
      user.push(tokenUser)
    
        const groupChat = await Chat.create({
          chatName: name,
          users: users,
          isGroupChat: true,
          groupAdmin: tokenUser,
        })
    
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
          .populate("users", ["-password","-confirmPassword"])
          .populate("groupAdmin", ["-password","-confirmPassword"])
    
        return fullGroupChat

}

export async function groupRename(chatId, chatName){


    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
          chatName: chatName,
        },
        {
          new: true,
        }
      )
        .populate("users", ["-password","-confirmPassword"])
        .populate("groupAdmin", ["-password","-confirmPassword"]);
    
      if (!updatedChat) {
        throw new HttpException(404,"Chat Not Found")

      } else {
        return updatedChat
      }
}

export async function removeUserFromGroup(chatId, userId){


    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
          $pull: { users: userId },
        },
        {
          new: true,
        }
      )
        .populate("users", ["-password","-confirmPassword"])
        .populate("groupAdmin", ["-password","-confirmPassword"]);
    
      if (!removed) {
        throw new HttpException(404,"Chat Not Found")
      } else {
        return removed
      }
}

export async function  addUserToGroup(chatId, userId){

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: { users: userId },
        },
        {
          new: true,
        }
      )
        .populate("users", ["-password","-confirmPassword"])
        .populate("groupAdmin", ["-password","-confirmPassword"]);
    
      if (!added) {
        throw new HttpException(404,"Chat Not Found")
      } else {
        return added
      }
}

