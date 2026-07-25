// import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/lib/db.js";
import { server } from "./src/lib/socket.js";

const PORT = config.PORT;
connectDB();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} (${config.NODE_ENV})`);
});

// If you want to run the app without socket.io, you can uncomment the following lines and comment out the server.listen() line above.
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT} (${config.NODE_ENV})`);
// });
