const mysql = require('mysql');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const router = express.Router();

const db = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    socketPath: process.env.DB_SOCKETPATH
});


router.get('/new_day' , (req, res) =>{
    const { breakfast, dinner, supper, other_meal, workout, weight, height, day_grade} = req.body;
    

    const cookie = req.cookies;
    const decoded = jwt.decode(cookie.jwt);
    const id_user = decoded.id;

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
            res.render('/dashboard')
        }
    });
});



module.exports = router;