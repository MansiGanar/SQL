import { Router } from "express";
import pool from "../../utils/db/connect.js";

const productRouter = Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM product");
    res.status(201).send(result.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
  next(error);
});

productRouter.post("/", async (req, res, next) => {
  try {
    const { name, description, brand, image_url, price, category } = req.body;
    const result = await pool.query(
      "INSERT INTO product(name , description ,brand , image_url , price , category ) VALUES ($1,$2,$3,$4,$5,$6 )",
      [name, description, brand, image_url, price, category]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productRouter.get("/:id", async (req, res, next) => {});
productRouter.put("/:id", async (req, res, next) => {});
productRouter.delete("/:id", async (req, res, next) => {});
export default productRouter;
