// Filename: app.js
import express from "express";
import path from "path";
import tasksRouter from "./routes/tasks.js";

const app = express();

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static(path.join(process.cwd(), "public")));

// Set EJS as the templating engine and set the views directory
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

// Logging middleware to log request details
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Mount the task management routes
app.use("/", tasksRouter);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
