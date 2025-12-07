import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try{

        const token = req.header("Authorization").replace("Bearer ", "") || req.headers.authorization;
        // console.log(token);

        if(!token){
            return res.status(400).json({
                message : "Please login first"
            })
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if(!payload){
            return res.status(400).json({
                message : "Invalid token, please login again"
            })
        }

        req.user = payload;


        next();
    }
    catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}

export const adminMiddleware = async (req, res, next) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(401).json({
                message : "You are not authorized to access this route"
            })
        }
    }catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}

export const userMiddleware = async (req, res, next) => {
    try {
        if(req.user.role !== "user"){
            return res.status(401).json({
                message : "You are not authorized to access this route"
            })
        }
    }catch (error) {
        return res.status(500).json({
            message : "Something went wrong"
        })
    }
}