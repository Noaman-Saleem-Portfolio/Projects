const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

// const fileUpload = require("express-fileupload");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

const errorMiddleware = require("./middleware/error");

//Making public folder public for all
console.log(__dirname);
app.use("/static", express.static(path.join(__dirname, "/public")));

// app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Route Imports
const bookRoutes = require("./routes/bookRoutes");
const bookRoutesAdmin = require("./routes/bookRoutesAdmin");
const userRoutes = require("./routes/userRoutes");
// const order = require("./routes/orderRoute");
// const payment = require("./routes/paymentRoute");

app.use("/api/v1", bookRoutes);
app.use("/api/v1", bookRoutesAdmin);
app.use("/api/v1", userRoutes);
// app.use("/api/v1", order);
// app.use("/api/v1", payment);

// app.post("/multer", upload.single("image"), (req, res) => {
//   console.log("Hitted");
//   console.log("File:", req.file);
//   console.log("Body:", req.body);
// });

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

// console.log(path.join(__dirname, "../admin-panel-template/build"));
// console.log(path.join(__dirname, "./admin-panel-template/build"));
// Admin Site Build Path

// app.use(
//   "/admin/",
//   express.static(path.join(__dirname, "../admin-panel-template/build"))
// );

// DB_URI=mongodb+srv://noaman:musawali@cluster0.qsypljh.mongodb.net/myKitabKada?retryWrites=true&w=majority

// app.get("/test", (req, res) => {
//   res.cookie("Name", "Nomi");
//   res.send("Testing");
// });

// Working Code Serving Admin React App Build
app.use(express.static(path.join(__dirname, "../admin-panel-template/build")));
app.get("/admin/*", function (req, res) {
  // console.log("kkkkkkkkkkkkkkkkkkkvvvvvvvvvvvvvvvvvv");
  res.sendFile(
    path.resolve(__dirname, "../admin-panel-template/build/index.html")
  );
});

// Front Site Build Path
// app.use('/', express.static(path.join(__dirname, '../../build')))
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../../build', 'index.html'));
// });

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
