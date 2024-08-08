const express = require('express');
const shortIdRoutes = require('../routes/url')
const app = express()
const cors = require('cors')
const path = require('path')
const logger = require("../logger/logger")
const expressWinston = require('express-winston');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use(expressWinston.logger({
    winstonInstance: logger,  // Use the Winston instance you created
    meta: true, // Log metadata about the request
    msg: "HTTP {{req.method}} {{req.url}}", // Custom message format
    expressFormat: true, // Use the default Express/morgan format
    colorize: false, // Disable colorization for log output
    ignoreRoute: function (req, res) { return false; } // Log all routes
  }));



app.use(shortIdRoutes)

app.use(expressWinston.errorLogger({
    winstonInstance: logger,  // Use the Winston instance you created
  }));
  



module.exports = app;