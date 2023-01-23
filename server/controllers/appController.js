import UserModel from "../model/User.model.js";
import bcrpt from 'bcrypt';
import jwt from "jsonwebtoken";
import ENV from '../config.js';

/** Middle ware for verify the email */

export async function verifyUser(req, res, next){
    try {
        const {username} = req.method == "GET" ? req.query : req.body;

        // Check the user existance
        let exits = await UserModel.findOne({username});
        if(!exits) return res.status(400).send({error : "Can;t find user"})
        next();
    } catch (error) {
        return res.status(400).send({error : "Authentication error.."})
    }
}

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
    const {username, password} = req.body;
    try {
        UserModel.findOne({username})
        .then(user => {
            bcrpt.compare(password, user.password)
            .then(passwordCheck =>{
                if(!passwordCheck) return res.status(400).send({error : "Don't have Password"})

                // Create JWT Tokens
                const token = jwt.sign({
                    userId : user._id,
                    username : user.username
                },ENV.JWT_SECRET,{expiresIn : "24h"})
                return res.status(200).send({
                    msg : "Login Successfully...",
                    username : user.username,
                    token
                })
            })
            .catch(error =>{
                return res.status(400).send({error : "Password does not match"})
            })
        })
        .catch(error => {
            return res.status(404).send({error : "Username not found!"})
        })
    } catch (error) {
        return res.status(500).send({error})
    }
}

/** GET: http://localhost:8080/api/user/example123 */

export async function getUser(req,res){
    const {username} = req.params;
    try {
        if(!username) return res.status(501).send({error : "Invalid Username"})
        UserModel.findOne({username}, function(err,user){
            if(err) return res.status(500).send({err})
            if(!user) return res.status(500).send({err : "Could't find the user"})
            /** Remove password form the user */
            /** Mongoose return unnessary data with object so we can convert into Json format */
            const {password, ...rest} = Object.assign({}, user.toJSON())
            return res.status(200).send(rest)
        })
    } catch (error) {
        return res.status(400).send({error : "Cannot find User data"})
    }
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
    try {
        const id = req.query.id;
        if(id){
            const body = req.body;

            //Update the data
            UserModel.updateOne({_id : id}, body, function(err,data){
                if(err) throw err;
                return res.status(201).send({msg : "Recoord Updated..."})
            })
        }else{
            return res.status(401).send({error : "Uer not found.."})
        }
    } catch (error) {
        return res.status(400).send({error})
    }
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
