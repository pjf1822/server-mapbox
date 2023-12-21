import express from "express";
import {
  getAllAddresses,
  createAddress,
  deleteAddress,
  getAllAddressesByIds,
} from "../controllers/addresses.js";
const router = express.Router();

router.get("/getall", getAllAddresses);
router.post("/getallbyids", getAllAddressesByIds);
router.post("/create", createAddress);
router.delete("/:id", deleteAddress);

export default router;
