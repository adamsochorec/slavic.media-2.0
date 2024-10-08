import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { verifyToken } from "./validation";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import cors from "cors";
import path from "path";

require("dotenv-flow").config();

const app = express();

// Middleware to set CORS headers
app.use((req: Request, res: Response, next: Function) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "auth-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  next();
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Load and serve Swagger documentation
const swaggerDefinition = yaml.load(path.join("backend", "..", "swagger.yaml"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

import articleRoutes from "./routes/article";
import imgRoutes from "./routes/img";
import photoServicesRoutes from "./routes/photoServices";
import authRoutes from "./routes/auth";

require("dotenv-flow").config();

// Middleware to parse JSON bodies (duplicate, can be removed)
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DBHOST as string)
  .catch((error) => console.log("Error connecting to MongoDB:" + error));

// Log successful MongoDB connection
mongoose.connection.once("open", () =>
  console.log("Connected successfully to MongoDB")
);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to the backend" });
});

// Route handlers
app.use("/blog/articles", articleRoutes);
app.use("/img", imgRoutes);
app.use("/services/photo", photoServicesRoutes);
app.use("/user", authRoutes);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "dist")));

// Catch-all route to serve 'index.html' for any unmatched routes
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});

export default app;
