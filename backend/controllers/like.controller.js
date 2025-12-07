import Like from "../models/like.model.js";
import Post from "../models/post.model.js";

// like post
export const likePost = async (req, res) => {
    try{

        const { id } = req.body;

        if(!id) {
            return res.status(400).json({
                message : "Please provide an id"
            })
        }

        const fetchedPost = await Post.findById(id);

        if(!fetchedPost){
            return res.status(404).json({
                message : "Post not found"
            })
        }

        const fetchedLike = await Like.findOne({post : id, user : req.user._id});

        if(fetchedLike){
            return res.status(400).json({
                message : "You already liked this post"
            })
        }

        const createLike = await Like.create({
            post : id,
            user : req.user._id
        })


        await Post.updateOne({_id : id}, {$push : {likes : createLike._id}});


        return res.status(201).json({
            message : "Post liked successfully",
            like : {
                _id : createLike._id,
                post : createLike.post,
                user : createLike.user
            }
        })
    }
    catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}

// unlike post
export const unlikePost = async (req, res) => {
    try {
        const { id } = req.body;

        if(!id) {
            return res.status(400).json({
                message : "Please provide an id"
            })
        }

        const fetchedPost = await Post.findById(id);

        if(!fetchedPost){
            return res.status(404).json({
                message : "Post not found"
            })
        }

        const fetchedLike = await Like.findOne({post : id, user : req.user._id});

        if(!fetchedLike){
            return res.status(400).json({
                message : "You are not like this post"
            })
        }

        await Like.deleteOne({post : id, user : req.user._id});

        await Post.updateOne({_id : id}, {$pull : {likes : fetchedLike._id}});

        return res.status(201).json({
            message : "Post unliked successfully"   
        })
    }
    catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}
