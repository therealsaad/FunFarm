/**
 * ============================================================
 *  FUNFARM - MAIN SERVER ENTRY (ESM CLEAN VERSION)
 * ============================================================
 */

import dotenv from "dotenv";
dotenv.config();

import http from "http";
import mongoose from "mongoose";
import { createClient } from "redis";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/database.js";
import socketHandler from "./socket/socketHandler.js";

import { start as startReminderJob } from "./jobs/reminderJob.js";
import { start as startSubscriptionJob } from "./jobs/subscriptionJob.js";
import { start as startCleanupJob } from "./jobs/cleanupJob.js";

import logger from "./middleware/logger.js";

// ============================================================
// ENV
// ============================================================

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// ============================================================
// CREATE HTTP SERVER
// ============================================================

const server = http.createServer(app);

// ============================================================
// SOCKET.IO
// ============================================================

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

socketHandler(io);
global.io = io;

// ============================================================
// REDIS
// ============================================================

let redisClient;

const connectRedis = async () => {
  if (!process.env.REDIS_URL) return;

  redisClient = createClient({
    url: process.env.REDIS_URL,
  });

  redisClient.on("error", (err) => {
    logger.error("Redis Error:", err);
  });

  await redisClient.connect();

  logger.info("✅ Redis Connected");
  global.redisClient = redisClient;
};

// ============================================================
// START SERVER 
// ==================================================================

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();

    server.listen(PORT, () => {
      logger.info(`
🚀 FunFarm Server Running
🌍 Environment : ${NODE_ENV}
🔗 Port        : ${PORT}
📡 Socket.io   : Enabled
      `);
    });

    // Start Cron Jobs
    startReminderJob();
    startSubscriptionJob();
    startCleanupJob();

  } catch (err) {
    logger.error("❌ Server Startup Error:", err);
    process.exit(1);
  }
};

startServer();

// ============================================================
// GLOBAL ERROR HANDLERS
// ============================================================

process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION:", err);
  shutdownServer();
});

process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION:", err);
  shutdownServer();
});

// ============================================================
// GRACEFUL SHUTDOWN
// ============================================================

const shutdownServer = async () => {
  logger.warn("⚠️ Graceful Shutdown Initiated...");

  server.close(async () => {
    logger.warn("🔴 HTTP Server Closed");

    try {
      await mongoose.connection.close();
      logger.warn("🔴 MongoDB Disconnected");

      if (redisClient) {
        await redisClient.quit();
        logger.warn("🔴 Redis Disconnected");
      }

      process.exit(0);
    } catch (err) {
      logger.error("Shutdown Error:", err);
      process.exit(1);
    }
  });
};

process.on("SIGTERM", shutdownServer);
process.on("SIGINT", shutdownServer);