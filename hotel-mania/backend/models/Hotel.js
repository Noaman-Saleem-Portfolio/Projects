const mongoose = require("mongoose");

const { Schema } = mongoose;

const hotelSchema = Schema(
  {
    name: { type: String, required: true },
    photoPath: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String, required: true },
    province: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    totalRooms: { type: String, required: true },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema, "hotels");
