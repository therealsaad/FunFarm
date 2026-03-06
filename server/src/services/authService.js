const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
  hashToken
} = require("../utils/token");
const crypto = require("crypto");

/* REGISTER */
exports.register = async ({ name, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("Email already registered");

  const hashed = await bcrypt.hash(password, 12);

  const user = new User({
    name,
    email,
    password: hashed
  });

  const verifyToken = user.createEmailVerificationToken();
  await user.save();

  return { user, verifyToken };
};


exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new Error("Invalid credentials");

  if (!user.isActive) throw new Error("Account suspended");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshTokenHash = hashToken(refreshToken);
  user.lastLogin = new Date();
  await user.save();

  return { accessToken, refreshToken };
};

/* REFRESH TOKEN ROTATION */
exports.refresh = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) throw new Error("Invalid session");

  if (user.refreshTokenHash !== hashToken(token))
    throw new Error("Token mismatch");

  const newAccess = generateAccessToken(user);
  const newRefresh = generateRefreshToken(user);

  user.refreshTokenHash = hashToken(newRefresh);
  await user.save();

  return { newAccess, newRefresh };
};
