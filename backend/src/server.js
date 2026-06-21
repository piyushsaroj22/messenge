import app from "./app.js";
import "dotenv/config";
import connectDB from "./lib/db.js";

const PORT = process.env.PORT;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
