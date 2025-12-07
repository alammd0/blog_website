import Comment from "../models/comment.mode.js";
import Post from "../models/post.model.js";

// create comment
export const createComment = async (req, res) => {
    try{
        const { text, postId } = req.body;

        

        if(!text || !postId){
            return res.status(400).json({
                message : "Please comment and post id"
            })
        }

        const fetchedPost = await Post.findById(postId);

        if(!fetchedPost){
            return res.status(404).json({
                message : "Post not found"
            })
        }

        const createComment = await Comment.create({
            text : text,
            post : postId,
            author : req.user._id
        })

        // Update post comments
        await Post.updateOne({_id : postId}, {$push : {comments : createComment._id}});


        return res.status(201).json({
            message : "Comment created successfully",
            comment : {
                _id : createComment._id,
                text : createComment.text,
                post : createComment.post,
                author : createComment.author
            }
        })

    }catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}

// update comment :: TODO -> HW
export const updateComment = async (req, res) => {
    try{
        const { postId } = req.body;
        const { id } = req.params;

        if(!postId || !id){
            return res.status(400).json({
                message : "Please provide a post id and comment id"
            })
        }

        const fetchedPost = await Post.findById(postId);

        if(!fetchedPost){
            return res.status(404).json({
                message : "Post not found"
            })
        }

        const fetchedComment = await Comment.findById(id);

        if(!fetchedComment){
            return res.status(404).json({
                message : "Comment not found"
            })
        }

        if(fetchedComment.author !== req.user._id){
            return res.status(400).json({
                message : "You are not authorized to access this route"
            })
        }

        const text = req.body.text;

        if(!text){
            return res.status(400).json({
                message : "Please provide a text"
            })
        }

        fetchedComment.text = text;

        await fetchedComment.save();

        return res.status(200).json({
            message : "Comment updated successfully",
            comment : {
                _id : fetchedComment._id,
                text : fetchedComment.text,
                post : fetchedComment.post,
                author : fetchedComment.author
            }
        })
    }
    catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}

// delete comment
export const deleteComment = async (req, res) => {
    try{

        console.log(req.params);
        const { id } = req.params;

        console.log(id);
        
        if(!id){
            return res.status(400).json({
                message : "Please provide an id"
            })
        }

        const fetchedComment = await Comment.findById(id);
        console.log(fetchedComment);

        if(!fetchedComment){
            return res.status(404).json({
                message : "Comment not found"
            })
        }

        if(fetchedComment.author.toString() !== req.user._id.toString()){
            return res.status(400).json({
                message : "You are not authorized to access this route"
            })
        }

        await fetchedComment.deleteOne();

        await Post.updateOne({_id : fetchedComment.post}, {$pull : {comments : fetchedComment._id}});

        return res.status(200).json({
            message : "Comment deleted successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}

// get all comments
export const getAllComments = async (req, res) => {
    try{
        const comments = await Comment.find().populate("author", "-password");

        if(!comments){
            return res.status(404).json({
                message : "Comments not found"
            })
        }

        return res.status(200).json({
            message : "Comments found",
            comments : comments
        })
    }
    catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}

// hide comment by Admin & author :: TODO
export const hideComment = async (req, res) => {
    try{
        const { id } = req.params;

        if(!id){
            return res.status(400).json({
                message : "Please provide an id"
            })
        }

        const fetchedComment = await Comment.findById(id);

        if(!fetchedComment){
            return res.status(404).json({
                message : "Comment not found"
            })
        }

        if(fetchedComment.author !== req.user._id && req.user.role !== "admin"){
            return res.status(400).json({
                message : "You are not authorized to access this route"
            })
        }

        fetchedComment.hidden = true;

        await fetchedComment.save();

        return res.status(200).json({
            message : "Comment hidden successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}