const express = require("express");
const CustomError = require("./utils/customError");
const globalErrorHandler = require("./controllers/globalErrorHandler");
const authRoute = require("./routes/authRoutes");
const recordRoute = require("./routes/recordRoutes");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/auth",authRoute);
app.use("/record",recordRoute);
app.all("*",(req,res,next)=>{
  const error = new CustomError(`Invaid endpoint ${req.originalUrl}.`,404);
  next(error);
})

app.use(globalErrorHandler);

module.exports = app;