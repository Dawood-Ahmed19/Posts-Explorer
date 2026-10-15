import mongoose from "mongoose";

import { MONGODB_URL } from "./index.js";

export const connectDB = async () => {
  if (!MONGODB_URL) {
    throw new Error(`Cannot Find MongoDB URL in Env File`);
  }
  if (mongoose.connection.readyState === 1) {
    return;
  }
  const connection = mongoose.connect(MONGODB_URL);
  await connection;
};
