const express = require("express");
const morgan = require("morgan");
const app = express();

const productRoute = require("./routes/productRoutes");
const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/product", productRoute);

app.use(notFound);
app.use(errorHandlerMiddleware);

module.exports = app;
