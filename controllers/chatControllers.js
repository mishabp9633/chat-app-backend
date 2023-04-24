import {
  addUserToGroup,
  chatAccess,
  chatFetch,
  groupChatCreate,
  groupRename,
  removeUserFromGroup,
} from "../services/chatService.js";

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected

export async function accessChat(req, res, next) {
  try {
    const userId = req.body.userid;
    const tokenUser = req.body.user._id;

    const result = await chatAccess(userId, tokenUser);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected

export async function fetchChats(req, res, next) {
  try {
    const tokenUser = req.body.user._id;
    console.log(tokenUser);

    const result = await chatFetch(tokenUser);
    console.log("dfdfdf",result);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected

export async function createGroupChat(req, res, next) {
  try {
    const users = req.body.users;
    const name = req.body.name;
    const tokenUser = req.body.user._id;

    const result = await groupChatCreate(tokenUser, users, name);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected

export async function renameGroup(req, res, next) {
  try {
    const chatId = req.body.chatId;
    const chatName = req.body.chatName;

    const result = await groupRename(chatId, chatName);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected

export async function removeFromGroup(req, res, next) {
  try {
    const chatId = req.body.chatId;
    const userId = req.body.userid;

    const result = await removeUserFromGroup(chatId, userId);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected

export async function addToGroup(req, res, next) {
  try {
    const chatId = req.body.chatId;
    const userId = req.body.userid;

    const result = await addUserToGroup(chatId, userId);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
