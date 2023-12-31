import Address from "../models/Address.js";
import { body, param, validationResult } from "express-validator";

export const getAllAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({});
    res.json(addresses);
  } catch (error) {
    res.status(400).json({ message: "Error fetching addresses" });
  }
};

export const getAllAddressesByIds = async (req, res, next) => {
  try {
    const { _ids } = req?.body;
    console.log(_ids);
    if (!Array.isArray(_ids)) {
      return res.status(400).json({ message: "'ids' must be an array" });
    }
    const addresses = await Address.find({ _id: { $in: _ids } });

    res.json(addresses);
  } catch (error) {
    res.status(400).json({ message: "Error fetching addresses" });
  }
};

export const createAddress = [
  // Validate and sanitize request body fields
  body("description").isString().trim().notEmpty(),
  body("link").isURL(),
  body("coordinates.theLng").isNumeric(),
  body("coordinates.theLat").isNumeric(),

  async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { coordinates } = req?.body;

    const address = new Address({
      description: req?.body?.description,
      link: req?.body?.link,
      coordinates: [Number(coordinates?.theLng), Number(coordinates?.theLat)],
    });

    try {
      await address.save();
      return res.json({ address });
    } catch (error) {
      res.status(500).json({ message: "Error creating address" });
    }
  },
];

export const deleteAddress = [
  // Validate request parameter
  param("id").isMongoId(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
      await Address.findByIdAndRemove(id);
      res.json({ message: "Address deleted successfully!" });
    } catch (error) {
      res.status(400).json({ message: "Error deleting address" });
    }
  },
];
