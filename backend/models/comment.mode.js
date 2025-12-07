import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true
    },

    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    },

    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Auth"
    },

    createdAt : {
        type : Date,
        default : Date.now
    }
});


const Comment = mongoose.model("Comment", commentSchema);
export default Comment;