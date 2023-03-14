import MessageService from "../services/messages.service.js";

const messageService = new MessageService();

export const getAllMessages = async (req, res) => {
  try {
    const result = await messageService.getAllMessages()
    res.status(200).render('chat', {messages: result, user: req.user})
  } catch (error) {
    res.status(404).render('error', { message: error.message });
  }
};

export const getMessageByEmail = async (req, res) => {
  const { email } = req.user
  try {
    const result = await messageService.getMessageByEmail(email)
    res.status(200).render('chatUser', {messages: result, user: req.user})
  } catch (error) {
    res.status(404).render('error', { message: error.message });
  }
}

export const getMessagesForSocket = async (socket) => {
  let result = await messageService.getAllMessages()
  socket.emit('messagesHistory', result)
};

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
    res.status(404).render('error', { message: error.message });
  }  
}

export const adminResponse = async (req, res) => {
  const {id, response} = req.body;
  try {
    let result = await messageService.responseMessage(id, response)
    res.status(200).json(result)
  } catch (error) {
    res.status(404).render('error', { message: error.message });
  }
}
