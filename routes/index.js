import express from "express";
const router = express.Router();

import addressRoutes from "./addresses.js";

router.use("/addresses", addressRoutes);

export default router;
