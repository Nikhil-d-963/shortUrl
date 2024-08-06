const express = require('express');
const shortIdRoutes = require('../routes/url')
const app = express()
const cors = require('cors')
const path = require('path')




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());




app.use(shortIdRoutes)


module.exports = app;