require('dotenv').config()
const app = require("./src/middleware/app")
const mongooseConnect = require('./src/database/mongoose')
const express = require('express');
const path = require('path')

const PORT = process.env.PORT || 3000





// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

// Serve static files (e.g., CSS, JS)
app.use(express.static(path.join(__dirname, '/src/views')));

// Define a route
app.get('/', (req, res) => {
    res.render('home', {host_url:process.env.HOST_URL}); // Assuming your HTML file is named index.ejs
});




const startServer = async()=>{
    await mongooseConnect(process.env.MONGOOSE_URI)
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);

    });
    
}



startServer()



