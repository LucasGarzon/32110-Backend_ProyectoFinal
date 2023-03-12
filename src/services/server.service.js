import * as dotenv from "dotenv";
import core from 'os';

dotenv.config();

export default class ServerInfo {
  
  async getServerConfig() {
     const infoView = {
      serverPort: process.env.PORT,
      dataBaseURL: process.env.MONGO_URI,
      sessionTime: process.env.SESSION_TIME / 60000,
      adminEmail: process.env.ADMIN_EMAIL,
      pid: process.pid,
      path: process.execPath,
      cpuCores: core.cpus().length
    }
    return infoView
  }

}


