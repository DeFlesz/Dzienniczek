const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
// const cookieParser = require('cookie-parser');

const app = express();

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

app.use('/', require('./routes/pages'));



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server started on port ${port}...`);
})