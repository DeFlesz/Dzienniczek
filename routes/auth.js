const express = require('express');
const authController = require('../controllers/auth')

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/logout' , (req, res) =>{
    res.clearCookie("jwt");
    res.render('index', {
        message: "logged out"
    });
});

module.exports = router;