// routes/brandRoute.js
import express from "express";
import upload from "../middleware/upload.js";
import { addBrand,updateBrand,getallBrands, deleteBrand } from "../controllers/brandController.js";

const router = express.Router();

router.post("/addbrand", upload.single("file"), addBrand)
router.get("/getallBrands",  getallBrands)
router.put("/updatebrand/:id", upload.single("file"), updateBrand)
router.delete("/deleteBrand/:id", upload.single("file"), deleteBrand)

export default router;