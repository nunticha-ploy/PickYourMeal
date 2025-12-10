require("dotenv").config();

const express = require("express");
const { menuItemsRoute } = require("./modules/menuItems/menuItems-routes");
const connectDB = require("./shared/middlewares/connect-db");
const { userModelRoute, userRoute } = require("./modules/users/users-routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;
const hostname = "0.0.0.0";

const server = express();

server.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

// built-in middlewares to parse request body in application-level
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(cookieParser());

//connectDB middleware
server.use(connectDB);

//mount routes
server.use(menuItemsRoute);
server.use(userRoute);

// error-handling middleware to logs the error for debugging.
server.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send("Oops! Internal server error!");
});

// Middleware to handle route not found error.
server.use((req, res, next) => {
    res.status(404).send(`404! ${req.method} ${req.path} Not Found.`);
});

server.listen(port, hostname, (error) => {
    if (error) console.log(error.message);
    else console.log(`Server running on http://${hostname}:${port}`);
});