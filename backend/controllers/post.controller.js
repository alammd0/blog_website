import Post from "../models/post.model.js";
import Auth from "../models/auth.model.js";
import { uploadImage } from "../utils/fileUpload.js";
import fs from "fs";

// create Post 
export const createPost = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        if (!title || !description || !category) {
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload an image"
            });
        }

        // Full path for Cloudinary
        const imagePath = req.file.path;

        const result = await uploadImage("Posts", imagePath);

        if (result.error) {
            return res.status(400).json({
                message: "Cloudinary upload failed"
            });
        }

        // delete image from disk
        fs.unlink(imagePath, (err) => {
            if (err) throw err;
        });
        

        const createPost = await Post.create({
            title,
            description,
            category,
            imageUrl: result.secure_url,
            author: req.user._id
        });

        // Update user posts
        await Auth.updateOne({_id : req.user._id}, {$push : {posts : createPost._id}});

        return res.status(201).json({
            message: "Post created successfully",
            post: createPost
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};


// update post  -> This HW is not complete
export const updatePost = async (req, res) => {
    try{
        const { id } = req.params ;

        if(!id) {
            return res.status(400).json({
                message : "Please provide an id"
            })
        }

        const fetchedPost = await Post.findById(id);

        // Researcher your Work
        if(fetchedPost.author !== req.user._id){
            return res.status(400).json({
                message : "You are not authorized to access this route"
            })
        }

        if(!fetchedPost) {
            return res.status(404).json({
                message : "Post not found"
            })
        }

        const {title, description, category} = req.body;
        if(!title || !description || !category){
            return res.status(400).json({
                message : "Please fill all the fields"
            })
        }

        // H/w : Image update logic 

        if(title){
            fetchedPost.title = title;
        }

        if(description){
            fetchedPost.description = description;
        }

        if(category){
            fetchedPost.category = category;
        }

        await fetchedPost.save();

        return res.status(200).json({
            message : "Post updated successfully",
            post : {
                _id : fetchedPost._id,
                title : fetchedPost.title,
                description : fetchedPost.description,
                imageUrl : fetchedPost.imageUrl,
                category : fetchedPost.category,
                author : fetchedPost.author
            }
        })

    }
    catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}

// delete post 
export const deletePost = async (req, res) => {
    try{

        const { id } = req.params;

        if(!id){
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


        // Here Update
        // console.log(fetchedPost.author);
        // console.log(req.user._id);

        if(fetchedPost.author.toString() !== req.user._id.toString()){
            return res.status(400).json({
                message : "You are not authorized to access this route"
            })
        }

        // here change -> .remove() to .deleteOne()

        await fetchedPost.deleteOne();

        // Update user posts
        await Auth.updateOne({_id : req.user._id}, {$pull : {posts : fetchedPost._id}});

        return res.status(200).json({
            message : "Post deleted successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}

// get all posts 
export const getAllPosts = async (req, res) => {
    try{

        // also update here .populate("user", "-password"); 
        const posts = await Post.find().populate("author", "-password");
        console.log(posts);

        if(!posts){
            return res.status(404).json({
                message : "Posts not found"
            })
        }

        return res.status(200).json({
            message : "Posts found",
            posts : posts
        })
    }
    catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}

// list all post with slags 
export const listPosts = async (req, res) => {
    try {
        const { category, title, description } = req.query;

        if (!category && !title && !description) {
            return res.status(400).json({
                message: "Please provide at least one filter (category, title, description)"
            });
        }

        const searchInput = {};

        if (category) {
            searchInput.category = category;
        }

        if (title) {
            searchInput.title = { $regex: title, $options: "i" };
        }

        if (description) {
            searchInput.description = { $regex: description, $options: "i" };
        }

        const posts = await Post.find(searchInput)
            .populate("author", "-password")
            .exec();

        if (posts.length === 0) {
            return res.status(404).json({
                message: "No posts found"
            });
        }

        return res.status(200).json({
            message: "Posts found",
            posts
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};


// get a single post with ID
export const getPost = async (req, res) => {
    try{
        const { id } = req.params;

        if(!id){
            return res.status(400).json({
                message : "Please provide an id"
            })
        }

        const fetchedPost = await Post.findById(id).populate("author", "-password");

        if(!fetchedPost){
            return res.status(404).json({
                message : "Post not found"
            })
        }

        return res.status(200).json({
            message : "Post found",
            post : {
                _id : fetchedPost._id,
                title : fetchedPost.title,
                description : fetchedPost.description,
                imageUrl : fetchedPost.imageUrl,
                category : fetchedPost.category,
                author : fetchedPost.author
            }
        })
    }
    catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}