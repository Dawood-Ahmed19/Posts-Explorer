import app from "./app.js";
import { PORT } from "./config/index.js";
import { connectDB } from "./config/db.js";

try {
  await connectDB();
  app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
} catch (err) {
  console.error(`Failed to Start ${err.message}`);
  process.exit(1);
}
