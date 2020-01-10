const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
const router = require('./controllers/ImagesController');
/**
 * Set static folder
 */
app.use(express.static(path.join(__dirname+'public')));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
/**
 * Set ejs engine
 */
app.set('view engine','ejs');
/**
 * Set Route
 */
app.use('/',router);
/**
 * Listening port server
 */
app.listen(PORT,console.log(`Server running on ${PORT}`));
