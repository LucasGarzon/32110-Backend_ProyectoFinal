import session from "express-session";
import MongoStore from "connect-mongo";
import * as dotenv from "dotenv";

dotenv.config();

export function getSessionConfig() {
  const sesionTtl = parseInt(process.env.SESSION_TIME) / 1000 + 120
  return session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/proyectoFinal",
      collectionName: 'sessions',
      ttl: sesionTtl
    }),
    key: process.env.COOKIE_KEY,
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: parseInt(process.env.SESSION_TIME), 
      httpOnly: true, 
    },
  });
};