
import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (folder, filePath) => {
    try {
        return await cloudinary.uploader.upload(filePath, { folder });
    }
    catch (error) {
        return { error };
    }
};
