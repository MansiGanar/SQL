import { Router } from "express";
import pool from "../../utils/db/connect.js";

const reviewsRouter = Router();

reviewsRouter.get("/", async (req, res, next) => {});

reviewsRouter.post("/", async (req, res, next) => {
  try {
    const { comment, rate, product_id } = req.body;
    const result = await pool.query(
      'INSERT INTO product(comment,rate,product_id ) VALUES ("A good product.", 3,1  RETURNING * )',
      [comment, rate, product_id]
    );
    res.send(201).send(result.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
reviewsRouter.get("/:id", async (req, res, next) => {});
reviewsRouter.put("/:id", async (req, res, next) => {});
reviewsRouter.delete("/:id", async (req, res, next) => {});
export default reviewsRouter;
