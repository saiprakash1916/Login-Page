import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from './database/conn.js'
import router from "./router/route.js";

const app = express();

/** Middle ware */

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powred-by'); // Less hackers know our stack

const port = 8080;

/** HTTP GET Request */

app.get('/',(req, res)=>{
    res.status(201).json("Home GET Requested");
});

/** api routes */

app.use('/api',router);

/** Start server only when be valid connection */
connect().then(()=>{
    try {
        app.listen(port, ()=>{
            console.log(`Server Connected to https://localhost:${port}`);
        })
    } catch (error) {
        console.log("Cannot connect to the server...")
    }
}).catch(error => {
    console.log("Invalid Database connection, Please check the connection...");
})