import mongoose, { Mongoose } from 'mongoose';

interface GlobalWithMongoose extends NodeJS.Global {
  mongoose?: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

// Type assertion to extend the global object
const globalWithMongoose = global as GlobalWithMongoose;

const MONGODB_URI: string = process.env.MONGODB_URI || 'default-value';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Initialize cached variable
if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongoose;

async function connectToDatabase(): Promise<Mongoose> {
  // Check if cached.conn is already available
  if (cached.conn) {
    return cached.conn;
  }

  // If there is no cached.promise, create one
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  // Wait for the connection promise and cache the connection
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
