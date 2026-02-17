import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    farmhouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmhouse",
      required: true
    },

    startDate: Date,
    endDate: Date,

    guests: Number,

    pricingBreakdown: {
      basePrice: Number,
      total: Number
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },

    bookingStatus: {
      type: String,
      enum: [
        "requested",
        "accepted",
        "rejected",
        "cancelled",
        "completed"
      ],
      default: "requested"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
