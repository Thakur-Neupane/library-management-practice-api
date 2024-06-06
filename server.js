import express from "express";
import morgan from "morgan";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8000;

// connect mongodb
import { connnectMongoDB } from "./src/config/mongoConfig";
connnectMongoDB();

// middlewares
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Routers

// Server Status
app.get("/", (req, res, next) => {
  res.json({ message: "Server is running healthy" });
});
app.use("*", (req, res, next) => {
  const err = new Error("404 not found");
  err.status = 404;
  next(err);
});

// global error handling
app.use((error, req, res, next) => {
  console.log(error.status);

  res.status(error.status || 500);
  res.json({
    status: "error",
    message: "error.message",
  });
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log("Server is running at http://localhost:${PORT}");
});
