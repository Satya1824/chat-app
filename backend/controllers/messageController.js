import userModel from "../Models/userModel.js";
import chatModel from "../models/chatModel.js";
import messageModel from "../models/messageModel.js";

export const sendMessageController = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request!");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await messageModel.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await userModel.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await chatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

export const getAllMessagesController = async (req, res) => {
  try {
    const messages = await messageModel
      .find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};
