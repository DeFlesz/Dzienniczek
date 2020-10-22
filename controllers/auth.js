const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    console.log(req.body);

    const {name, email, password, passwordConfirm, date_of_birth, sex} = req.body;

    if(!name || !date_of_birth || !sex){
        return res.render('register', {
            message: "wprowadź wszystkie dane"
        })
    }

    db.query('SELECT email FROM users WHERE email = ?;', [email],async (error, results) => {
        if(error){ 
            console.log(error);
            return res.render('index', {
                message: "nie można połączyć z modułem aplikacji. Proszę spróbować później"
            });
        } 
        if( results.length > 0) {
            return res.render('register', {
                message: "e-mail jest już użyty"
            });
        } else if (password !== passwordConfirm ) {
            return res.render('register', {
                message: "hasła sobie nie odpowiadają"
            });
        }

        
        let hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword);

        db.query("INSERT INTO users SET ?", {email: email, password: hashedPassword, name: name, date_of_birth: date_of_birth, sex: sex  }, (error, results) =>{
            if(error){
                console.log(error);
            } else {
                return res.render('login', {
                    message: "zostałeś zarejestrowany"
                });
            }
        });
    });
    

}

exports.login = async (req, res) => {

        const {email, password} = req.body;
        if( !email || !password){
            return res.status(400).render('login',{
                message: "pola e-mail lub hasło są puste"
            });

        }

        db.query("SELECT * FROM users WHERE email = ?", [email], async (error,results) =>{
            console.log(results);
            if(!results) {
                return res.render('login', {
                    message: "hasło lub e-mail są niepoprawne"
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
                res.status(200).redirect('/dashboard');

            } else {
                return res.render('login', {
                    message: "hasło lub e-mail są niepoprawne"
                });
            }
            } catch (error) {
                console.log(error);
                return res.render('login', {
                    message: "hasło lub e-mail są niepoprawne"
                });
            }
        })
    


    


}
