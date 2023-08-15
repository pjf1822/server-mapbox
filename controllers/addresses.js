import Address from "../models/Address.js";
import mongoose from "mongoose";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getAllAddresses = async (req, res, next) => {
  try {
    Address.find({}).then((data) => {
      res.json(data);
    });
  } catch (error) {
    res.status(400).json({ message: "find all th ephotso" });
  }
};

export const createAddress = async (req, res, next) => {
  const { coordinates } = req.body;

  console.log(req.body, "this is the req.body");

  const address = new Address({
    description: req.body.description,
    link: req.body.link,
    coordinates: [Number(coordinates.theLng), Number(coordinates.theLat)],
  });

  console.log(address, "this is the address");

  await address.save();
  return res.json({ address });
};

export const deleteAddress = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("No address with that id");
  }

  try {
    await Address.findByIdAndRemove(id);
    res.json({ message: "Address deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
