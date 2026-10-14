import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PORT = process.env.PORT || 3000;
export const MONGODB_URL = process.env.MONGODB_URL;
export const POSTS_FILE = path.join(__dirname, "..", "data", "posts.json");
