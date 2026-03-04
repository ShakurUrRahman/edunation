// lib/dbConnect.ts  (or service/mongo.ts — wherever yours is)
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error("Please define MONGODB_URI in .env");

// Cache connection across serverless invocations
let cached = (global as any).mongoose ?? { conn: null, promise: null };
(global as any).mongoose = cached;

export async function dbConnect() {
	console.log("URI length:", process.env.MONGODB_URI?.length);
	console.log("Has @:", process.env.MONGODB_URI?.includes("@"));
	console.log("Has .net:", process.env.MONGODB_URI?.includes(".net"));
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		cached.promise = mongoose.connect(MONGODB_URI, {
			bufferCommands: false, // ← don't buffer, fail fast
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 10000,
			socketTimeoutMS: 45000,
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
