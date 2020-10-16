const express = require('express');

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

router.get('/dashboard', (req,res) => {
    res.render('dashboard');
});

router.get('/new_day_form', (req,res) => {
    res.render('new_day_form');
});


module.exports = router;
