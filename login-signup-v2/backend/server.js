const express = require("express");
const dbConnect = require("./database/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { PORT } = require("./config/index");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cookieParser());

//Setting cors
// const corsOptions = {
//   credentials: true,
//   origin: ["http://localhost:3000"],
// };

// app.use(cors(corsOptions));

app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

//Parsing json data in request body
app.use(express.json({ limit: "50mb" }));

//Connection the MongoDB
dbConnect();

//Setting static folder for images
app.use("/storage", express.static("storage"));

//importing routes
app.use(router);

//Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, console.log(`Backend is running on port: ${PORT}`));
