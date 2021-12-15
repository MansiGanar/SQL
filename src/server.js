import express from "express";
import cors from "cors";
import { testDbConnection } from "./utils/db/connect.js";
import productRouter from "./services/product/route.js";
import reviewsRouter from "./services/reviews/route.js";

const server = express();

server.use(express.json());
server.use(cors());

server.use("/product", productRouter);
server.use("/reviews", reviewsRouter);

server.listen(process.env.PORT || 3001, () => {
  console.log("Server is running ");
  testDbConnection();
});

server.on("error", (error) => console.log("Server is not running", error));
