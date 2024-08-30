np// global.d.ts
import { MongoClient } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient>; // This must be declared in the global scope
}

// To make sure this file is treated as a module
export {};
