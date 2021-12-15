import { Router } from "express";
import pool from "../../utils/db/connect.js";

const productRouter = Router();

productRouter.get("/", async (req, res, next) => {});

productRouter.post("/", async (req, res, next) => {
  try {
    const { name, description, brand, image_url, price, category } = req.body;
    const result = await pool.query(
      'INSERT INTO product(name , description ,brand , image_url , price , category ) VALUES ("3222", "something longer", "nokia","https://images.unsplash.com/photo-1639501838991-215ffc3cf280?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",500, "Mobile" RETURNING * )',
      [name, description, brand, image_url, price, category]
    );
    res.status(201).send(result.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productRouter.get("/:id", async (req, res, next) => {});
productRouter.put("/:id", async (req, res, next) => {});
productRouter.delete("/:id", async (req, res, next) => {});
export default productRouter;
