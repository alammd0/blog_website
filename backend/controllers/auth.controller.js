import Auth from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";

// register 
export const register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, role} = req.body

        if(!name || !email || !password || !confirmPassword || !role){
            return res.status(400).json({
                message : "Please fill all the fields"
            })
        }

        const existUser = await Auth.findOne({ email });

        if(existUser){
            return res.status(400).json({
                message : "Email already exists"
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                message : "Passwords do not match"
            })
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
        

        const newUser = await Auth.create({
            name,
            email,
            password : hashedPassword,
            role : role
        })

        return res.status(201).json({
            message : "User created successfully",
            user : {
                _id : newUser._id,
                name : newUser.name,
                email : newUser.email,
                role : newUser.role
            }
        })
    }
    catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}

// login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if(!email || !password){
            return res.status(400).json({
                message : "Please fill all the fields"
            })
        }


        const user = await Auth.findOne({ email });

        // console.log(user);

        if(!user){
            return res.status(400).json({
                message : "User not found"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);


        if(!isPasswordCorrect){
            return res.status(400).json({
                message : "Password is incorrect"
            })
        }

        const payload = {
            _id : user._id,
            name : user.name,
            email : user.email,
            role : user.role
        }
// // 
//         console.log(payload);
//         console.log(process.env.JWT_SECRET);

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        // console.log(token);

        return res.status(200).json({
            message : "Login successfully",
            token : token,
            user : {
                _id : user._id,
                name : user.name,
                email : user.email,
                role : user.role
            }
        })
    }
    catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}

// get user 
export const getUser = async (req, res) => {
    try {

        // here fixed 
        const { _id } = req.user;

        if(!_id){
            return res.status(400).json({
                message : "Please login first"
            })
        }

        const user = await Auth.findById(_id).populate("posts");

        if(!user){
            return res.status(404).json({
                message : "User not found"
            })
        }

        return res.status(200).json({
            message : "User found",
            user : {
                _id : user._id,
                name : user.name,
                email : user.email,
                posts : user.posts,
                role : user.role
            }
        })

    }catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}

// get all users by admin
export const getAllUsers = async (req, res) => {
    try {
        const { role } = req.user;

        if(role !== "admin"){
            return res.status(400).json({
                message : "You are not authorized to access this route"
            })
        }

        const users = await Auth.find().select("-password");

        return res.status(200).json({
            message : "Users found",
            users : users
        })

    }catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}

// forget password with link 
export const sendForgetPasswordLink = async (req, res) => {
    try {

        const { email } = req.body;

        if(!email){
            return res.status(400).json({
                message : "Please fill emails"
            })
        }

        const user = await Auth.findOne({ email });

        if(!user){
            return res.status(404).json({
                message : "User not found"
            })
        }

        const payload = {
            user : {
                _id : user._id,
                name : user.name,
                email : user.email,
                role : user.role
            }
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn : "1h"
        });

        const link = `${process.env.BASE_URL}/forget-password/${token}`;

        const html = `<h1>Reset Password</h1>
        <p>Hello ${user.name},</p>
        <p>Please click on the following link to reset your password:</p>
        <a href="${link}">${link}</a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Thank you,</p>
        <p>Admin</p>`;

        const text = `Hello ${user.name},
        Please click on the following link to reset your password:
        ${link}
        If you did not request a password reset, please ignore this email.
        Thank you,
        Admin`;

        await sendEmail(user.email, "Reset Password", text, html);

        return res.status(200).json({
            message : "Password reset link sent to your email",
            link
        })

    }catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}

// update password
export const updatePassword = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(400).json({
                message : "Please provide a token"
            })
        };

        // check if token is valid
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (!payload) {
            return res.status(400).json({
                message : "Invalid token, please create a new one"
            })
        }

        const { password, confirmPassword } = req.body;

        if (!password || !confirmPassword) {
            return res.status(400).json({
                message : "Please fill all the fields"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message : "Passwords do not match"
            })
        }

        const user = await Auth.findById(payload.user._id);

        if (!user) {
            return res.status(404).json({
                message : "User not found"
            })
        }

        const salt = 10;

        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            message : "Password updated successfully"
        })
     }
    catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}