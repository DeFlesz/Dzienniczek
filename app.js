const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'hbs');

app.use('/', require('./routes/pages'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server started on port ${port}...`);
})