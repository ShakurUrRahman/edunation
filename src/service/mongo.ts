import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING!;

if (!MONGODB_URI) {
	throw new Error("MONGODB_CONNECTION_STRING is missing");
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		cached.promise = mongoose.connect(MONGODB_URI, {
			bufferCommands: false, // 🔴 IMPORTANT
		});
	}

	cached.conn = await cached.promise;
	return cached.conn;
}
