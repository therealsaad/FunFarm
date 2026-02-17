const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user"
    },

    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },

    passwordChangedAt: Date,

    refreshTokenHash: String,

    emailVerificationToken: String,
    emailVerificationExpires: Date,

    passwordResetToken: String,
    passwordResetExpires: Date,

    loginAttempts: { type: Number, default: 0 },
    lockUntil: Date,

    lastLogin: Date
  },
  { timestamps: true }
);

/* PASSWORD CHANGE CHECK */
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTime;
  }
  return false;
};

/* EMAIL TOKEN */
userSchema.methods.createEmailVerificationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.emailVerificationToken =
    crypto.createHash("sha256").update(token).digest("hex");

  this.emailVerificationExpires = Date.now() + 10 * 60 * 1000;

  return token;
};

/* PASSWORD RESET TOKEN */
userSchema.methods.createPasswordResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken =
    crypto.createHash("sha256").update(token).digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return token;
};

module.exports = mongoose.model("User", userSchema);
