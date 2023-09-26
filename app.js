const express = require("express");
const morgan = require("morgan");
// const rateLimit = require('express-rate-limit');
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");

// const bodyParser = require("body-parser");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const streamLinksRouter = require("./routes/streamLinkRoutes");
const channelsRouter = require("./routes/channelsRoutes");

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

// Body parser, reading data from body into req.body
// app.use(bodyParser.json({ limit: "100kb" }));

app.use(express.json({ limit: "10000kb" }));

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://aj-umber.vercel.app"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) ROUTES

app.use("/api/users", userRouter);
app.use("/api/channels", channelsRouter);
app.use("/api/streamLink", streamLinksRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
