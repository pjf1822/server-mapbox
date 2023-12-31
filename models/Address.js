import mongoose from "mongoose";

const { Schema } = mongoose;

const addressSchema = new Schema({
  description: String,
  link: String,
  coordinates: [Number],
  firebaseUid: String,
});

export default mongoose.model("Address", addressSchema);
