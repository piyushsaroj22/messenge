import app from "./app.js";
import config from "./config/config.js";
import connectDB from "./lib/db.js";

const PORT = config.PORT;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
