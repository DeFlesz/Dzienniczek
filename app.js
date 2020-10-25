const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' });

const db = mysql.createConnection({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    socketPath: process.env.SOCKET_PATH
});

const app = express();

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false}))
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


db.connect( (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("mysql connected...");
    }
});



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server started on port ${port}...`);
})