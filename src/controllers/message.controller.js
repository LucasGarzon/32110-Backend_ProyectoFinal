import MessageService from "../services/messages.service.js";

const messageService = new MessageService();

export const getAllMessages = async (req, res) => {
  try {
    const result = await messageService.getAllMessages()
    res.status(200).render('chat', {messages: result})
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMessagesForSocket = async (socket) => {
  let result = await messageService.getAllMessages()
  socket.emit('messagesHistory', result)
}

export const createMessage = async (req, res) => {
  const { message } = req.body
  const { isAdmin , email } = req.user;
  try {
    let userType = "";
    if (isAdmin === true) {
      userType = "system"
    } else if (isAdmin === false) {
      userType = "user"
    };
    const newMessage = {
      email,
      userType,
      message,
    };
    let result = await messageService.createMessage(newMessage)
    res.status(200).json(result)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }  
}