import express from "express";
import initDB from './config/mongo.js'
//routes
import { userRouter } from "./routes/user.router.js";
import { productRouter } from "./routes/product.router.js";
import { cartRouter } from "./routes/cart.router.js";
import { orderRouter } from "./routes/order.router.js";

initDB();

const app = express();
const PORT = parseInt(process.argv.slice(2)) || 8080;
const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);
app.use("/productos", productRouter);
app.use("/carrito", cartRouter);
app.use("/ordenes", orderRouter);
