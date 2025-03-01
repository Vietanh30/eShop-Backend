const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8000;
const db = require("./config/db");
const routes = require("./routes");
const cors = require("cors");
const errorHandleMiddlewares = require("./middlewares/errorHandleMiddlewares");
const categoriesModel = require("./models/categoriesModel");
const path = require("path");
const productModel = require("./models/productModel");
const orderModel = require("./models/orderModel");
// For .env access
require("dotenv").config();

// Connect to DB
db.connect();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

// To recognize the incoming Request Object as a JSON Object
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*", // hoặc '*' để cho phép tất cả
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Thêm PATCH vào đây
  })
);
app.get("/", (req, res) => {
  res.send("Successfully running !");
});

// Route
routes(app);

app.use(errorHandleMiddlewares.errorHandler);

app.listen(port, () => {
  console.log(`App listening at port: ${port}`);
});
require("./cron/removeChat");
