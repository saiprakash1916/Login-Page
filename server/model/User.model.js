import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username:{
        type : String,
        requried : [true, "Please provide the Unique Username"],
        unique : [true, "Username Exist"]
    },
    password:{
        type : String,
        requried : [true, "Please enter the password"],
        unique : false
    },
    email :{
        type : String,
        requried : [true, "Please provide the Unique Mail id"],
        unique : true
    },
    firstName : {type : String},
    lastName : {type : String},
    mobile : {type : Number},
    address : {type : String},
    profile : {type : String}
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);