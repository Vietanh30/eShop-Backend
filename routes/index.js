const categoryRouter = require("./categoryRoutes");
const productRouter = require("./productRoutes");
const userRouter = require("./userRoutes");
const cartRouter = require("./cartRoutes");
const orderRouter = require("./orderRoutes");
const messageRouter = require("./messageRoutes");
const uploadRouter = require("./uploadRoutes");

function routes(app) {
  app.use("/api/categories", categoryRouter);
  app.use("/api/product", productRouter);
  app.use("/api/user", userRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/message", messageRouter);
  app.use("/api/upload", uploadRouter);
}

module.exports = routes;
