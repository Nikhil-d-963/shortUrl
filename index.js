require('dotenv').config();
const app = require("./src/middleware/app");
const mongooseConnect = require('./src/database/mongoose');
const express = require('express');
const path = require('path');
const logger = require('./src/logger/logger'); // Import the logger
const PORT = process.env.PORT || 3000;
const homeHost = process.env.HOST_URL;
const mongoURI = process.env.MONGOOSE_URI;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

// Serve static files (e.g., CSS, JS)
app.use(express.static(path.join(__dirname, '/src/views')));

// Define a route
app.get('/', (req, res) => {
    logger.info('Rendering home page'); // Log when the home page is accessed
    res.render('home', { host_url: homeHost });
});

const startServer = async () => {
    try {
        await mongooseConnect(mongoURI);
        logger.info('Connected to MongoDB'); // Log successful MongoDB connection
    } catch (error) {
        logger.error('Error connecting to MongoDB:', error); // Log MongoDB connection error
        process.exit(1); // Exit the process if unable to connect to the database
    }

    app.listen(PORT, () => {
        logger.info(`Server started on port ${PORT}`); // Log when the server starts
    });
};

startServer();
