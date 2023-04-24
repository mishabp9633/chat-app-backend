import { messageAll, messageSend,
 } from "../services/messageService.js";


//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected

export async function allMessages(req, res, next) {
  try {
    const chatId = req.params.chatId;

    const result = await messageAll(chatId);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected

export async function sendMessage(req, res, next) {
  try {
    const tokenUser = req.body.user._id;
    const chat = req.body.chatId;
    const content = req.body.content

    const result = await messageSend(tokenUser, chat, content);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

