import mongoose, { Connection } from "mongoose";

const mongo_url = process.env.MONGODB_URL;

if (!mongo_url) {
  throw new Error("MONGO_URL not found"); //throw instead of console
}

let cache = global.mongoose as {
  conn: Connection | null;
  promise: Promise<Connection> | null;
};

if (!cache) {
  cache = global.mongoose = { conn: null, promise: null };
}

const connectDb = async (): Promise<Connection> => {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(mongo_url)
      .then((m) => m.connection);
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null; 
    console.error("MongoDB connection error:", error);
    throw error; 
  }

  return cache.conn;
};

export default connectDb;



/**
 * MongoDB Connection Setup Notes:
 *
 * 1️ const mongo_url = process.env.MONGODB_URL
 *    - Reads the MongoDB connection string from environment variables.
 *
 * 2️ if(!mongo_url) { console.log("mongo not found") }
 *    - Simple check to ensure the connection string exists.
 *    - Logs a warning if MONGO_URL is missing.
 *
 * 3️ const cache = global.mongoose
 *     References the global Mongoose cache object.
 *     cache.conn → stores active DB connection.
 *     cache.promise → stores the connecting promise.
 *     Helps prevent multiple connections during development (Next.js Fast Refresh).
 */
