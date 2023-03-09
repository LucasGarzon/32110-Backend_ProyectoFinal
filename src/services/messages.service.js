import Message from "../models/message.model.js";

export default class MessageService {
  async getAllMessages() {
    return await Message.find();
  }

  async getMessageByEmail(userEmail) {
    return await Message.find({email: userEmail})
  }

  async createMessage(messageData) {
    const newMessage = await Message.create(messageData)
    return await Message.find();
  } 
};