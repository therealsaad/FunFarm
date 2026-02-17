import mongoose from "mongoose";

const farmhouseSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: { type: String, required: true },

    description: String,

    location: {
      address: String,
      city: String,
      state: String,
      pincode: String,
      coordinates: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point"
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
    },

    amenities: [String],

    pricing: {
      fullDay: Number,
      weekendMultiplier: { type: Number, default: 1 },
      seasonalMultiplier: { type: Number, default: 1 }
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "suspended"],
      default: "pending"
    }
  },
  { timestamps: true }
);

farmhouseSchema.index({ "location.coordinates": "2dsphere" });

export default mongoose.model("Farmhouse", farmhouseSchema);
