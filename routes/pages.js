const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const router = express.Router();

router.get('/', (req,res) => {
    res.render('index');
});

router.get('/register', (req,res) => {
    res.render('register');
});

router.get('/login', (req,res) => {
    res.render('login');
});


router.get('/dashboard', (req, res) => {
    if(!req.cookies.jwt){
        return res.render('index', {
            message: "nie jesteś zalogowany"
        })
    }
    let decodedCookie = jwt.decode(req.cookies.jwt);

    db.query('SELECT name FROM users WHERE id_user = ?;', [decodedCookie.id],async (error, results) => {
        if(error){
            console.log(error);
            return res.render('/');
        } else {
            const name = results[0].name;
            console.log(name);
            return res.render('dashboard',{
                name: name
            });
        }
    });
    
});


router.get('/new_day_form', (req,res) => {
    res.render('new_day_form');
});


module.exports = router;