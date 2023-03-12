import express from "express";
import initDB from './config/mongo.js';
import cookieParser from "cookie-parser";
import passport from "passport";
import { getSessionConfig} from "./services/session.service.js";
import { userRouter } from "./routes/user.router.js";
import { productRouter } from "./routes/product.router.js";
import { cartRouter } from "./routes/cart.router.js";
import { orderRouter } from "./routes/order.router.js";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware.js";
import { messageRouter } from "./routes/message.router.js";
import { serverRouter } from "./routes/server.router.js";
import { Server } from "socket.io";
import { getMessagesForSocket } from "./controllers/message.controller.js";
import * as dotenv from "dotenv";

dotenv.config();
initDB();

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
export const io = new Server(server)

app.use(express.static("./src/public"));

app.use(cookieParser())
app.use(getSessionConfig());

app.use(passport.initialize());
app.use(passport.session());

app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
  console.log(`New user connected: ${socket.id}`);
  getMessagesForSocket(socket)
  socket.on("chat", (data) => {
    io.emit("messagesHistory", data);
  });
  socket.on("chatResponse", (data) => {
    io.emit("messagesHistory", data);
  });
})

app.use("/", userRouter);
app.use("/productos", productRouter);
app.use("/carrito", cartRouter);
app.use("/ordenes", orderRouter);
app.use("/chat", messageRouter);
app.use("/config", serverRouter)
app.use(notFoundMiddleware)
