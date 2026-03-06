/**
 * ============================================================
 *  FUNFARM - EXPRESS APP CONFIGURATION
 * ============================================================
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";

// Custom Middleware
import errorHandler from "./middleware/errorHandler.js";
import logger from "./middleware/logger.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import superAdminRoutes from "./routes/superAdminRoutes.js";
import farmhouseRoutes from "./routes/farmhouseRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// ============================================================
// INITIALIZE APP
// ============================================================

const app = express();

// ============================================================
// SECURITY MIDDLEWARE
// ============================================================

// Set security HTTP headers
app.use(helmet());

// Prevent NoSQL Injection
app.use(mongoSanitize());

// Prevent XSS Attacks
app.use(xss());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// ============================================================
// CORS CONFIG
// ============================================================

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.ADMIN_URL,
    ],
    credentials: true,
  })
);

// ============================================================
// BODY PARSER
// ============================================================

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());

// ============================================================
// COMPRESSION
// ============================================================

app.use(compression());

// ============================================================
// LOGGING
// ============================================================

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// ============================================================
// RATE LIMITING
// ============================================================

const limiter = rateLimit({
  max: 200,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again later.",
});

app.use("/api", limiter);

// Extra strict limit for auth
const authLimiter = rateLimit({
  max: 20,
  windowMs: 15 * 60 * 1000,
  message: "Too many login attempts. Please try again later.",
});

app.use("/api/auth", authLimiter);

// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "FunFarm API is running 🚀",
  });
});

// ============================================================
// ROUTES
// ============================================================

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/farmhouses", farmhouseRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/upload", uploadRoutes);

// ============================================================
// 404 HANDLER
// ============================================================

app.all("*", (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error);
});

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use(errorHandler);

export default app;