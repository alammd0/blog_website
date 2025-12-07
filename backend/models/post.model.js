import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    imageUrl : {
        type : String,
    },

    category : {
        type : String,
        required : true
    },

    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }
    ],

    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],

    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Auth"
    },

    createdAt : {
        type : Date,
        default : Date.now
    }
});

const Post = mongoose.model("Post", postSchema);
export default Post;