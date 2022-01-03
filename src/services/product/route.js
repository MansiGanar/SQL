import { Router } from "express";
import pool from "../../utils/db/connect.js";

const productRouter = Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const { name, description, brand, image_url, price, category } = req.body;
    const result = await pool.query("SELECT * FROM product; ");
    res.send(result.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productRouter.post("/", async (req, res, next) => {
  try {
    const { name, description, brand, image_url, price, category } = req.body;
    const result = await pool.query(
      "INSERT INTO product(name , description ,brand , image_url , price , category ) VALUES ($1, $2 , $3 , $4 , $5 , $6 ) RETURNING * ",
      [name, description, brand, image_url, price, category]
    );
    res.status(201).send(result.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productRouter.get("/:id", async (req, res, next) => {
  try {
    const { name, description, brand, image_url, price, category } = req.body;
    const result = await pool.query("SELECT * FROM product WHERE id = $1 ;  ", [
      req.params.id,
    ]);
    if (result.rows[0]) {
      res.send(result.rows);
    } else {
      res.status(404).send(`Product with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productRouter.put("/:id", async (req, res, next) => {
  try {
    const updateStatement = Object.entries(req.body)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(", ");
    const query = `UPDATE product SET ${updateStatement} WHERE id = ${req.params.id} RETURNING *; `;
    const result = await pool.query(query);
    res.status(201).send(result.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productRouter.delete("/:id", async (req, res, next) => {
  try {
    const query = `DELETE FROM product WHERE id = ${req.params.id} RETURNING *; `;
    await pool.query(query);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
export default productRouter;
