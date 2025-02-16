require("dotenv").config();
require("express-async-errors");
const path = require("path");

//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const express = require("express");
const app = express();
const authenticationMiddleware = require("./middleware/authentication.js");
//connectDB
const connectDB = require("./db/connect");
//routers
const authRouter = require("./routes/auth.js");
const jobsRouter = require("./routes/jobs.js");

//error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlingMiddleware = require("./middleware/error-handler");
//
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
//
//
//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticationMiddleware, jobsRouter);
//
//middleware
app.use(notFoundMiddleware);
app.use(errorHandlingMiddleware);

const port = process.env.PORT || 3000;
const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server has started`));
  } catch (err) {
    console.log(err);
  }
};
start();
