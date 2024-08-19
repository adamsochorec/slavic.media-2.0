// Import the Express framework for creating web servers
const express = require("express");
// Import Mongoose for MongoDB object modeling
const mongoose = require("mongoose");
// Import body-parser to parse incoming request bodies
const bodyParser = require("body-parser");
// Initialize an Express application
const app = express();
// Import a custom token verification middleware function
const { verifyToken } = require("./validation");

// Swagger dependencies for API documentation
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
// Import CORS to enable Cross-Origin Resource Sharing
const cors = require("cors");
const path = require("path");

// Load environment variables from .env files using dotenv-flow
require("dotenv-flow").config();

// Setup CORS middleware to handle CORS preflight requests and responses
app.use(function (req, res, next) {
  // Allow requests from any origin
  res.header("Access-Control-Allow-Origin", "*");
  // Allow specific headers in requests
  res.header(
    "Access-Control-Allow-Headers",
    "auth-token, Origin, X-Requested-Width, Content-Type, Accept"
  );
  // Allow specific HTTP methods
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );

  // Move to the next middleware function
  next();
});

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Setup Swagger documentation
const swaggerDefinition = yaml.load("./swagger.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// Import routes for documents and authentication
const documentRoutes = require("./routes/article");
const authRoutes = require("./routes/auth");

// Load environment variables (again, for good measure)
require("dotenv-flow").config();

// Middleware to parse requests of content-type JSON
app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DBHOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((error) => console.log("Error connecting to MongoDB:" + error));

// Log a message once connected to MongoDB
mongoose.connection.once("open", () =>
  console.log("Connected successfully to MongoDB")
);

// Define a welcome route
app.get("/", (req, res) => {
  // Send a welcome message with a 200 OK status
  res.status(200).send({ message: "Welcome to the backend" });
});

// Define routes for CRUD operations on documents
app.use("/blog/articles", documentRoutes);

// Define routes for user authentication
app.use("/user", authRoutes);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "dist")));

// Catch-all route to serve 'index.html' for any unmatched routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Define the port number the server will listen on
const PORT = process.env.PORT || 4000;

// Start the server and listen on the defined port
app.listen(PORT, function () {
  console.log("Server is running on port: " + PORT);
});

// Export the app module for testing or other uses
module.exports = app;