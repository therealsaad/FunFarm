const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    plan: {
      type: String,
      enum: ["basic", "premium", "enterprise"]
    },

    commissionRate: Number,

    startDate: Date,
    endDate: Date,

    isActive: Boolean
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
