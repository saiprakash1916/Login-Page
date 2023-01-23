import jwt from "jsonwebtoken";
import ENV from '../config.js'
/**Auth Middleware */

export default async function Auth(req, res,next){
    try {
        // Access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];

        // Retrive the user details from the logged in user
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
        req.user = decodedToken; 
        next();
    } catch (error) {
        res.status(401).json({error : "Authentication failed"});
    }
}