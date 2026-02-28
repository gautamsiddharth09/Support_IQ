


import { Connection } from "mongoose"

declare global{
  var mongoose:{
    conn:Connection | null,
    promise:Promise<Connection> | null
  }
}

export {}

/**
 *
 * Global Mongoose Connection Note
 
 * Purpose:
 * - Prevents multiple MongoDB connections in development (Fast Refresh issue in Next.js).
 * - Provides a single global connection that can be reused across files.
 * 
 * Key Concepts:
 * ----------------------------
 * 1️ declare global
 *    - Adds variables/types to the global scope in TypeScript.
 *    - Here, we declare a global 'mongoose' object.
 * 
 * 2️ var mongoose
 *    - Structure:
 *      {
 *        conn: Connection | null      // stores the actual active DB connection
 *        promise: Promise<Connection> | null // stores the connecting promise
 *      }
 *    - 'conn' is used if connection is already established.
 *    - 'promise' is used to prevent multiple concurrent connections.
 * 
 * 3️ export {}
 *    - Makes this file a module so 'declare global' works properly.
 * 
 * Example Usage:
 * ----------------------------
 * import mongoose, { Connection } from "mongoose";
 * 
 * declare global {
 *   var mongoose: {
 *     conn: Connection | null,
 *     promise: Promise<Connection> | null
 *   }
 * }
 * 
 * if (!global.mongoose) {
 *   global.mongoose = { conn: null, promise: null };
 * }
 * 
 * export async function connectToDatabase() {
 *   if (global.mongoose.conn) return global.mongoose.conn;
 * 
 *   if (!global.mongoose.promise) {
 *     global.mongoose.promise = mongoose.connect(process.env.MONGO_URI!).then(m => m.connection);
 *   }
 * 
 *   global.mongoose.conn = await global.mongoose.promise;
 *   return global.mongoose.conn;
 * }
 * 
 * Benefits:
 * ----------------------------
 * - Prevents "Too many connections" errors during development.
 * - Ensures a single, reusable connection object is available globally.
 * - Works seamlessly with Next.js API routes and Server Components.
 */