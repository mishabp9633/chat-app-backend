import Message from "../models/message.model.js"
import Chat from "../models/chat.model.js"
import User from "../models/user.model.js"
import {HttpException} from '../exceptions/exceptions.js';

export async function messageSend(tokenUser, chatId, content){

  if (!content || !chatId) {
      console.log("Invalid data passed into request")
      throw new HttpException (400, "Invalid data passed into request")
    }
  
    let newMessage = {
      sender: tokenUser,
      content: content,
      chat: chatId,
    };
  
    
      let message = await Message.create(newMessage);
  
      message = await message.populate("sender", ["name", "photos"])
      message = await message.populate("chat")
      message = await User.populate(message, {
        path: "chat.users",
        select: ["name", "photos", "email"],
      });
  
      await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
  
      return message
  }

export async function messageAll(chatId){
    const messages = await Message.find({ chat: chatId })
      .populate("sender", ["name", "photos", "email"])
      .populate("chat");
    return messages
}

