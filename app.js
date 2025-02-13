require("dotenv").config();
require("express-async-errors");

//extra security packages
const helmet = require("helment");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

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
app.use(helment());
app.use(cors());
app.use(xss());

//
// const allowedOrigins = ["http://localhost:3001", "http://another-origin.com"];

// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   // Handle preflight request
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }
//   next();
// });
//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticationMiddleware, jobsRouter);

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
