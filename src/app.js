import express from "express";
import loader from "./config/index.js";
//routes
import { productRouter } from "./routes/product.router.js";

loader.start();

const app = express();
const PORT = parseInt(process.argv.slice(2)) || 8080;
const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRouter);
