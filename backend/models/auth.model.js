import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    posts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Post"
        }
    ],

    password : {
        type : String,
        required : true
    },

    role : {
        type : String,
        default : "user",
        enum : ["user", "admin"]
    },
    
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const Auth = mongoose.model("Auth", authSchema);
export default Auth;