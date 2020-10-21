const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    console.log(req.body);

    const { email, password, passwordConfirm} = req.body;

    db.query('SELECT login FROM users WHERE email = ?;', [email],async (error, results) => {
        if(error){ 
            console.log(error);
        } 
        if( results.length > 0) {
            return res.render('register', {
                message: "that email is used"
            });
        } else if (password !== passwordConfirm ) {
            return res.render('register', {
                message: "passwords do not match"
            });
        }

        
        let hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword);

        db.query("INSERT INTO users SET ?", {email: email, password: hashedPassword  }, (error, results) =>{
            if(error){
                console.log(error);
            } else {
                return res.render('register', {
                    message: "user registered"
                });
            }
        });
    });
    

}

exports.login = async (req, res) => {

        const {email, password} = req.body;
        if( !email || !password){
            return res.status(400).render('login',{
                message: "please type email or password"
            });

        }

        db.query("SELECT * FROM users WHERE email = ?", [email], async (error,results) =>{
            console.log(results);
            if(!results) {
                return res.render('login', {
                    message: "password or email is incorrect"
                });
            } 
            try{
            if (await bcrypt.compare(password, results[0].password)){
                const id = results[0].id_user;

                const token = jwt.sign({ id }, process.env.JWT_SECRET , {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log(`token is ${token}`);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt',token, cookieOptions);
                res.status(200).redirect('/');

            } else {
                return res.render('login', {
                    message: "password or username is incorrect"
                });
            }
            } catch (error) {
                console.log(error);
                return res.render('login', {
                    message: "user or password is incorrect"
                });
            }
        })
    


    


}