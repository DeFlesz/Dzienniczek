const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const db = mysql.createConnection({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    socketPath: process.env.SOCKET_PATH
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
            return res.render('index',{
                message: "nie można połączyć z modułem aplikacji. Proszę spróbować później"
            });
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




router.get('/dayadd', (req, res) => {
    
    
    const { breakfast, dinner, supper, other_meal, workout, weight, height, day_grade} = req.body;
    

    const cookie = req.cookies;
    const decoded = jwt.decode(cookie.jwt);
    const id_user = decoded.id;

    console.log(id_user);

    if( !breakfast || !dinner || !supper || !other_meal || !weight || !height || !day_grade ){
        return res.render('new_day_form', {
            message: "podaj wszystkie dane"
        });
    }
    const date = new Date;
    const today = "'" + date.getFullYear + "-" + (date.getMonth + 1) + "-" + date.getDate + "'";
    db.query("INSERT INTO food SET ?", {breakfast: breakfast, dinner: dinner, supper: supper, other_meal: other_meal, day: today, id_user: id_user}, (error, results) =>{
        if(error){
            console.log(error);
            return res.render('index', {
                message: "nie można połączyć z modułem aplikacji. Proszę spróbować później"
            });
        }
    });
    db.query("INSERT INTO weight SET ?", {weight: weight, height: height, workout: workout, day: today, id_user: id_user}, (error, results) => {
        if(error){
            console.log(error);
            return res.render('index', {
                message: "nie można połączyć z modułem aplikacji. Proszę spróbować później"
            });
        }
    });
    db.query("INSERT INTO feeling SET ?", {day_sum: day_grade, day: today, id_user: id_user}, (error, results) => {
        if(error){
            console.log(error);
            return res.render('index', {
                message: "nie można połączyć z modułem aplikacji. Proszę spróbować później"
            });
        } else {
            res.status(200).redirect('/dashboard');
        }
    });
})


module.exports = router;