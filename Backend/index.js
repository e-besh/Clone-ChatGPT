import express from "express";
import "dotenv/config.js";
import db from "./db/db_config.js";
import mainRouter from "./src/api/main.routes.js";
import { errorHandler } from "./src/middleware/error-handler.js";
import cors from "cors";

const app = express();

// allow request from frontend port
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Server is working!");
});
app.use("/api", mainRouter);
app.use(errorHandler);

async function startServer() {
  try {
    // Test the database connection
    const connection = await db.getConnection();
    console.log("Connected to the database successfully!");
    connection.release(); // Release the connection back to the pool

    app.listen(4000, (err) => {
      if (err) {
        throw err;
      }
      console.log("Server is running on port http://localhost:4000");
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
  }
}

startServer();
