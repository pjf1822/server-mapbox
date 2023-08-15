import express from "express";
import {
  getAllAddresses,
  createAddress,
  deleteAddress,
} from "../controllers/addresses.js";
const router = express.Router();

router.get("/getall", getAllAddresses);
router.post("/create", createAddress);
router.delete("/:id", deleteAddress);

export default router;
