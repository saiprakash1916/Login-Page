import UserModel from "../model/User.model.js";
import bcrpt from 'bcrypt';


/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/

export async function register(req,res){
    try {
        const {username, password, email, profile} = req.body;

        // Check the existing user

        const existUserName = new Promise((resolve, reject) =>{
            UserModel.findOne({username}, function(err, user){
                if(err) reject(new Error(err));
                if(user) reject({Error : "Please use Unique username"});
                resolve();
            })
        });

        // Check the existing email

        const existEmail = new Promise((resolve, reject) =>{
            UserModel.findOne({email}, function(err, email){
                if(err) reject(new Error(err));
                if(email) reject({Error : "Please use Unique email"});
                resolve();
            })
        });

        Promise.all([existUserName, existEmail]).then(()=>{
            if(password){
                bcrpt.hash(password, 10).then(hashedpassword =>{
                    const user = new UserModel({
                        username,
                        password : hashedpassword,
                        profile : profile || '',
                        email
                    });

                    // Return and Save result as the responce

                    user.save()
                    .then(result => res.status(201).send({msg : "User Registed Successfully..."}))
                    .catch(error => res.status(500).send({error}));
                }).catch(error =>{
                    return res.status(500).send({
                        error : "Enable to hashed password"
                    })
                })
            }
        }).catch(error =>{
            return res.status(500).send({error})
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/

export async function login(req,res){
    res.json('login route')
}

/** GET: http://localhost:8080/api/user/example123 */

export async function getUser(req,res){
    res.json('getUser route')
}

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/

export async function updateUser(req,res){
    res.json('updateUser route')
}

/** GET: http://localhost:8080/api/generateOTP */

export async function generateOTP(req,res){
    res.json('generateOTP route')
}

/** GET: http://localhost:8080/api/verifyOTP */

export async function verifyOTP(req,res){
    res.json('verifyOTP route')
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */

export async function createResetSession(req,res){
    res.json('createResetSession route')
}

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */

export async function resetPassword(req,res){
    res.json('resetPassword route')
}
