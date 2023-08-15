import Address from "../models/Address.js";
import mongoose from "mongoose";

export const getAllAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({});
    res.json(addresses);
  } catch (error) {
    res.status(400).json({ message: "Error fetching addresses" });
  }
};
export const createAddress = async (req, res, next) => {
  const { coordinates } = req.body;

  const address = new Address({
    description: req.body.description,
    link: req.body.link,
    coordinates: [Number(coordinates.theLng), Number(coordinates.theLat)],
  });

  await address.save();
  return res.json({ address });
};

export const deleteAddress = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid address ID" });
  }

  try {
    await Address.findByIdAndRemove(id);
    res.json({ message: "Address deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting address" });
  }
};
