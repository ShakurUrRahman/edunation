import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("Please define MONGODB_URI in .env");

let cached = (global as any).mongoose ?? { conn: null, promise: null };
(global as any).mongoose = cached;

export async function dbConnect() {
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		cached.promise = mongoose.connect(MONGODB_URI, {
			bufferCommands: false,
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 30000, // ← 10s → 30s for cold starts
			socketTimeoutMS: 60000, // ← 45s → 60s
			connectTimeoutMS: 30000, // ← add this
			heartbeatFrequencyMS: 10000, // ← keep connection alive
		});
	}

	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}
