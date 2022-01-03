import { Router } from "express";
import pool from "../../utils/db/connect.js";

const reviewsRouter = Router();

reviewsRouter.get("/", async (req, res, next) => {
  try {
    const { comment, rate, product_id } = req.body;
    const result = await pool.query(`SELECT * FROM reviews ;`);
    res.send(result.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

reviewsRouter.post("/", async (req, res, next) => {
  try {
    const { comment, rate, product_id } = req.body;
    const result = await pool.query(
      `INSERT INTO reviews(comment,rate,product_id ) VALUES ($1 , $2 , $3) RETURNING * `,
      [comment, rate, product_id]
    );
    res.send(201).send(result.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
reviewsRouter.get("/:id", async (req, res, next) => {
  try {
    const { comment, rate, product_id } = req.body;
    const result = await pool.query(`SELECT * FROM reviews WHERE id = $1 ;`, [
      req.params.id,
    ]);
    if (result.rows[0]) {
      res.send(result.rows);
    } else {
      res.status(404).send(`Reviews with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
reviewsRouter.put("/:id", async (req, res, next) => {
  try {
    const updateStatement = Object.entries(req.body)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(", ");
    const query = `UPDATE reviews SET ${updateStatement} WHERE id = ${req.params.id} RETURNING *; `;
    const result = await pool.query(query);
    res.status(201).send(result.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
reviewsRouter.delete("/:id", async (req, res, next) => {
  try {
    const query = `DELETE FROM reviews WHERE id = ${req.params.id} RETURNING *; `;
    await pool.query(query);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
export default reviewsRouter;
