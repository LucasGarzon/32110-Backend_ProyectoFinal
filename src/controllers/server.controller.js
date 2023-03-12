import ServerInfo from "../services/server.service.js";

const serverInfo = new ServerInfo()

export const getInformation = async (req, res) => {
  const { isAdmin } = req.user
  if (isAdmin === true) {
    const result = await serverInfo.getServerConfig()
    res.status(200).render('serverConfig', {serverInfo: result});
  } else {
    res.status(400).render('error', {message: "You don't have admins permissions"});
  }
}

